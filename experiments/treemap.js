// import the modules 
import { StateMachine, DataBase, StreamGraph, VisDebugList, VisTypesList, Test } from './js/StreamGraph'
import NestedTreemap from './js/NestedTreemap'
//import RangeSlider from './js/RangeSlider'

// initiate and connect the modules
let state = new StateMachine();
let db = new DataBase(state); // every module that listens to the state needs a reference to the statemachine
let stream = new StreamGraph(state, db).init();
let debugList = new VisDebugList().render();

let test = new Test(state, db);
let test2 = new Test(state, db).Key("schoollevels");
let test3 = new Test(state, db).Key("langs");
let test4 = new Test(state, db).Key("publishers");

/*
let rs = new RangeSlider( { margin : { left:10, right:10, top:10, bottom:10 } } );
rs.setParent( d3.select('#treemap .control') );
rs.setScale();
rs.setBrushEvent( (extent) => { console.log(extent) } );

/*

function brushed() {
  var extent0 = brush.extent(),
      extent1;

  // if dragging, preserve the width of the extent
  if (d3.event.mode === "move") {
    var d0 = d3.time.day.round(extent0[0]),
        d1 = d3.time.day.offset(d0, Math.round((extent0[1] - extent0[0]) / 864e5));
    extent1 = [d0, d1];
  }

  // otherwise, if resizing, round both dates
  else {
    extent1 = extent0.map(d3.time.day.round);

    // if empty when rounded, use floor & ceil instead
    if (extent1[0] >= extent1[1]) {
      extent1[0] = d3.time.day.floor(extent0[0]);
      extent1[1] = d3.time.day.ceil(extent0[1]);
    }
  }
}

*/

let ntr = new NestedTreemap();

ntr.layout = "";
ntr.layout = "SliceDice";

ntr
  .setLevelA("Schulfach")
  .setLevelB("Ort");

ntr
  .addNesting("Schulfach", function (d) { return (d.subject==undefined) ? "Schulfach unbekannt" : d.subject })
  .addNesting("Schultyp", function levelA(d) { return (d.schooltype==undefined) ? "Schultyp unbekannt" : d.schooltype; })
  .addNesting("Schullevel", function (d) { return (d.schoollevel==undefined) ? "Schullevel unbekannt" : d.schoollevel })
  .addNesting("Ort", function (d) { return (d.publisher_city==undefined) ? "Ort unbekannt" : d.publisher_city; })
  .addNesting("Verlag", function (d) { return (d.publisher==undefined) ? "Verlag unbekannt" : d.publisher; });

ntr
  .setState(state, db);

ntr
  .init("#treemap")
  .loadData("../data/better-data.json");


d3.json("../data/better-data.json", (data) =>  {
  //console.log(data, data[0]);
  db.load(data);
  state.push({ brushStart: db.extent[0], brushEnd: db.extent[1] })
  stream.x.domain(db.extent).nice(d3.time.year);
  stream.load(db.data).render();
})