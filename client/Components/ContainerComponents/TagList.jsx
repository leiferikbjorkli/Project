import React from 'react';
import {connect} from 'react-redux';
import Tag from './Tag.jsx';
import activeTagSelector from './../../activeTagSelector'
import {Set} from 'immutable';

export const TagList = React.createClass ({
    getClassName: function() {
        return this.props.expanded ? 'filters expanded' : 'filters';
    },
    getTags: function() {
        return this.props.activeTags || Set();
    },
    render: function() {
        return <div className={this.getClassName()}>
            {this.getTags().sort((vA, vB) => {
                return vA.trim().localeCompare(vB.trim());
            }).map(tag => {
                return <Tag key={tag} tag={tag} />
            })}
        </div>
    }
});

function mapStateToProps(state) {
    return {
        expanded: state.get('expanded'),
        activeTags: activeTagSelector(state).activeTags
    }
}

export default connect(mapStateToProps)(TagList);
