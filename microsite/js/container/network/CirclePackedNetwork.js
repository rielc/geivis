export let __hotReload = true;

import * as GeiVisUtils from "../../lib/GeiVisUtils.js";

export class CirclePackedNetwork {

  constructor (properties) {
    this.povNode = null;
    this.properties = properties;
    this.blacklist = [];
    this.years = [0,0];
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


  // this function extracts a network from if given a array with 
  generateLinksAndNodes () {

    // extract ALL tags (with duplicates)
    let allTags = [];
    // push all tags of every entry into the global array
    this.data.forEach( e => { 
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

    //console.time("asdf");

    let linkList = d3.map();

    // extract all links
    this.data.forEach( (e) => {

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

                if (linkList.has(link)) {
                    linkList.set(link, linkList.get(link) + 1);
                } else {
                    linkList.set(link, 1);
                }


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

    //console.log(nodes);

    this.transformedData = {'nodes' : nodes.map(function (n) {return { 'name' : n, 'occurrence' : nodeList.get(n) } ;}), 'links': r };
    return this;
  }



  // renders the whole scene
  render () {
    this.renderNodes();
    return this;
  }

  centerNode(node) {
  
  }




  // this function gets called to re-render the layout
  renderNodes () {

    let that = this;


    function switchToMonad (data) {

      that.monad = true;

      that.container.selectAll(".node").classed("hidden", true);

      let center = [that.width/2,that.height/2];
      let d = data.data;

      let linkedNodes = that.transformedData.links
        .filter( l => (l.source.name == d.name || l.target.name == d.name) )
        .map(l => {
          if (l.source.name == d.name) { return { "strength" : l.strength, "node":l.target }; }
          if (l.target.name == d.name) { return { "strength" : l.strength, "node":l.source }; }
        });

      let linkMax = d3.max(linkedNodes, l=>l.strength);
      let linkMin = d3.min(linkedNodes, l=>l.strength);

      let indexToPolar = d3.scaleLinear().domain([0,linkedNodes.length-1]).range([0, Math.PI*2]);
      let occurenceToProximity = d3.scaleLinear().domain([linkMax,linkMin]).range([100, that.height/3]);

      linkedNodes.forEach( (l,i) => {
        let x = center[0]+(Math.sin(indexToPolar(i))*occurenceToProximity(l.strength)*2);
        let y = center[1]+Math.cos(indexToPolar(i))*occurenceToProximity(l.strength);

        let n = d3.select( "#"+GeiVisUtils.makeSafeForCSS( l.node.name ) ).style("opacity", 1).classed("hidden", false).classed("monadic-related", true);
        let width = n.select(".label").node().offsetWidth;

        
        let sign;
        let value;
        let transform;
        let translate;

        var tx = Math.sin(indexToPolar(i))*width/2-30;
        var ty = Math.cos(indexToPolar(i))*width/2+10;


        if (indexToPolar(i) >= Math.PI && indexToPolar(i) <= Math.PI*2) {
          n.classed("right", true);
          value = 90;
          sign = 1;
          translate = `${tx}px,${ty}px`;
          //transform = "100% 0%";
        }

        if (indexToPolar(i) >= 0 && indexToPolar(i) <= Math.PI) {
          //n.classed("left", true);
          value = 270;
          sign = 1;
          translate = `${tx}px,${ty}px`;
          //transform = "100% 0%";
        }

        n
          .transition()
          .duration(300)
          .delay((d,i) => i*30)
          .style("width", "5px")
          .style("height", "5px")
          .style("border-radius", "5px")
          .style("transform", d => `translate3d(${x-2.5}px,${y-2.5}px,0px)`);



        n
          .select(".label")
          .transition()
          .duration(300)
          .delay((d,i) => i*30)
          //.style("transform-origin", transform)
          .style("transform", (d) => `translate(${translate})rotate(-${(indexToPolar(i)*180/Math.PI)+(value)*sign}deg)`);

      d3.select(this)
        .transtion()
        .duration(300)
        .delay(400)
        .style("opacity", 1)
        .style("box-shadow", "0 0 10px 0 rgba(0,0,0,0.25)")
        .style("transform",  d => `translate3d(${center[0]}px,${center[1]}px,0px)`);

      });

    }

    // sets the visual props of a node
    function setNodeProperties (selection) {
      selection
        .style("opacity", 1.0)
        .style("transform",  d => `translate3d(${d.x-d.r}px,${d.y-d.r}px,0px)`)
        .style("width", d => (d.r*2)+'px' )
        .style("height", d => (d.r*2)+'px')
        .style("border-radius", d => (d.r)+'px');
        return selection;
    }

    function out () {
      let n = that.container.selectAll(".node").classed("inactive", false).style("opacity", null);
      n.select('.count').text(d=>d.data.occurrence);
      n.each(checkOverflow);
    }

    function over(data) {

        that.container.selectAll(".node").classed("inactive", true);
        d3.select(this).classed("inactive", false)
        
        let d = data.data;

        //console.time("tagnetwork");
        //console.log(that.transformedData.links);

        let linkedNodes = that.transformedData.links
          .filter( l => (l.source.name == d.name || l.target.name == d.name) )
          .map(l => {
            if (l.source.name == d.name) { return { "strength" : l.strength, "node":l.target }; }
            if (l.target.name == d.name) { return { "strength" : l.strength, "node":l.source }; }
          });
        //console.timeEnd("tagnetwork");

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
            n.each(checkOverflow);

        });
    }

    //console.log(this.root.children);

    //this.container.selectAll(".node").remove()

    this.nodes = 
        this.container
        .selectAll(".node")
        .data(this.root.children, e=>e.data.name );

    // update

    this.nodes
      .select(".count")
      .text(d => d.data.occurrence);

    this.nodes
      .transition()
      .duration(300)
      .delay((d,i) => i*10)
      .call(setNodeProperties)
      .on("end", checkOverflow);


    // enter
    let enteredNodes = this.nodes
      .enter()
      .append("div")
      .on("mouseover", over)
      .on("mouseout", out)
      .on("click", switchToMonad)
      .attr("id", d => GeiVisUtils.makeSafeForCSS(d.data.name))
      .style("transform",  d => `translate3d(${this.width/2-d.r}px,${this.height/2-d.r}px,0px)`)
      .style("opacity", 0.0)
      .classed("node", true);

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
      .delay((d,i) => i*10)
      .call(setNodeProperties)
      .on("end", checkOverflow);



    let exitedNodes = this.nodes.exit();

    // exit
    exitedNodes
      .transition()
      .duration(100)
      .style("transform",  d => `translate3d(${this.width/2-d.r}px,${this.height/2-d.r}px,0px)`)
      .style("opacity", 0.0)
      .remove();


    function checkOverflow (d) {
        let el = d3.select(this);
        let overflow = GeiVisUtils.checkOverflow(el.node(), 20);
        el.classed(overflow, true);
        
        if (overflow == "overflow" || overflow == "partial-overflow") {
          el.attr("data-balloon", d=>d.data.name+": "+d.data.occurrence);
          el.attr("data-balloon-pos", "down");
        } else {
          el.classed("overflow", false);
          el.classed("partial-overflow", false);
          el.attr("data-balloon", null);
          el.attr("data-balloon-pos", null);
        }
    }
    return this;
  }

}