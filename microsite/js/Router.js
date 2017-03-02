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

    if(!next.scrolling && (next.activeSection != prev.activeSection)){
      const newHash = '#/' + next.activeSection.replace("Section", "");
      const oldHash = window.location.hash;
      if(newHash != oldHash) {
        // console.log("push", newHash)

        history.pushState(null, null, newHash);
        // window.location.hash = newHash;
      }
    }
  }

  hashchange (hashchange) {
    // there is still a bug when a hashchange is triggered via the history
    
    const section = window.location.hash.slice(2);
    // console.log("hashchange", section, hashchange);
    // console.log(window.scrollY);

    this.scroll.scrollToSection(section);
    hashchange.preventDefault();

    return false;
  }

  destroy(){
    this.state.unsubscribe(this);
    window.removeEventListener("hashchange", this.hashchange);
  }
}