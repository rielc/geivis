import {SAVE_STATE, LOAD_STATE, TEST} from '../constants/actionTypes';

import objectAssign from 'object-assign';
import initialState from './initialState';
import { hashHistory } from 'react-router'
import pako from 'pako';


export default function geiVisAppState(state = initialState, action) {

  switch (action.type) {
    case SAVE_STATE:{

      const newState = objectAssign({}, state, action.state);


      const binaryString = pako.deflate(JSON.stringify(newState), { to: 'string' });
      const b64 = btoa(binaryString);

      console.log(JSON.stringify(newState).length);
      console.log(b64.length);

      hashHistory.push({ pathname: '/vis', query: {payload: encodeURIComponent(b64)}});

      return newState;
    }

    case TEST:{
      console.log(action);
      return state;
    }

    case LOAD_STATE:{
      // console.log(action.state === state);
      return action.state ? action.state : initialState;
    }

    default:
      return state;
  }
}
