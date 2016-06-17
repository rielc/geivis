export let __hotReload = true;

import {StateMachine} from './js/StateMachine'
import {DataBase} from './js/DataBase'
import {ScrollListener} from './js/ScrollListener'
import {StreamSection} from './js/container/stream/StreamSection'
import {DummySection} from './js/container/dummy/DummySection'
import {BookshelfSection} from './js/container/bookshelf/BookshelfSection'
import {GeomapSection} from './js/container/geomap/GeomapSection'


import {NetworkSection} from './js/container/network/NetworkSection'
import {TreemapSection} from './js/container/treemap/TreemapSection'

let state = new StateMachine();
let db = new DataBase(state);
let scroll = new ScrollListener(state)

let streamSection = new StreamSection(state, db);

let geomapSection = new GeomapSection(state, db);

let treemapSection = new TreemapSection(state, db);
let networkSection = new NetworkSection(state, db);

let bookshelfSection = new BookshelfSection(state, db);

// let dummy = new DummySection(state, db);

db.load()
