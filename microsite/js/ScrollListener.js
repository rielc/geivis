export function __hotReload(){
  window.scroll.destroy();
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
    this.scrollY = window.scrollY;
    // if(this.syntetic) return;
    // console.log("check")

    const visible = this.state.subscriber.filter(d=> d.type == "section").map(s => {
      const rect = s.div.node().getBoundingClientRect();
      const height = parseInt(s.div.style("height")) - 188;
      const visible = (rect.top >= -height && rect.top <= height);

      return [s.name, visible];
    });

    const active = visible.find(v => v[1]);
    const activeSection = active ? active[0] : '';

    this.state.push({ scrollY: window.scrollY, visible: fromPairs(visible), activeSection });
  }

  stateChange(next, prev){

    if(next.loaded == !prev.loaded){
      console.log("check", next.visible)

       this.check();
       this.scrollTo(next.scrollY);
    }
  }

  scrollTo(pos){
    // scrollTo(0,pos);
    // this.syntetic = true;

    d3.select("body")
      .transition()
      .duration(1000)
      .tween("scroll", this.scrollTween(pos))
      // .on("end", ()=> { 
      //   this.syntetic = false;
      //   this.check();
      // })
  }

  scrollTween(offset) {
    const top = this.scrollY;
    return function() {
      var i = d3.interpolateNumber(top, top+offset);
      return function(t) { scrollTo(0, i(t)); };
    };
  }

  scrollToSection(section){
    console.log("scrollToSection", section);
    let offset = 0;
    if(section != ""){
      // offset = document.getElementById(section).offsetTop;
      offset = document.getElementById(section).getBoundingClientRect().top;
      // console.log(offset)
      this.scrollTo(offset);
    }
    
  }

  destroy(){
    this.state.unsubscribe(this);
    window.removeEventListener("scroll", this.check);
  }
}

