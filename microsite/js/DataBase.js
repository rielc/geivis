export let __hotReload = true

export class DataBase {

  constructor(state){
    this.data = [];
    this.formater = d3.timeParse("%Y");
    this.extent = [0,0];
    this.crossfilter = {};
    this.state = state;
    this.name = this.constructor.name;
    this.store = {};
    this.bookshelfData = [];

    this.state.subscribe(this);
  }


  load(){
    // this.state.push({ loading: true });

    d3.csv("data/data.csv", (data)=> {
    d3.csv("data/geocode.csv", (geocode)=> {
    d3.json("data/map/topo.json", (rivers)=> {
    d3.json("data/map/landbig.json", (land)=> {

      this.add({rivers});
      this.add({land});
      this.init(data,geocode);

      this.state.push({ loaded: true, keyframe:true })


    })
    })
    })
    })

    return this;
  }

  init(_data, _geocode){
    this.data = _data.filter(d=>d.year <= 1920 && d.year >= 1717);
    this.geocode = _geocode;
    
    this.data.forEach(d => {
      d.date = this.formater(d.year);
      d.year = parseInt(d.year);
      d.place = d.publisher_city;

      const geo = _geocode.find(g => g.name === d.place);
      d.lat = geo ? +geo.lat : null;
      d.lon = geo ? +geo.lon : null;

      d.RSWKTag = d.RSWKTag.split(",");

      d.publisher = d.publisher || "none";
      d.schoollevel = d.schoollevel || "none";
      d.subject = d.subject || "none";
      d.place = d.place || "none";
    })

    this.extent = d3.extent(this.data, d => d.date);
    this.extent[1] = new Date(+this.extent[1]+10000);
    
    console.log(this.extent)

    this.crossfilter = crossfilter(this.data);
    this.all = this.crossfilter.groupAll();

    this.date = this.crossfilter.dimension(d => d.date);
    this.dates = this.date.group(d3.timeYear);

    this.subject = this.crossfilter.dimension(d => d.subject);
    this.subjects = this.subject.group();
    
    this.schoollevel = this.crossfilter.dimension(d => d.schoollevel);
    this.schoollevels = this.schoollevel.group();
    
    this.publisher = this.crossfilter.dimension(d => d.publisher);
    this.publishers = this.publisher.group();

    this.place = this.crossfilter.dimension(d => d.place);
    this.places = this.place.group();

    this.tag = this.crossfilter.dimension(d => d.RSWKTag || [], true);
    this.tags2 = this.crossfilter.dimension(d => d.RSWKTag || [], true).group();
    this.tags = this.tag.group();

    this.stack = d3.stack()
      .value((d,k)=>d.value[k])
      .order(d3.stackOrderAscending)
      .offset(d3.stackOffsetNone);

    this.filters = {};

    return this;
  }

  filterTag(tag){
    // let data = this.date.top(Infinity);
    // console.log(data[0]);

    console.time("tags");
    this.tag.filter(tag)
    let tags = this.tags2.all() //.all().sort((b,a) => a.value - b.value)
    console.timeEnd("tags");
    console.log(tags);
    // console.log(this.places.all());

  }

  add(data){
    this.store = { ...data, ...this.store };
    // console.log(this.store);
    return this;
  }

  bookshelf(){
    const visible = this.state.state.visible;

    if(visible.TreemapSection || visible.NetworkSection){
      return this.bookshelfData;
    }
    
    return this.date.top(150);
  }

  stackedHistogram(){

    this.date.filterAll();
    
    const key = this.state.state.active.substring(0,this.state.state.active.length-1);
    let keys = this[this.state.state.active].top(20).map(d => d.key);
    keys.push("other");
    const other = keys.length-1;

    
    function reduceAdd(p, v, nf) {
      const i = keys.indexOf(v[key]);
      // ++p[i+1 ? i : other];
      ++p[i+1 ? i : other];
      return p;
    }

    function reduceRemove(p, v, nf) {
      const i = keys.indexOf(v[key]);
      // --p[i+1 ? i : other];
      --p[i+1 ? i : other];
      return p;
    }

    function reduceInitial() {
      return keys.map(d => 0);
    }

    const histogram = this.dates.reduce(reduceAdd, reduceRemove, reduceInitial).all();
    let stack = this.stack.keys(keys.map((d,i) => i))(histogram);
    stack.forEach(d => { d.key = keys[d.key]; })
    //console.log(stack);

    this.date.filterRange([this.state.state.brushStart, this.state.state.brushEnd]);
    
    return stack;
  }

 

  stateChange(next, curr){

    // this.filterTag("Preußen")

    if(next.brushStart !== curr.brushStart){
      if(next.brushStart*1 === next.brushEnd*1){
        this.date.filterAll();
      } else {
        // hack for filterRange see https://github.com/crossfilter/crossfilter/wiki/Crossfilter-Gotchas#filterrange-does-not-include-the-top-point
        const brushStart = next.brushStart;
        const brushEnd = +next.brushEnd+10000; 
        this.date.filterRange([brushStart, brushEnd]);
      }
    }

    if(next.activeItem !== curr.activeItem){
      // let k2 = curr.active.substring(0,curr.active.length-1);
      // this[k2].filterExact(null);

      // let k = next.active.substring(0,next.active.length-1);
      // this[k].filterExact(next.activeItem);

      // this.filters[k] = next.activeItem;

      //console.log(curr.active, next.active)
      // console.log(this.filters, Object.keys(this.filters))

      // Object.keys(this.filters).forEach(k=>{
      //   this[k].filterExact(this.filters[k]);
      // })



    }

    if(next.filters !== curr.filters){
      console.log(next.filters);

      Object.keys(next.filters).forEach(k=>{
        this[k.substring(0,k.length-1)].filterExact(next.filters[k]);
      })

    }




    // if(next.loaded == !curr.loaded){
    //   this.state.push({ brushStart: this.extent[0], brushEnd: this.extent[1], keyframe:true })
    // }

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

  // merge(_data, _dataRaw){
  //   console.log(this.data[0], _dataRaw[0])

  //   _data.forEach((d,i) => {
  //     const a = _dataRaw.find(d2 => (d2.title == d.title && d2.year == d.year && d2.subject == d.subject));
  //     if(!a){
  //       console.log(d);
  //     }
  //   })
  // }

  // d3histogram(){
  //   const bins = this.x.ticks(d3.timeYear);

  //   console.time("histo")
  //   let histo = d3.histogram()
  //       .value(d=> { return d.date})
  //       .domain(this.x.domain())
  //       .thresholds(bins)(_data);
  //   console.timeEnd("histo")

    

  //   histo.forEach(bin => {
  //     bin.nest = d3.nest()
  //       .key(d => d[k] || null)
  //       .entries(bin);
  //   })
  // }
}