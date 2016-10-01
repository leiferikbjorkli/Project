import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/expandedActions'

export const ToggleExpand = React.createClass({
    getClassName: function() {
        return this.props.expanded ? 'tags-expand expanded' : 'tags-expand';
    },
    render: function() {
        return <a className={this.getClassName()} onClick={() => this.props.toggleExpanded()}>
            FILTRER
        </a>;
    }
});

function mapStateToProps(state) {
    return {
        expanded: state.get('expanded')
    }
}

export default connect(mapStateToProps, actionCreators)(ToggleExpand);
