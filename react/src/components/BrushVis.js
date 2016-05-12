import React, {PropTypes} from 'react';

class BrushVis extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.inputKeypress = this.inputKeypress.bind(this);
  }

  inputKeypress(e) {
    const val = e.target.value;
    this.props.actions.saveState({ from: val });
    // this.props.actions.loadState({ from: val });
  }

  render() {
    const {appState} = this.props;

    console.log(appState);

    return (
      <div>
        Hello
        <input type="text" name="test" onChange={this.inputKeypress}
          value={appState.from}/>
      </div>
    );
  }
}

BrushVis.propTypes = {
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default BrushVis;
