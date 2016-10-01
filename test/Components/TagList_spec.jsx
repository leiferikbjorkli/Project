import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {List} from 'immutable';
import {Provider} from 'react-redux';
import {expect} from 'chai';
import configureStore from '../../client/configureStore'
import {TagList} from '../../client/Components/TagList.jsx';


const {renderIntoDocument,
       findRenderedDOMComponentWithClass,
       scryRenderedDOMComponentsWithClass,
       Simulate} = ReactTestUtils;

describe('TagList', () => {

    it('renders a list of tags', () => {
        const store = configureStore({});
        const tags = List(['tag1', 'tag2']);
        const toggleTagActive = () => {};
        const component = renderIntoDocument(
            <Provider store={store}>
                <TagList activeTags={tags} expanded={false} toggleTagActive={toggleTagActive} />
            </Provider>
        );

        const list = scryRenderedDOMComponentsWithClass(component, 'filters');
        expect(list.length).to.equal(1);
        const tagsInList = scryRenderedDOMComponentsWithClass(component, 'name');
        expect(tagsInList.length).to.equal(2);
    });

    it('renders correct class when expanded is true', () => {
        const store = configureStore({});
        const tags = List(['tag1', 'tag2']);
        const toggleTagActive = () => {};
        const component = renderIntoDocument(
            <Provider store={store}>
                <TagList activeTags={tags} expanded={true} toggleTagActive={toggleTagActive} />
            </Provider>
        );
        const list = scryRenderedDOMComponentsWithClass(component, 'filters expanded');
        expect(list.length).to.equal(1);
    });
});
