export let __hotReload = true

import {Section} from '../../Section';

export class DummySection extends Section {

  constructor(state, db){
    super(state,db);

  	this.divDummy = this.div.append("div").attr("class", "dummy");
  }


  stateChange(next, last){

  	if(next.loaded == !last.loaded){
  	   console.log("init dummy");
  	}
  }

  render(){

  }

}