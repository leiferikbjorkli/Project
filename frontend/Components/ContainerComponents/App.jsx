import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <main>
        YO WORLD!
      </main>
    );
  }
}

App.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node,
};


function mapStateToProps(state) {
  return {
    events: state.getIn(['events', 'items']),
  };
}


export default connect(mapStateToProps)(App);
