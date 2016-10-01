import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import NewEventLink from '../../client/Components/NewEventLink.jsx';
import {expect} from 'chai';

const {renderIntoDocument, findRenderedDOMComponentWithTag} = ReactTestUtils;

describe('NewEventLink', () => {
    it('renders a link with href "#/new" and class "new-event"', () => {
        const component = renderIntoDocument(
            <NewEventLink />
        );
        const divContainer = findRenderedDOMComponentWithTag(component, 'div');
        expect(divContainer.className).to.equal('new-event');
    });
})
