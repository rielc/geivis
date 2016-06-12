export let __hotReload = true

// bookshelf on side
// scroll runter oberkante 2te vis -> schrumpfen
// sub filter nur in eigener vis
// kleine circle hellblau
// stream unterscheidung nein (border weg)

// import the modules 

import {StateMachine} from './js/stream/StateMachine'
import {StreamGraph} from './js/stream/StreamGraph'
import {DataBase} from './js/stream/DataBase'
// import {Map} from './js/stream/Map'
import {BarList} from './js/stream/BarList'
import {Bookshelf} from './js/stream/Bookshelf'

// initiate and connect the modules
let state = new StateMachine();
let db = new DataBase(state);

let stream = new StreamGraph(state, db).init();
// let debugList = new VisDebugList().render();

d3.select(".entities").selectAll("*").remove() // temp fix
let list1 = new BarList(state, db);
let list2 = new BarList(state, db).Key("schoollevels");
let list3 = new BarList(state, db).Key("publishers");
let list4 = new BarList(state, db).Key("places");

let bookshelf = new Bookshelf(state, db);

// let map = new Map(state, db).init();

// d3.json("../data/better-data.json", function (data2) {
d3.csv("../data/data.csv", function (data) {
d3.csv("../data/geocode.csv", function (geocode) {
  // console.log(data[0], data2[0]);

  db.add("geocode", geocode);
  db.load(data, geocode);
  // db.merge(data, data2);

  state.push({ brushStart: db.extent[0], brushEnd: db.extent[1], keyframe:true })
  
  stream.x.domain(db.extent);
  stream.load().render();




})
})
// })
