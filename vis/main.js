// import the modules 

import { StateMachine, DataBase, StreamGraph, VisDebugList, VisTypesList, Test } from './js/StreamGraph'
import NestedTreemap from './js/NestedTreemap'


// initiate and connect the modules
let state = new StateMachine();
let db = new DataBase(state); // every module that listens to the state needs a reference to the statemachine
let stream = new StreamGraph(state, db).init();
let debugList = new VisDebugList().render();

let test = new Test(state, db);
let test2 = new Test(state, db).Key("schoollevels");
let test3 = new Test(state, db).Key("langs");
let test4 = new Test(state, db).Key("publishers");


let ntr = new NestedTreemap();
ntr
  .setLevelA("Ort")
  .setLevelB("Schulfach");

ntr
  .addNesting("Schulfach", function (d) { return (d.subject==undefined) ? "Schulfach unbekannt" : d.subject })
  .addNesting("Schultyp", function levelA(d) { return (d.schooltype==undefined) ? "Schultyp unbekannt" : d.schooltype; })
  .addNesting("Schullevel", function (d) { return (d.schoollevel==undefined) ? "Schullevel unbekannt" : d.schoollevel })
  .addNesting("Ort", function (d) { return (d.publisher_city==undefined) ? "Ort unbekannt" : d.publisher_city; })
  .addNesting("Verlag", function (d) { return (d.publisher==undefined) ? "Verlag unbekannt" : d.publisher; });

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