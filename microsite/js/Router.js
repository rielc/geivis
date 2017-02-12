export function __hotReload(){
  window.router.destroy();
  return true;
}

import {debounce, isEqual} from 'lodash'

export class Router {

  constructor(state, scroll){
    this.name = this.constructor.name;
    this.state = state;
    this.scroll = scroll;
    this.state.subscribe(this);
    this.hashchange = this.hashchange.bind(this)

    window.addEventListener("hashchange", this.hashchange);
  }

  stateChange(next, prev){

    if(next.activeSection != prev.activeSection){
      const newHash = '#/' + next.activeSection.replace("Section", "");
      const oldHash = window.location.hash;
      if(newHash != oldHash) {
        history.pushState(null, null, newHash);
      }
    }
  }

  hashchange (hashchange) {
    const section = window.location.hash.slice(2);
    this.scroll.scrollToSection(section);
    return false;
  }

  destroy(){
    this.state.unsubscribe(this);
    window.removeEventListener("hashchange", this.hashchange);
  }
}