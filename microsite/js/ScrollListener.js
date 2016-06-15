export function __hotReload(){
   // window.removeEventListener('scroll')
   return true;
}

import {debounce, fromPairs} from 'lodash'

export class ScrollListener {

  constructor(state){
    this.name = this.constructor.name;
    this.state = state;
    this.state.subscribe(this);
    window.addEventListener('scroll', debounce(this.check, 150).bind(this));
    //this.check();

  }

  check(){
    const visible = this.state.subscriber.filter(d=> d.type == "section").map(s => {
    
      const rect = s.div.node().getBoundingClientRect();
      const height = (window.innerHeight || document.documentElement.clientHeight);
      const visible = (rect.top >= -height && rect.top <= height);

      return [s.name, visible];
    });
    
    // this.state.push({ scrollY : window.scrollY });
    // this.state.push({visible});
    this.state.push({ visible: fromPairs(visible) });
    // console.log();
  }

  stateChange(next, prev){
    if(next.loaded == !prev.loaded){
       this.check();
    }
  }

}

