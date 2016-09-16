export let __hotReload = true

import {Section} from '../../Section';
import {StreamGraph} from './StreamGraph'
import {BarList} from './BarList'

export class StreamSection extends Section {

  constructor(state, db){
  	super(state,db);

    // this.title.html("<strong>GEORG ECKERT INSTITUTE</strong> / Visualized Collection Prototype");

  	this.divStream = this.div.append("div").attr("class", "stream");
  	this.divEntities = this.div.append("div").attr("class", "entities");

  	this.stream = new StreamGraph(state, db, this.divStream);
    this.stream.paddingTop = 330;
    this.stream.outerHeight = this.height - this.stream.paddingTop;
    this.stream.outerHeightInitial = this.stream.outerHeight;
    this.stream.init();

  	this.listSubjects = new BarList(state, db, this.divEntities).Key("subjects");
  	this.listSchoollevels = new BarList(state, db, this.divEntities).Key("schoollevels");
  	this.listPublishers = new BarList(state, db, this.divEntities).Key("publishers");
  	this.listPlaces = new BarList(state, db, this.divEntities).Key("places");

  }


  stateChange(next, last){
   
    
    if(next.scrollY !== last.scrollY){
        const bb = this.div.node().getBoundingClientRect();
        // console.log(bb.bottom, bb.top, this.height , this.stream.outerHeight,  this.height + bb.top - this.stream.outerHeight -88);
        const bottom = bb.bottom - 88 - this.stream.outerHeightInitial;
        const height = this.stream.outerHeightInitial + bottom;

        // console.log(bottom, height);

        if(bottom < 0 && height > this.stream.outerHeightSmall){
          this.stream.outerHeight = height;
          this.stream.big = false;
          this.stream.init().render();
        } else {
          if(bottom>0 && this.stream.outerHeight != this.stream.outerHeightInitial){
            this.stream.big = true;
            this.stream.outerHeight = this.stream.outerHeightInitial;
            this.stream.init().render();
          }
          if(height<this.stream.outerHeightSmall && this.stream.outerHeight != this.stream.outerHeightSmall){
            this.stream.big = false;
            this.stream.outerHeight = this.stream.outerHeightSmall;
            this.stream.init().render();
          }
        }

        this.stream.div.classed("dropshadow", bottom < this.stream.paddingTop); 
        // this.stream.div.style("position", bottom < this.stream.paddingTop ? 'fixed': 'relative'); 
    }

  }

  render(){

  }

}