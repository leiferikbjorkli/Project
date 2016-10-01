import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './../../actions/activeFilterActions';

export const Tag = React.createClass({
    getClassName: function(){
        return this.isActive() ? 'filter filter-active' : 'filter';
    },
    isActive: function() {
        return this.props.activeFilter.has(this.props.tag);
    },
    render: function() {
        return <a className={this.getClassName()} onClick={() => {
                this.props.toggleFilter(this.props.tag);
            }}>
            <span className='circle'/>
            <span className='name'>{this.props.tag}</span>
        </a>
    }
});


function mapStateToProps(state) {
    return {
        activeFilter: state.get('activeFilter')
    }
}

export default connect(mapStateToProps, actionCreators)(Tag);
