export let __hotReload = true

import objectAssign from 'object-assign';

export class StateMachine {

  constructor(){
    this.state = {
      brushStart:null,
      brushEnd:null,
      active:"subjects",
      activeItem:null,
      loaded:false,
      timestamp:null,
      visible: { StreamSection: true }
    }
    this.history = [];
    this.history.push(objectAssign({}, this.state));
    this.size = 10;
    this.subscriber = [];
  }

  push(state){
    //console.log("push");
    if(this.history.length >= this.size){
      this.history.pop();
    }
    const lastState = this.history[0];
    const newState = objectAssign({}, this.state, state);
    this.history.unshift(newState);
    // this.state = objectAssign({}, newState);
    this.lastState = lastState;
    this.state = newState;
    // console.log(newState)
    this.broadcast();
  }

  subscribe(c){
    this.subscriber.push(c);
  }

  broadcast(){
    // console.log("broadcast", this.state.brushEnd, this.state.brushEnd);
    // console.log(this.subscriber);
    const lastState = this.lastState;
    const newState = this.state;

    this.subscriber.map(s => {
      //console.log("broadcast", s.name)
      s.stateChange(newState, lastState)
    });
  }
}