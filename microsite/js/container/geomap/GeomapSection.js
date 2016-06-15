export let __hotReload = true

import {Section} from '../../Section';
import {Geomap} from './Geomap';

export class GeomapSection extends Section {

  constructor(state, db){
    super(state,db);

    this.geomap = new Geomap(state,db, this.div).init();
  }


  stateChange(next, pev){
  
  }

  render(){

  }

}