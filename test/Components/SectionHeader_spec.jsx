import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import SectionHeader from '../../client/Components/SectionHeader.jsx';
import {expect} from 'chai';

const {renderIntoDocument,
       findRenderedDOMComponentWithClass,
       scryRenderedDOMComponentsWithClass,
       Simulate} = ReactTestUtils;

describe('SectionHeader', () => {

    it('renders the sectionHeader', () => {
        const component = renderIntoDocument(
            <SectionHeader/>
        );
        const div = scryRenderedDOMComponentsWithClass(component, 'sectionHeader');
        expect(div.length).to.equal(1);
    });
});
