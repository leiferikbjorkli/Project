import React from 'react';
import ToggleExpand from './ToggleExpand.jsx';
import TagList from './TagList.jsx';

export default React.createClass({
    render: function() {
        return <div>
            <div className='container link-and-tags'>
                <div className='tags-controls'>
                    <ToggleExpand/>
                </div>
            </div>
            <div className='filter-container'>
                <div className='container'>
                    <TagList/>
                </div>
            </div>
        </div>;
    }
});
