export let __hotReload = true


export class TreemapContainer {

  constructor(state, db){
    this.state = state;
  	this.state.listen(this.stateChange.bind(this));
    this.db = db;


  	d3.select("#"+TreemapContainer.name).remove(); //hotreload hotfix
  	this.div = d3.select(".container").append("section").attr("id", TreemapContainer.name);

  	this.divDummy = this.div.append("div").attr("class", "dummy");
  	
  }


  stateChange(next, last){

  	if(next.loaded == !last.loaded){
  	   console.log("init dummy");
  	}
  }

  render(){

  }

}