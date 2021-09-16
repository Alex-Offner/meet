import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import Event from '../Event';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    let EventWrapper;

    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the main page is loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('a user looks at a single event', () => {
            expect(AppWrapper.find('.EventList')).toHaveLength(1);
        });

        then('the details of the event are hidden by default with an option to show more details', () => {
            expect(AppWrapper.find('.event-details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the page and the list of events is shwoing', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        when('a user clicks on the details button', () => {
            EventWrapper = shallow(<Event event={mockData[1]} />);
            EventWrapper.find('.show-details-button').simulate('click');
        });

        then('the user will be able to see an element showing him the details of that specific event', () => {
            expect(EventWrapper.find('.event-details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('a user clicked on an event and its details are shown', () => {
            expect(EventWrapper.find('.event-details')).toHaveLength(1);
        });

        when('a user clicks on the hide button', () => {
            EventWrapper.find('.hide-details-button').simulate('click');
        });

        then('the details will collapse and be hidden from view', () => {
            expect(EventWrapper.find('.event-details')).toHaveLength(0);
        });
    });

});


