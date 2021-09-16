import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    let NumberOfEventsWrapper;

    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the list of events was loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('a user did not select a number of shown events', () => {
            NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
        });

        then(/^the default number will have been set to (\d+) events$/, (arg0) => {
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
        });
    });

    test('A user can change the number of events they want to see', ({ given, when, then }) => {
        given('the list of events was loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('the user puts a number in a field next to the search field', () => {
            const eventObject = { target: { value: 2 } };
            AppWrapper.find('.number-events').simulate('change', eventObject);
        });

        then('the list of events will update and the amount will be set to that specific number', () => {
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(2);
        });
    });

});