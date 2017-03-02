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
       //this.scrollTo(next.scrollY);
    }

    if((next.activeSection != prev.activeSection)){
      this.updateNavi(next.activeSection);
    }
  }

  updateNavi (section) {
    const activeLink = section.replace("Section", "");
    d3.select('.navi').selectAll('a')
      .classed("active", (d,i,a)=>{
        return a[i].hash.replace('#/', '') == activeLink;
      })
  }


  scrollTo(pos){
    // scrollTo(0,pos);
    // this.syntetic = true;
    this.state.push({ scrolling: true });

    const top = document.body.scrollTop || window.scrollY;
    // console.log(top, window.scrollY);

    console.log("scrollTo", top, pos)


    d3.select("body")
      .transition()
      .duration(1000)
      .tween("scroll", this.scrollTween(pos, top))
      .on("end", ()=> { 
        this.state.push({ scrolling: false });
        this.check();
      })
  }

  scrollTween(offset, top) {
    return function() {
      var i = d3.interpolateNumber(top, top+offset);
      return function(t) { window.scrollTo(0, i(t)); };
    };
  }

  scrollToSection(section){
    console.log("scrollToSection", section);
    if(section != ""){
      // let offset2 = document.getElementById(section).offsetTop;
      const offset = document.getElementById(section).getBoundingClientRect().top;
      // const offset2 = document.getElementById(section+"Section").getBoundingClientRect().top;
      this.scrollTo(offset);
    }
    
  }

  destroy(){
    this.state.unsubscribe(this);
    window.removeEventListener("scroll", this.check);
  }
}

