export let __hotReload = true;

import * as GeiVisUtils from "../../lib/GeiVisUtils.js"

export class CirclePackedNetwork {

  constructor (properties) {
    this.povNode = null
    this.properties = properties
    this.blacklist = []
    this.years = [0,0]
    this.monad = ""
    this.state = {}
    this.db = {}
    this.openBookshelfButton = {}
    return this
  }

  setState (state) { this.state = state }
  setDB (db) { this.db = db }

  setOccurrenceScale (scale) {
    this.occurrenceScale = scale
    return this
  }

  append (selector) {
    this.containerName = selector.attr("id")
    this.parentContainer = selector
  
    this.width = parseInt( this.parentContainer.style("width") ) - this.properties.margin.left - this.properties.margin.right
    this.height = (window.innerHeight-200) - this.properties.margin.top - this.properties.margin.bottom

    this.outerWidth = this.width + this.properties.margin.left + this.properties.margin.right
    this.outerHeight = this.height + this.properties.margin.top + this.properties.margin.bottom

    this.container = 
      selector
      .append("div")
      .attr("id", this.containerName+"-visualization")
      .style("width", this.width+"px")
      .style("height", this.height+"px")
      .style("position", "relative")
      //.style("transform",  d => `translate(${this.properties.margin.left}px,${this.properties.margin.top}px)`);

      this.openBookshelfButton = this.container
        .append('a')
        .classed('openBookshelf', true)
        .classed('hidden', true)
        .html('show tagged books')
        .on('click', () => {
          this.state.push({ bookshelf: false })
          this.db.bookshelfData = this.bookshelfData
          this.state.push({ bookshelf: true })
        })


    this.pack = 
      d3.pack()
      .size([this.width,this.height])
      .padding(20)
    
    return this
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

    this.maxOccurrence = d3.max(this.transformedData.nodes, n=>n.data.occurrence);
    this.minOccurrence = d3.min(this.transformedData.nodes, n=>n.data.occurrence);

    // fix graph links to map to objects instead of indices
    this.transformedData.links.forEach( (d, i) => {
      d.source = isNaN(d.source) ? d.source : this.transformedData.nodes[d.source];
      d.target = isNaN(d.target) ? d.target : this.transformedData.nodes[d.target];
    });


    this.root = 
      d3.hierarchy( {
        children : 
          this.transformedData.nodes.sort( (a, b)=>{ return (b.data.occurrence-a.data.occurrence); } )
      })
      .sum( (d,i) => { return (d.data!=undefined)? d.data.occurrence : 0; } );

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

    let dataToAnalyze = this.data;
    //if (newData != undefined) { dataToAnalyze = newData; }
    //else { dataToAnalyze = this.data; }

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
    nodes.forEach( e => { nodeList.set(e, {occurrence:0, entryID:[]}); });

    let linkList = d3.map();

    // extract all links
    dataToAnalyze.forEach( (e,entryIndex) => {

      let summary = d3.permute(e, ["subject","schoollevel","schooltype"]);

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

              // get index to prevent duplications by 
              let indexA = nodes.indexOf(tagA);
              let indexB = nodes.indexOf(tagB);

              // sorting the indices and  construct a unique link ID with them 
              let linkIDs = [indexA, indexB].sort((a,b)=>a-b);
              let link = linkIDs[0]+"-"+linkIDs[1];

              if (parsedLinks.indexOf(link) == -1) {

                // increment the value of the connection
                if ( linkList.has(link) ) { linkList.set(link, linkList.get(link) + 1); }
                // create the link
                else { linkList.set(link, 1); }

                if (addedTags.indexOf(tagA) == -1) {
                  let tagReference = nodeList.get(tagA);
                  tagReference.occurrence++;
                  tagReference.entryID.push(entryIndex);
                  addedTags.push(tagA);
                }
                if (addedTags.indexOf(tagB) == -1) {
                  let tagReference = nodeList.get(tagB);
                  tagReference.occurrence++;
                  tagReference.entryID.push(entryIndex);
                  addedTags.push(tagB);

                  // nodeList.set(tagB, nodeList.get(tagB)+1);
                  // addedTags.push(tagB);
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

    let result = {'nodes' : nodes.map(function (n) {return { 'name' : n, 'data' : nodeList.get(n) } ;}), 'links': r };
    this.transformedData = result;
    return this;
  }



  // renders the whole scene
  render (keyframe) {
    this.renderNodes(keyframe);
    return this;
  }


  setNodeDimensions (selection) {
    selection
      .style("width", d => (d.r*2)+'px' )
      .style("height", d => (d.r*2)+'px')
      .style("border-radius", d => (d.r)+'px');
  }

  setOverflowClass(selection) {

    // if (el.node().offsetWidth < 40)
    //     el.classed("overflow", true).classed("partial", true)

    // if (el.node().offsetWidth < 11)
    //     el.classed("overflow", true).classed("partial", false)

    selection
      .classed('overflow', (d) => d.r*2<66)
      .classed('partial', (d) => d.r*2>11&&d.r*2<66)
  }

  setInitalNodePosition (selection, el) {
    selection.style("transform", `translate3d(600px,${window.innerHeight/2}px,0px)scale(0,0)`);
  }

  setNodePosition (selection) {
    selection.style("transform",  d => `translate3d(${d.x-d.r}px,${d.y-d.r}px,0px)scale(1,1)`);
  }

  setNodeID (selection) {
    selection.attr("id", d => GeiVisUtils.makeSafeForCSS(d.data.name));
  }



  switchToMonad ( data, index, elements ) {

      let monadRadius = (this.height-200)/2

      let linkedBooks = this.data.filter( (d,i) => { return (data.data.data.entryID.indexOf(i) != -1) } )
      let booksBySubject = d3.nest().key( (d) => d.subject ).entries(linkedBooks)

      let clickedElement = d3.select(elements[index])
      let d = data.data

      if (this.monad == d.name) {

        this.monad = ""
        this.render('brushmove')
        this.render('brushend')
        this.openBookshelfButton.classed('hidden', true)


      } else {

        const linkedIDs = data.data.data.entryID
        const taggedBooks = this.data.reduce( (p,c,i,a) => {
          if(linkedIDs.indexOf(i)!=-1){
            p.push(c);return p;
          } else {
            return p;
          }}, [] )


        console.log(data.data.data.occurrence)

        // copy the data into the bookshelf && show the button
        this.bookshelfData = taggedBooks
        this.openBookshelfButton.classed('hidden', false).html(`show all <span>${data.data.data.occurrence}</span> books <br/>tagged with <span>'${data.data.name}'</span>`)

        this.monad = d.name;
        let center = [this.width/2-50,this.height/2]

        // reset all nodes
        this.container.selectAll(".node")
          .classed("hidden", true)
          .classed("overflow", false)
          .classed("partial", false)
          .classed("monad", false)
          .classed("left", false)
          .classed("right", false)
          .attr("data-balloon", null)
          .attr("data-balloon-pos", null)

        // center this node
        clickedElement
          .classed("hidden", false)
          .classed("monad", true)
          .classed("monadic-related", false)
          .style("width", null)
          .style("height", null)
          .style("opacity", 1)
          .style("transform",  d => `translate3d(${center[0]}px,${center[1]}px,0px)`)

        let linkedNodes = this.transformedData.links
          .filter( l => (l.source.name == d.name || l.target.name == d.name) )
          .map( (l) => {
            if (l.source.name == d.name) { return { "strength" : l.strength, "node":l.target }; }
            if (l.target.name == d.name) { return { "strength" : l.strength, "node":l.source }; }
          } )

        let linkMax = d3.max(linkedNodes, l=>l.strength)
        let linkMin = d3.min(linkedNodes, l=>l.strength)

        let range = linkedNodes.length<3 ? [Math.PI*0.5, Math.PI*2.5]:[0, Math.PI*2]

        let indexToPolar = d3.scaleLinear().domain([0,linkedNodes.length]).range(range)
        let occurenceToProximity = d3.scaleLinear().domain([linkMax,linkMin]).range([200, monadRadius])
        //let occurenceToAlpha = d3.scaleLinear().domain([linkMin, linkMax]).range([0.125, 1.0])

      let sizeAdjustment = monadRadius/(linkedNodes.reduce( (p,c,i,a)=> {
        let value = occurenceToProximity(c.strength)/this.occurrenceScale.domain([linkMin, c.node.data.occurrence])(c.strength)
        return value>p?value:p 
      }, 0))

      console.log(sizeAdjustment)

        linkedNodes.forEach( (l,i) => {

          if (l.node.name != this.monad) {

            let n = 
              d3.select( "#"+GeiVisUtils.makeSafeForCSS( l.node.name ) )
              .style("opacity", 1)
              .style("transition-delay", (d,i)=>`${i*0.2}s`)
              .classed("hidden", false)
              .classed("monadic-related", true)
              .classed("overflow", false)
              .classed("partial", false)

              console.log(monadRadius)

            let relationDivision = (this.occurrenceScale.domain([linkMin, l.node.data.occurrence])(l.strength))*2
            let proximity = Math.min(occurenceToProximity(l.strength)/relationDivision, monadRadius)

            let xBase = Math.sin(indexToPolar(i))*proximity;
            let yBase = Math.cos(indexToPolar(i))*proximity;

            let pos = [ center[0]+xBase, center[1]+yBase ]

            let width = n.select(".label").node().offsetWidth
            let height = n.select(".label").node().offsetHeight

            let value

            // decide on the rotation
            if (indexToPolar(i) >= Math.PI && indexToPolar(i) <= Math.PI*2) { n.classed("right", true); value = 90; }
            if (indexToPolar(i) >= 0 && indexToPolar(i) <= Math.PI) { n.classed("left", true); value = 270; }

            n.style("width", null)
              .style("height", null)
              .style("transform", d => `translate3d(${pos[0]}px,${pos[1]}px,0px)rotate(-${(indexToPolar(i)*180/Math.PI)+(value)}deg)`)
          }

        })

      }

    }  


  nodeHover ( data, index, elements ) {
    let hoveredElement = d3.select(elements[index]);
    this.container.selectAll(".node").classed("inactive", true) // deactive all nodes
    hoveredElement.classed("inactive", false) // activate the hovered
    let d = data.data;
    // search for links from and to this node
    let links = this.transformedData.links
      .filter( l => (l.source.name == d.name || l.target.name == d.name) )
      .map(l => {
        if (l.source.name == d.name) { return { "commonOccurrence" : l.strength, "node":l.target } }
        if (l.target.name == d.name) { return { "commonOccurrence" : l.strength, "node":l.source } }
      })

    // get the min and max values
    let linkMax = d3.max(links, l=>l.commonOccurrence)
    let linkMin = d3.min(links, l=>l.commonOccurrence)

    // // highlight the nodesg
    links.forEach( link => {
      let selectedNode = d3.select( "#"+GeiVisUtils.makeSafeForCSS( link.node.name ) )
        selectedNode
          .classed("inactive", false)
          .classed('related', true)
          .style("opacity", this.occurrenceScale.domain([linkMin, linkMax]).range([0.25, 1.0])(link.commonOccurrence) )
        selectedNode.select(".count").text(link.commonOccurrence)
    });

    // show tooltip if needed
    if (hoveredElement.classed('overflow')) {
      const noun = d.data.occurrence>1 ? 'Bücher' : 'Buch'
      const tooltip = { name: `${d.name} : ${d.data.occurrence} ${noun}` , pos: [data.x, this.container.node().offsetTop + this.container.node().parentElement.offsetTop+data.y-data.r-5] };
      this.state.push({ hover: d.name, tooltip });
    }

}

  nodeUnhover ( data, index, elements ) {
    this.container.selectAll(".inactive").classed("inactive", false).style("opacity", null)
    this.container.selectAll(".related").classed("related", false).style("opacity", null)
    this.container.selectAll('.node').select(".count").text(d => d.data.data.occurrence )
    this.state.push({ tooltip: null })
}


  checkOverflow ( data, elements ) {

    let el = d3.select(this)
    //let overflow = GeiVisUtils.checkPartialOverflow(el.node(), 11)

    if (el.node().offsetWidth < 40)
        el.classed("overflow", true).classed("partial", true)

    if (el.node().offsetWidth < 11)
        el.classed("overflow", true).classed("partial", false)


    // switch (overflow) {
    //   case "overflow":
    //     el.classed("overflow", true).classed("partial", false)
    //   break
    //   case "partial-overflow":
    //     el.classed("overflow", true).classed("partial", true)
    //   break
    // }
  }


  // this function gets called to re-render the layout
  renderNodes (keyframe) {

    let that = this;

    this.nodes = 
      this.container
      .selectAll(".node")
      .data(this.root.children, e=>e.data.name )

    this.openBookshelfButton.classed('hidden', true)

    let enteredNodes, exitedNodes

    switch (keyframe) {

      case "brushend":
     
        // set the previous data once the user finished brushing
        this.previousData = d3.map(this.root.children, d => d.data.name)

        // turn transitions on!
        d3.select("#NetworkSection").classed("hasTransition", true);

        // enter
        enteredNodes = this.nodes.enter()
          .append("div")
          .attr("id", d => GeiVisUtils.makeSafeForCSS(d.data.name))
          .classed("node", true)
          .call(this.setNodeDimensions)
          .call(this.setInitalNodePosition)
          .call(this.setOverflowClass)
          .on("mouseover", this.nodeHover.bind(this))
          .on("mouseleave", this.nodeUnhover.bind(this))
          .on("click", this.switchToMonad.bind(this))
          .call(this.setNodePosition)

        // add the labels and numbers
        enteredNodes.append("span").classed("label", true).text(d => d.data.name)
        enteredNodes.append("span").classed("count", true).text(d => d.data.data.occurrence)

        // update
        this.nodes
          .classed("hidden", false)
          .classed("monadic-related", false)
          .classed("monad", false)
          .call(this.setNodePosition)
          .call(this.setNodeDimensions)
          .call(this.setOverflowClass)

        this.nodes.select(".label").text(d => d.data.name)
        this.nodes.select(".count").text(d => d.data.data.occurrence)

        // remove the old ones
        exitedNodes = this.nodes.exit()
        exitedNodes.remove()

      break;

      case "brushmove":

      
        d3.select("#NetworkSection").classed("hasTransition", false);

        this.nodes
          .style("opacity", 1)
          .classed("monadic-related", false) // clear monadic
          .classed("monad", false)
          .classed("temporary-hidden", false)
          .call(this.setNodeDimensions)
          .call(this.setOverflowClass)
          .style("transform",  (d) => {
            let previusValues = this.previousData.get(d.data.name);
            let translate = `translate3d(${previusValues.x-d.r}px,${previusValues.y-d.r}px,0px)`;
            return translate;
          })

        this.nodes.select(".label").text(d => d.data.name)
        this.nodes.select(".count").text(d => d.data.data.occurrence)

        // .call( (d) => {
        //   d.nodes().forEach( n => this.checkOverflow.bind(n)() )
        // })

        exitedNodes = this.nodes.exit()
        exitedNodes.style("opacity", 0)


      break;

    }


    return this;
  }

}