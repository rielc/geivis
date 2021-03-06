export let __hotReload = true;

import {StateMachine} from './js/StateMachine'
import {DataBase} from './js/DataBase'
import {ScrollListener} from './js/ScrollListener'
import {Router} from './js/Router'
import {StreamSection} from './js/container/stream/StreamSection'
import {DummySection} from './js/container/dummy/DummySection'
import {BookshelfSection} from './js/container/bookshelf/BookshelfSection'
import {GeomapSection} from './js/container/geomap/GeomapSection'
import {Tooltip} from './js/Tooltip'

import {NetworkSection} from './js/container/network/NetworkSection'
import {TreemapSection} from './js/container/treemap/TreemapSection'

import {AboutSection} from './js/container/about/AboutSection'

let state = new StateMachine();
window.state = state;
let db = new DataBase(state);
let scroll = new ScrollListener(state)
// window.scroll = scroll;
let router = new Router(state, scroll)
// window.router = router;
let tooltip = new Tooltip(state)

let bookshelfSection = new BookshelfSection(state, db);
let streamSection = new StreamSection(state, db);
let geomapSection = new GeomapSection(state, db);

let treemapSection = new TreemapSection(state, db);
let networkSection = new NetworkSection(state, db);


let aboutSection = new AboutSection(state, db);


// let dummy = new DummySection(state, db);

db.load()
