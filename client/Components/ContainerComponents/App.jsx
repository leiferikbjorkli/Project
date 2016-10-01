import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTagsIfNeeded } from './../../actions/tagsActions';
import { fetchEventsIfNeeded } from './../../actions/eventsActions';
import { fetchGroupsIfNeeded } from './../../actions/groupsActions';


class App extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(fetchEventsIfNeeded());
  //   dispatch(fetchTagsIfNeeded());
  //   dispatch(fetchGroupsIfNeeded());
  // }
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
