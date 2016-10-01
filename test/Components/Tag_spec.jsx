import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {Tag} from '../../client/Components/Tag.jsx';
import {expect} from 'chai';
import {Set} from 'immutable';

const {renderIntoDocument,
       findRenderedDOMComponentWithTag,
       scryRenderedDOMComponentsWithClass,
       findRenderedDOMComponentWithClass,
       Simulate} = ReactTestUtils;

describe('Tag', () => {
    it('renders a link with an inactive tag', () => {
        const tag = 'test'
        const component = renderIntoDocument(
            <Tag key={tag} tag={tag} activeFilter={Set()}/>
        );

        const link = findRenderedDOMComponentWithTag(component, 'a');
        const circle = scryRenderedDOMComponentsWithClass(component, 'circle');
        const name = scryRenderedDOMComponentsWithClass(component, 'name');
        expect(link.className).to.equal('filter');
        expect(circle.length).to.equal(1);
        expect(name.length).to.equal(1);
        expect(name[0].textContent).to.equal(tag);
    });


    it('renders a link with an active tag', () => {
        const tag = 'test';
        const component = renderIntoDocument(
            <Tag key={tag} tag={tag} activeFilter={Set(['test'])} />
        );

        const link = findRenderedDOMComponentWithTag(component, 'a');
        expect(link.className).to.equal('filter filter-active');
    });

    it('invokes toggleFilter function when tag is clicked', () => {
        let toggleFilterTag;
        const tag = 'test';
        const toggleFilter = (t) => {
            toggleFilterTag = t;
        };
        const component = renderIntoDocument(
            <Tag key={tag.name} tag={tag} toggleFilter={toggleFilter} activeFilter={Set()} />
        );
        const link = findRenderedDOMComponentWithTag(component, 'a');
        Simulate.click(link);
        expect(toggleFilterTag).to.equal(tag);
    });
});
