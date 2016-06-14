export let __hotReload = true;

import * as GeiVisUtils from "../../lib/GeiVisUtils.js";

export class CirclePackedNetwork {

  constructor (properties) {
    this.properties = properties;
    this.blacklist = [];
    this.years = [0,0];
    return this;

  }


  setOccurrenceScale (scale) {
    this.occurrenceScale = scale;
    return this;
  }

  stateChange (next, last) {

    console.log(next);


    //console.log(next, last);


    // if(next.hover !== last.hover){
    //   this.render();
    // }

    // if(next.active !== last.active){
    //   this.load().render();
    // }

    //console.log(this.db.year.top(Infinity));

    //console.log(this.db);
    //this.updateData(this.db.year.top(Infinity));
    //this.render();

    // //console.log(next.brushStart.getFullYear());

    console.log(this);


    // if(next.brushStart.getFullYear() != last.brushStart.getFullYear()){
      
    // }
    
    if( next.brushStart.getFullYear() != this.years[0] || next.brushEnd.getFullYear() != this.years[1] ){
      this.years = [next.brushStart.getFullYear(), next.brushEnd.getFullYear()];
      
      let data = this.db.dates.top(Infinity);
      if (data.length>0) {
        this.updateData(this.db.date.top(Infinity));
        this.render();
      }
    }


  }

  append (selector) {
    this.containerName = selector.attr("id");
    this.parentContainer = selector;
  
    this.width = parseInt( this.parentContainer.style("width") ) - this.properties.margin.left - this.properties.margin.right;
    this.height = parseInt( this.parentContainer.style("height") ) - this.properties.margin.top - this.properties.margin.bottom;

    this.outerWidth = this.width + this.properties.margin.left + this.properties.margin.right;
    this.outerHeight = this.height + this.properties.margin.top + this.properties.margin.bottom;

      //console.log(this.width, this.height);


    this.container = 
      selector
      .append("div")
      .classed("container", true)
      .attr("id", this.containerName+"-visualization")
      .style("width", this.width+"px")
      .style("height", this.height+"px")
      .style("position", "relative")
      .style("margin", "0")
      .style("padding", "0")
      .style("transform",  d => `translate(${this.properties.margin.left}px,${this.properties.margin.top}px)`);
      
    this.nodes = 
        this.container
        .selectAll(".nodes");

    this.pack = 
      d3.pack()
      .size([this.width-2,this.height-2])
      .padding(3);
    

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
    //console.time("asdf");

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

  // if (that.monad) {
  //   that.monad = false;
  //   that.renderNodes();
  //   return true;
  // }

    that.monad = true;

        d3
          .selectAll(".node");
          //.style("opacity", 0);

    let center = [that.width/2,that.height/2];

    let d = data.data;

    d3.select(this)
      .style("opacity", 1)
      //.style("box-shadow", "0 0 10px 0 rgba(0,0,0,0.25)")
      .style("transform",  d => `translate3d(${center[0]}px,${center[1]}px,0px)`);

    let linkedNodes = that.transformedData.links
      .filter( l => (l.source.name == d.name || l.target.name == d.name) )
      .map(l => {
        if (l.source.name == d.name) { return { "strength" : l.strength, "node":l.target }; }
        if (l.target.name == d.name) { return { "strength" : l.strength, "node":l.source }; }
      });

    let linkMax = d3.max(linkedNodes, l=>l.strength);
    let linkMin = d3.min(linkedNodes, l=>l.strength);

    let indexToPolar = d3.scaleLinear().domain([0,linkedNodes.length-1]).range([0, Math.PI*2]);
    let occurenceToProximity = d3.scaleLinear().domain([linkMax,linkMin]).range([30, that.width/3]);

    linkedNodes.forEach( (l,i) => {
      let x = center[0]+Math.sin(indexToPolar(i))*occurenceToProximity(l.strength);
      let y = center[1]+Math.cos(indexToPolar(i))*occurenceToProximity(l.strength);
      let n = d3.select( "#"+GeiVisUtils.makeSafeForCSS( l.node.name ) ).style("opacity", 1);
      
      n
        .transition()
        .duration(300)
        .delay((d,i) => i*10)
        .style("width", "20px")
        .style("height", "20px")
        .style("border-radius", "10px")
        .style("transform", d => `translate3d(${x-10}px,${y-10}px,0px)`);

    });

  }

    // sets the visual props of a node
    function setNodeProperties (selection) {
      selection
        .style("position", "absolute")
        .style("width", d => (d.r*2)+'px' )
        .style("height", d => (d.r*2)+'px')
        .style("border-radius", d => (d.r)+'px')
        .style("transform",  d => `translate3d(${d.x-d.r}px,${d.y-d.r}px,0px)`);
    }

    function out () {
      let n = d3.selectAll(".node").classed("inactive", false).style("opacity", null);
      n.select('.count').text(d=>d.data.occurrence);
      n.select('.label').text(d=>d.data.name);

      n.each( function (d) { 
        let el = d3.select(this);
        let overflow = GeiVisUtils.checkOverflow(el._groups[0], 18);
        el.classed(overflow, true);
      });
    }

    function over(data) {

        d3.selectAll(".node").classed("inactive", true);
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

          let n = d3.select( "#"+GeiVisUtils.makeSafeForCSS( f.node.name ) )
            .classed("inactive", false)
            .style("opacity", that.occurrenceScale.domain([linkMin, f.node.occurrence])(f.strength) );
            n.select(".count").text(f.strength);

            n.each( function (d) { 
              let el = d3.select(this);
              let overflow = GeiVisUtils.checkOverflow(el._groups[0], 18);
              el.classed(overflow, true);
            });
        });
    }

    d3.selectAll(".node").remove();


 
    // select & join
    this.nodes = this.nodes
      .data(this.root.children, e=>(e.data.name) );

    // exit
    this.nodes
      .exit()
      //.transition()
      //.duration(300)
      //.style("width", '0px')
      //.style("height", '0px')
      .remove();

    // enter
    let enteredNodes = this.nodes
      .enter()
      .append("div")
      .on("mouseover", over)
      .on("mouseout", out)
      //.on("click", switchToMonad)
      .attr("id", d => GeiVisUtils.makeSafeForCSS(d.data.name))
      .attr("class", "node")
      .style("transform-origin", "center center")
      .style("transform",  d => `translate3d(${d.x-d.r}px,${d.y-d.r}px,0)`)
      //.transition()
      //.duration(300)
      //.delay( (d,i)=>i*10 )
      .call(setNodeProperties);

    enteredNodes
      .append("span")
      .classed("label", true)
      .text(d => d.data.name);

    enteredNodes
      .append("span")
      .classed("count", true)
      .text(d => d.data.occurrence);

    // update
    this.nodes
      // .transition()
      // .duration(300)
      // .delay( (d,i)=>i*10 )
      .call(setNodeProperties);

    enteredNodes
      .each( function (d) { 
        let el = d3.select(this);
        let overflow = GeiVisUtils.checkOverflow(el._groups[0], 18);
        el.classed(overflow, true);
        if (overflow == "overflow" || overflow == "partial-overflow") {
          el.attr("data-balloon", d=>d.data.name+": "+d.data.occurrence);
          el.attr("data-balloon-pos", "up");
        }
      });



    return this;
  }

}