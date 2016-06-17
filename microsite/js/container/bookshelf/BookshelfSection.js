export let __hotReload = true

import {Section} from '../../Section';
import {Bookshelf} from './Bookshelf';

export class BookshelfSection extends Section {

  constructor(state, db){
    super(state,db);
    
    this.title.text("Books (first 100)");

    let bookshelf = new Bookshelf(state,db, this.div);
  }


  stateChange(next, pev){
  
  }

  render(){

  }

}