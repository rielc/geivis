export let __hotReload = true;

import {StateMachine} from './js/StateMachine'
import {DataBase} from './js/DataBase'
import {ScrollListener} from './js/ScrollListener'
import {StreamSection} from './js/container/stream/StreamSection'
import {NetworkSection} from './js/container/network/NetworkSection'
import {DummySection} from './js/container/dummy/DummySection'

let state = new StateMachine();
let scroll = new ScrollListener(state);
let db = new DataBase(state).load();

let streamSection = new StreamSection(state, db);
let networkSection = new NetworkSection(state, db);
// let dummySection = new DummySection(state, db);
