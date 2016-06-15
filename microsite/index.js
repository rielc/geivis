export let __hotReload = true;

import {StateMachine} from './js/StateMachine'
import {DataBase} from './js/DataBase'
import {ScrollListener} from './js/ScrollListener'
import {StreamSection} from './js/container/stream/StreamSection'
import {DummySection} from './js/container/dummy/DummySection'


import {NetworkSection} from './js/container/network/NetworkSection'
import {TreemapSection} from './js/container/treemap/TreemapSection'

let state = new StateMachine();
let db = new DataBase(state);
let scroll = new ScrollListener(state)

let streamSection = new StreamSection(state, db);
let networkSection = new NetworkSection(state, db);
let treemapSection = new TreemapSection(state, db);

db.load()
