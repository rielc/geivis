export let __hotReload = true;


//chris imports
import {StateMachine} from './js/StateMachine'
import {DataBase} from './js/DataBase'

import {StreamContainer} from './js/container/stream/StreamContainer'



let state = new StateMachine();
let db = new DataBase(state);

let streamContainer = new StreamContainer(state, db);

db.load();
// let treemapContainer = new TreemapContainer(state, db);



// import {Map} from './js/stream/Map'
// import {StreamGraph} from './js/stream/StreamGraph'

// import {BarList} from './js/stream/BarList'
// import {Bookshelf} from './js/stream/Bookshelf'


// // gabriel imports
// import {classificationTags} from './data/classificationTags'
// import {CirclePackedNetwork} from './js/network/CirclePackedNetwork'
// import {NestedTreemap} from './js/treemap/NestedTreemap'


// // globals
// const margin = {'top':180,'right':50,'bottom':50,'left':50};

// // global init and modules
// let state = new StateMachine();
// let db = new DataBase(state);


// // chris modules init
// let stream = new StreamGraph(state, db).init();

// d3.select(".entities").selectAll("*").remove() // temp fix
// let list1 = new BarList(state, db);
// let list2 = new BarList(state, db).Key("schoollevels");
// let list3 = new BarList(state, db).Key("publishers");
// let list4 = new BarList(state, db).Key("places");
// let bookshelf = new Bookshelf(state, db);


// // gabriel modules init
// // create a blacklist of tags to ignore because they are part of the classification
// let blacklist = []; 
// d3.values(classificationTags).forEach( e1 => {
//   d3.values(e1).forEach( e2 => {
//     e2.forEach( e3 => { 
//       blacklist.push(e3);
//     }); 
//   });
// });


// d3.selectAll("#network-visualization").remove();

// let network;


// d3.csv("../data/data.csv", function (data) {
// 	d3.csv("../data/geocode.csv", function (geocode) {

//     // global init
//     db.add("geocode", geocode);
//     db.load(data, geocode);
//     // db.merge(data, data2);
//     state.push({ brushStart: db.extent[0], brushEnd: db.extent[1], keyframe:true })
  
//   // chris init
//   stream.x.domain(db.extent);
//   stream.load().render();

//   // gabriel init
//   // network = new
//   //   CirclePackedNetwork( {'margin':margin} )
//   //   .bindDatabase(db)
//   //   .bindStateMachine(state)
//   //   .setBlacklist(blacklist)
//   //   //.setBlacklist(["Deutschland"])
//   //   .setNodeAccessor("RSWKTag")
//   //   .setOccurrenceScale( d3.scaleLinear().domain([0,1]).range([0.5, 1.0])  )
//   //   .append("#network")
//   //   .updateData(db.dates.top(Infinity))
//   //   .render();
      
// 	})
// })