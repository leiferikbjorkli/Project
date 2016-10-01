import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {ToggleExpand} from '../../client/Components/ToggleExpand.jsx';
import {expect} from 'chai';

const {renderIntoDocument,
       findRenderedDOMComponentWithClass,
       scryRenderedDOMComponentsWithClass,
       Simulate} = ReactTestUtils;

describe('ToggleExpand', () => {

    it('renders a filter link', () => {
        const onClick = () => {}
        const component = renderIntoDocument(
            <ToggleExpand expanded={false} toggleExpanded={onClick} />
        );
        const link = scryRenderedDOMComponentsWithClass(component, 'tags-expand');
        expect(link.length).to.equal(1);
    });

    it('invokes the supplied onClick', () => {
        let test = false;
        const onClick = () => {test = true};
        const component = renderIntoDocument(
            <ToggleExpand expanded={false} toggleExpanded={onClick} />
        );
        const link = findRenderedDOMComponentWithClass(component, 'tags-expand');
        Simulate.click(link);
        expect(test).to.be.true;
    })
});
