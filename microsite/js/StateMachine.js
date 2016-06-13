export let __hotReload = true

import objectAssign from 'object-assign';
// objectAssign({}, state, action.state);

export class StateMachine {

  constructor(){
    this.state = {
      brushStart:null,
      brushEnd:null,
      active:"subjects",
      activeItem:null,
      loaded:false,
      timestamp:null
    }
    this.history = [];
    this.history.push(objectAssign({}, this.state));
    this.size = 10;
    this.subscriber = [];
  }

  push(state){
    if(this.history.length >= this.size){
      this.history.pop();
    }
    this.lastState = this.history[0];
    let newState = objectAssign({}, this.state, state);
    // newState.timestamp = +new Date();
    this.history.unshift(newState);
    this.state = objectAssign({}, newState);
    this.broadcast();
    // console.log(newState);
  }

  subscribe(c){
    this.subscriber.push(c);
  }

  broadcast(){
    this.subscriber.forEach(c => c.stateChange(this.state, this.lastState));
  }
}