import * as types from '../constants/actionTypes';

export function saveState(state) {
  return {type: types.SAVE_STATE, state};
}

export function loadState(state) {
  return {type: types.LOAD_STATE, state};
}

export function test(state) {
  return {type: types.TEST, state};
}
