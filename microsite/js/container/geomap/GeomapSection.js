export let __hotReload = true

import {Section} from '../../Section';
import {Geomap} from './Geomap';

export class GeomapSection extends Section {

  constructor(state, db){
    super(state,db);

    this.title.text(`Places`);
    this.geomap = new Geomap(state,db, this.div.append("div"))
    this.geomap.outerHeight = parseInt(this.div.style("height"))-80;
    this.geomap.init();
  }


  stateChange(next, pev){

  }

  render(){

  }

}