export let __hotReload = true;

import * as GeiVisUtils from "../../lib/GeiVisUtils.js";

export class CirclePackedNetwork {

  constructor (properties) {
    this.povNode = null;
    this.properties = properties;
    this.blacklist = [];
    this.years = [0,0];
    this.monad = "";
    return this;

  }


  setOccurrenceScale (scale) {
    this.occurrenceScale = scale;
    return this;
  }


  append (selector) {
    this.containerName = selector.attr("id");
    this.parentContainer = selector;
  
    this.width = parseInt( this.parentContainer.style("width") ) - this.properties.margin.left - this.properties.margin.right;
    this.height = parseInt( this.parentContainer.style("height") ) - this.properties.margin.top - this.properties.margin.bottom;

    this.outerWidth = this.width + this.properties.margin.left + this.properties.margin.right;
    this.outerHeight = this.height + this.properties.margin.top + this.properties.margin.bottom;

    // this.tooltip = new Tooltip('');
    // this.tooltip.attach(selector._groups[0][0]);

    this.container = 
      selector
      .append("div")
      .attr("id", this.containerName+"-visualization")
      .style("width", this.width+"px")
      .style("height", this.height+"px")
      .style("position", "relative");
      //.style("transform",  d => `translate(${this.properties.margin.left}px,${this.properties.margin.top}px)`);

    this.pack = 
      d3.pack()
      .size([this.width,this.height])
      .padding(10);
    

    return this;
  }

  makeArrayUnique (a) {
        return a.reduce(function(p, c) {
          if (p.indexOf(c) < 0) p.push(c);
          return p;
        }, []);
    };


  updateData ( data ) {
    this.data = data;
    this.data.forEach(d=> {
      if (d[this.nodeAccessor]!=undefined) {
        d[this.nodeAccessor] = this.makeArrayUnique(d[this.nodeAccessor]);
      }
    });

    this.generateLinksAndNodes();

    this.maxOccurrence = d3.max(this.transformedData.nodes, n=>n.occurrence);
    this.minOccurrence = d3.min(this.transformedData.nodes, n=>n.occurrence);


    // fix graph links to map to objects instead of indices
    this.transformedData.links.forEach( (d, i) => {
      d.source = isNaN(d.source) ? d.source : this.transformedData.nodes[d.source];
      d.target = isNaN(d.target) ? d.target : this.transformedData.nodes[d.target];
    });


    this.root = 
      d3.hierarchy( {
        children : 
          this.transformedData.nodes
          .sort( (a, b)=>(b.occurrence-a.occurrence) )
      })
      .sum( d=>d.occurrence );

    this.pack(this.root);

    return this;
  }


  // every string in this array will be compared against the tags to add. if there is a match it will not be added
  setBlacklist (blacklist) { 
    this.blacklist = blacklist.map( t=>t.trim().toLowerCase() );
    return this;
  }
  

  // this defines the accessor string to the node-array
  setNodeAccessor (nodeAccessor) { this.nodeAccessor = nodeAccessor; return this; }

  cacheLinksAndNodes () {
    this.networkByYear = 
      d3.nest()
      .key(k=>parseInt(k.year))
      .entries(this.data)
      .map( m => {
        let d = this.generateLinksAndNodes(m.values);
        return { year:m.key, data:d};
      });


      this
        .networkByYear
        .filter(f=>(f.year=="1820"||f.year=="1911"))
        .map(m=>m.data)
        .map(m=>m.links);

      d3.nest()
        .key(k=>`${k.source}-${k.target}`)
        .entries();

    return this;
  }


  // this function extracts a network from if given a array with 
  generateLinksAndNodes (newData) {

    let dataToAnalyze;
    if (newData != undefined) { ataToAnalyze = newData; }
    else { dataToAnalyze = this.data; }

    // extract ALL tags (with duplicates)
    let allTags = [];
    // push all tags of every entry into the global array
    dataToAnalyze.forEach( e => { 
      if (e[this.nodeAccessor] != undefined) {
        allTags.push( 
          e[this.nodeAccessor]
          .map( t=>t.trim().toLowerCase() )
          .filter( f => (this.blacklist.indexOf(f)==-1))
        );
      }
    });

    // reduce the duplicates
    let nodeSet = d3.set( d3.merge( allTags ));
    let nodes = nodeSet.values();
    let nodeList = d3.map();
    nodes.forEach( e => { nodeList.set(e, 0); });

    let linkList = d3.map();

    // extract all links
    dataToAnalyze.forEach( (e) => {

      // this array prevent duplicate links

      // if the entry has tags
      if (e[this.nodeAccessor] != undefined) {
        
        let parsedLinks = [];
        let addedTags = [];

        let tags = e[this.nodeAccessor].map( t=>t.trim().toLowerCase() ); // clean the tags again

        //create a link for n-to-n connection 
        tags.filter(f=>this.blacklist.indexOf(f)==-1).forEach( (tagA) => {
          tags.filter(f=>this.blacklist.indexOf(f)==-1).forEach( (tagB) => {
            if (tagA!=tagB) {
              // sort them to prevent duplications
              let indexA = nodes.indexOf(tagA);
              let indexB = nodes.indexOf(tagB);

              // construct a unique link ID
              let linkIDs = [indexA, indexB].sort((a,b)=>a-b);
              let link = linkIDs[0]+"-"+linkIDs[1];

              if (parsedLinks.indexOf(link) == -1) {

                // increment the value of the connection
                if ( linkList.has(link) ) { linkList.set(link, linkList.get(link) + 1); }
                else { linkList.set(link, 1); }

                if (addedTags.indexOf(tagA) == -1) {
                  nodeList.set(tagA, nodeList.get(tagA)+1);
                  addedTags.push(tagA);
                }
                if (addedTags.indexOf(tagB) != -1) {
                  nodeList.set(tagB, nodeList.get(tagB)+1);
                  addedTags.push(tagB);
                }

                parsedLinks.push(link);
              }

            }
          });
        });
      }
    });

    let r = linkList.keys().map( 
    function (l) { 
      let s = l.split("-"); 
        return { 
            'source' : Number.parseFloat(s[0]),
            'target' : Number.parseFloat(s[1]),
            'strength': linkList.get(l) 
        };
    });

    let result = {'nodes' : nodes.map(function (n) {return { 'name' : n, 'occurrence' : nodeList.get(n) } ;}), 'links': r };
    
    if (newData != undefined) { return result; }
    else { this.transformedData = result; return this; }
  }



  // renders the whole scene
  render (keyframe) {
    this.renderNodes(keyframe);
    return this;
  }

  centerNode(node) {
  
  }




  // this function gets called to re-render the layout
  renderNodes (keyframe) {

    let delay = 30;

    switch (keyframe) {
      case "brushend": delay=0; break;
      case "leave-monadic-view": delay=10; break;

    }

    let that = this;
    // update

    this.nodes = 
        this.container
        .selectAll(".node")
        .data(this.root.children, e=>e.data.name );

    this.nodes
      .select(".count")
      .text(d => d.data.occurrence);

    this.nodes
      //.classed("transition", true)
      // clear tolltips
      .classed("overflow", false).classed("partial", false)
      .attr("data-balloon", null).attr("data-balloon-pos", null)

      // clear monadic
      .classed("monadic-related", false).classed("hidden", false).classed("monad", false)
      .transition()
      .duration(300)
      .delay((d,i) => i*delay)
      .call(setNodeProperties)
      .on("end", checkOverflow);

      if (keyframe == "brushend" || keyframe == "leave-monadic-view") {
        // enter
        let enteredNodes = this.nodes.enter().append("div");
          
        enteredNodes
          .on("mouseover", over)
          .on("mouseout", out)
          .on("click", switchToMonad)
          .attr("id", d => GeiVisUtils.makeSafeForCSS(d.data.name))
          //.style("transform",  d => `translate3d(${this.width/2-d.r}px,${this.height/2-d.r}px,0px)`)
          .style("transform",  d => `translate3d(${d.x-d.r}px,${d.y-d.r}px,0px)`)
          .style("opacity", 0.0)
          .classed("node", true);
          //.classed("transition", true);

        enteredNodes
          .append("span")
          .classed("label", true)
          .text(d => d.data.name);

        enteredNodes
          .append("span")
          .classed("count", true)
          .text(d => d.data.occurrence);

        enteredNodes
          .transition()
          .duration(300)
          //.delay((d,i) => i*10)
          .call(setNodeProperties)
          .on("end", checkOverflow);

      }

        let exitedNodes = this.nodes.exit();

        // exit
        exitedNodes
          .transition()
          .duration(100)
          .style("opacity", 0.0)
          .style("width", 0)
          .style("height", 0)
          // .on("end", checkOverflow)
          //.style("transform",  d => `translate3d(${this.width/2-d.r}px,${this.height/2-d.r}px,0px)`)
          .remove();


    function checkOverflow (d) {
        let el = d3.select(this);
        let overflow = GeiVisUtils.checkPartialOverflow(el.node(), 14);
        //el.classed("transition", false);
        switch (overflow) {
          case "overflow":
            el.classed("overflow", true);
            el.attr("data-balloon", d=>d.data.name+": "+d.data.occurrence);
            el.attr("data-balloon-pos", "down");
          break;
          case "partial-overflow":
            el.classed("overflow", true).classed("partial", true);
            el.attr("data-balloon", d=>d.data.name+": "+d.data.occurrence);
            el.attr("data-balloon-pos", "down");
          break;
        }
    }



    function switchToMonad (data) {

      let d = data.data;

      if (that.monad == d.name) {
        that.monad = "";
        that.renderNodes("leave-monadic-view");
      } else {

        that.monad = d.name;
        let center = [that.width/2-50,that.height/2];

        // reset all nodes
        that.container.selectAll(".node")
          .classed("hidden", true)
          .classed("overflow", false)
          .classed("partial", false)
          .classed("monad", false)
          .classed("left", false)
          .classed("right", false)
          .attr("data-balloon", null)
          .attr("data-balloon-pos", null);

        // center this node
        d3.select(this)
          .classed("hidden", false)
          .classed("monad", true)
          .classed("monadic-related", false)
          .transition()
          .duration(300)
          .style("width", null)
          .style("height", null)
          .style("opacity", 1)
          .style("transform",  d => `translate3d(${center[0]}px,${center[1]}px,0px)`);

        let linkedNodes = that.transformedData.links
          .filter( l => (l.source.name == d.name || l.target.name == d.name) )
          .map(l => {
            if (l.source.name == d.name) { return { "strength" : l.strength, "node":l.target }; }
            if (l.target.name == d.name) { return { "strength" : l.strength, "node":l.source }; }
          });

        let linkMax = d3.max(linkedNodes, l=>l.strength);
        let linkMin = d3.min(linkedNodes, l=>l.strength);

        let indexToPolar = d3.scaleLinear().domain([0,linkedNodes.length]).range([0, Math.PI*2]);
        let occurenceToProximity = d3.scaleLinear().domain([linkMax,linkMin]).range([200, that.height/3]);
        //let occurenceToAlpha = d3.scaleLinear().domain([linkMin, linkMax]).range([0.125, 1.0]);


        linkedNodes.forEach( (l,i) => {

          if (l.node.name != that.monad) {

            let n = d3.select( "#"+GeiVisUtils.makeSafeForCSS( l.node.name ) )
              .style("opacity", 1)
              .classed("hidden", false)
              .classed("monadic-related", true)
              .classed("overflow", false)
              .classed("partial", false);

            let x = center[0]+(Math.sin(indexToPolar(i))*occurenceToProximity(l.strength));
            let y = center[1]+Math.cos(indexToPolar(i))*occurenceToProximity(l.strength);


            let width = n.select(".label").node().offsetWidth;
            let height = n.select(".label").node().offsetHeight;
            let value;

            if (indexToPolar(i) >= Math.PI && indexToPolar(i) <= Math.PI*2) { n.classed("right", true); value = 90; }
            if (indexToPolar(i) >= 0 && indexToPolar(i) <= Math.PI) { n.classed("left", true); value = 270; }

            n
              .transition()
              .duration(300)
              .delay((d,i) => i*30)
              .style("width", null)
              .style("height", null)
              .style("transform", d => `translate3d(${x}px,${y}px,0px)rotate(-${(indexToPolar(i)*180/Math.PI)+(value)}deg)`);
          }

        });

      }

    }

    // sets the visual props of a node
    function setNodeProperties (selection) {

      if (keyframe == "brushend" || keyframe == "leave-monadic-view") {
        selection
          .style("opacity", 1.0)
          .style("transform",  d => `translate3d(${d.x-d.r}px,${d.y-d.r}px,0px)`)
          .style("width", d => (d.r*2)+'px' )
          .style("height", d => (d.r*2)+'px')
          .style("border-radius", d => (d.r)+'px');
      } else {
        selection
          .style("opacity", 1.0)
          .style("width", d => (d.r*2)+'px' )
          .style("height", d => (d.r*2)+'px')
          .style("border-radius", d => (d.r)+'px');
      }
    }

    function out () {
      let n = that.container.selectAll(".node").classed("inactive", false);
        n.style("opacity", null);
        n.select('.count').text(d=>d.data.occurrence);

    }

    function over(data) {

        that.container.selectAll(".node").classed("inactive", true);
        d3.select(this).classed("inactive", false)
        
        let d = data.data;

        let linkedNodes = that.transformedData.links
          .filter( l => (l.source.name == d.name || l.target.name == d.name) )
          .map(l => {
            if (l.source.name == d.name) { return { "strength" : l.strength, "node":l.target }; }
            if (l.target.name == d.name) { return { "strength" : l.strength, "node":l.source }; }
          });

        let linkMax = d3.max(linkedNodes, l=>l.strength);
        let linkMin = d3.min(linkedNodes, l=>l.strength);

        // TODO: select all nodes with this array
        // enter() changes the related ones 
        // .exit() hides the unrelated


          // // highlight the nodes
          linkedNodes.forEach( f => {
            let n = d3.select( "#"+GeiVisUtils.makeSafeForCSS( f.node.name ) );
              n
              .classed("inactive", false)
              .style("opacity", that.occurrenceScale.domain([linkMin, f.node.occurrence])(f.strength) );
              n.select(".count").text(f.strength);
          });
    }

    return this;
  }

}