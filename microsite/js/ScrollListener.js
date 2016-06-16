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
    // window.addEventListener('scroll', debounce(this.check, 150).bind(this));
    window.addEventListener('scroll', this.check.bind(this));
    //this.check();

  }

  check(){
    const visible = this.state.subscriber.filter(d=> d.type == "section").map(s => {
    
      const rect = s.div.node().getBoundingClientRect();
      const height = parseInt(s.div.style("height")) - 100;
      const visible = (rect.top >= -height && rect.top <= height);

      // console.log(s.name, visible);
      
      return [s.name, visible];
    });


    this.state.push({ scrollY: window.scrollY, visible: fromPairs(visible) });
  }

  stateChange(next, prev){
    if(next.loaded == !prev.loaded){
       this.check();
       this.scrollTo(next.scrollY);
    }
  }

  scrollTo(pos){
    scrollTo(0,pos);

    // d3.transition()
    //   // .delay(0)
    //   .duration(1000)
    //   .tween("scroll", this.scrollTween(pos));
  }

  scrollTween(offset) {
    return function() {
      var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
      return function(t) { scrollTo(0, i(t)); };
    };
  }

}

