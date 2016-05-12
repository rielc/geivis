import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/GeiVisActions';
import BrushVis from '../components/BrushVis';


class GeiVis extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
    // console.log("MOUT", this);
  }

  componentWillReceiveProps(n){
    // console.log(this.props.location.query, n.location.query);

  }

  render() {
    const {appState} = this.props;

    // console.log(appState);

    return (
      <BrushVis {...this.props} />
    );
  }
}

GeiVis.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};


function mapStateToProps(state) {
  return {
    appState: state.geiVisAppState
  };
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeiVis);
