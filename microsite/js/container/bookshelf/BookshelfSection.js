export let __hotReload = true

import {Section} from '../../Section';
import {Bookshelf} from './Bookshelf';

export class BookshelfSection extends Section {

  constructor(state, db){
    super(state,db);
    this.type = "sidebar";
    this.title.text("Books");

    let bookshelf = new Bookshelf(state,db, this.div);
  }


  stateChange(next, pev){
  
  }

  render(){

  }

}