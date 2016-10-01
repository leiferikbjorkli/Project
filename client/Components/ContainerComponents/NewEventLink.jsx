import React from 'react';
import {Link} from 'react-router';

const NewEventLink = React.createClass({
    render: function() {
        return <div className="new-event">
            <Link to='/new'>
                <span>Ny Fagaktivitet</span>
            </Link>
        </div>;
    }
});

export default NewEventLink;
