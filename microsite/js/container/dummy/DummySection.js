export let __hotReload = true

import {Section} from '../../Section';

export class DummySection extends Section {

  constructor(state, db){
    super(state,db);
    
    this.title.text("Dummy");
  	this.divDummy = this.div.append("div").attr("class", "dummy");
  }


  stateChange(next, pev){
    if(!next.visible.DummySection) return;
    // console.log("dummy",next);


  	if(next.loaded == !pev.loaded){
  	   console.log("init dummy");
  	}

    if(next.visible.DummySection != pev.visible.DummySection){
      console.log("dummy visible", next.visible.DummySection);
    }
  }

  render(){

  }

}