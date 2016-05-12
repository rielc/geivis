import React from 'react';
import { Route } from 'react-router';
import pako from 'pako';

import GeiVis from './containers/GeiVis'; // eslint-disable-line import/no-named-as-default
import NotFoundPage from './components/NotFoundPage.js';
import * as actions from './actions/GeiVisActions';
import store from './store.js';


function onChange(prevState, nextState, replace, callback){
  // console.log("onChange", state, nextState.location.search, prevState);
  const query = nextState.location.query;
  if(query.payload){

    const binaryString = atob(decodeURIComponent(query.payload));
    const newState = JSON.parse(pako.inflate(binaryString, { to: 'string' }));

    if(nextState.location.action == "POP"){
      store.dispatch(actions.loadState(newState));
    }
  } else {
    store.dispatch(actions.loadState(null));
  }


  //callback();
}

export default (
  <Route path="/">
    <Route path="test" component={NotFoundPage} />
    <Route path="vis" component={GeiVis} onChange={onChange}/>
  </Route>
);
