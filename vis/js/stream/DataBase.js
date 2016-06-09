export let __hotReload = true
export class DataBase {

  constructor(state){
    this.data = [];
    this.formater = d3.timeParse("%Y");
    this.extent = [0,0];
    this.crossfilter = {};
    this.state = state;

    this.state.listen(this.stateChange.bind(this));
  }

  load(_data, _geocode){
    this.data = _data.filter(d=>d.year && d.year <= 1920 && d.year >= 1720);

    this.data.forEach(d => {
      d.date = this.formater(d.year);
      d.year = parseInt(d.year);
      d.place = d.publisher_city;

      const geo = _geocode.find(g => g.name === d.place);
      d.lat = geo ? geo.lat : null;
      d.lon = geo ? geo.lon : null;
    })
    this.extent = d3.extent(this.data, d => d.date);

    this.crossfilter = crossfilter(this.data);
    this.all = this.crossfilter.groupAll();

    this.year = this.crossfilter.dimension(d => d.year);
    this.years = this.year.group();
    this.date = this.crossfilter.dimension(d => d.date);
    this.dates = this.date.group(d3.timeYear);

    this.subject = this.crossfilter.dimension(d => d.subject || "none");
    this.subjects = this.subject.group();
    
    this.schoollevel = this.crossfilter.dimension(d => d.schoollevel || "none");
    this.schoollevels = this.schoollevel.group();
    
    this.publisher = this.crossfilter.dimension(d => d.publisher || "none");
    this.publishers = this.publisher.group();

    this.place = this.crossfilter.dimension(d => d.place || "none");
    this.places = this.place.group();

    this.stack = d3.stack()
      .value((d,k)=>d.value[k])
      .order(d3.stackOrderAscending)
      .offset(d3.stackOffsetNone);

    return this;
  }

  add(name, data){
    this[name] = data;
    return this;
  }

  stackedHistogram(){
    const key = this.state.state.active.substring(0,this.state.state.active.length-1);
    const keys = this[this.state.state.active].all().map(d => d.key);

    console.log(keys);

    function reduceAdd(p, v, nf) {
      ++p[keys.indexOf(v[key])]
      return p;
    }

    function reduceRemove(p, v, nf) {
      --p[keys.indexOf(v[key])]
      return p;
    }

    function reduceInitial() {
      return keys.map(d => 0);
    }

    const histogram = this.dates.reduce(reduceAdd, reduceRemove, reduceInitial).all();
    // console.log(histogram);

    let stack = this.stack.keys(keys.map((d,i) => i))(histogram);
    stack.forEach(d => { d.key = keys[d.key]; })
    // console.log(stack);
    
    return stack;
  }

  d3histogram(){
    // const bins = this.x.ticks(d3.timeYear);

    // console.time("histo")
    // let histo = d3.histogram()
    //     .value(d=> { return d.date})
    //     .domain(this.x.domain())
    //     .thresholds(bins)(_data);
    // console.timeEnd("histo")

    

    // histo.forEach(bin => {
    //   bin.nest = d3.nest()
    //     .key(d => d[k] || null)
    //     .entries(bin);
    // })
  }

  stateChange(next, curr){
    if(next.brushStart !== curr.brushStart){
      if(next.brushStart*1 === next.brushEnd*1){
        this.date.filterAll();
      } else {
        this.date.filterRange([next.brushStart, next.brushEnd]);
      }

      d3.select("#total").text(this.crossfilter.size());
      d3.select("#active").text(this.all.value());
    }

    if(next.activeItem !== curr.activeItem){
      let k = next.active.substring(0,next.active.length-1);
      //this[k].filterExact(next.activeItem);
    }

    // console.time("simple");
    // const startYear = this.state.brushStart.getFullYear();
    // const endYear = this.state.brushEnd.getFullYear();
    // const data = this.data.filter(d => d.year >= startYear && d.year <= endYear );
    // const nest = d3.nest().key(d => d.classification[this.key]).entries(data);
    // //console.log(nest);
    // console.timeEnd("simple");

    // console.time("crossfilter");
    // db.date.filterRange([this.state.brushStart, this.state.brushEnd]);
    // // console.log(group);
    // console.timeEnd("crossfilter");
  }
}