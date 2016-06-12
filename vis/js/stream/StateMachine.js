export let __hotReload = true

// import objectAssign from 'object-assign';
// objectAssign({}, state, action.state);

export class StateMachine {

  constructor(){
    this.state = {
      brushStart:null,
      brushEnd:null,
      active:"subjects",
      activeItem:null
    }
    this.history = [];
    this.history.push(Object.assign({}, this.state));
    this.size = 10;
    this.listener = [];
  }

  push(state){
    if(this.history.length >= this.size){
      this.history.pop();
    }
    this.lastState = this.history[0];
    const newState = Object.assign(this.state, state);
    this.history.unshift(newState);
    this.state = Object.assign({}, newState);
    this.broadcast();
    // console.log(newState);
  }

  listen(func){
    this.listener.push(func);
  }

  broadcast(){
    this.listener.forEach(func => func(this.state, this.lastState));
  }
}