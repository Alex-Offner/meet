import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {

    test('When a user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('user hasn’t searched for a city', () => {

        });

        let AppWrapper;
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        then('the user should see a list of all upcoming events', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

    });

    test('The user should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        let CitySearchWrapper;
        let locations = extractLocations(mockData);
        given('the main page is open', () => {
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => { }} locations={locations} />);
        });

        when('user starts typing in the city searchfield', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        then('the user should see a list of cities that match the letters they will type.', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        let AppWrapper;
        given('user was typing “Berlin” in the city textbox', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        and('the list of suggested cities is showing', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when('the user clicks on one of the cities (e.g., Berlin) that are suggested', () => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('the city will be changed to the selected city', () => {
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        and('list upcoming events from there.', () => {
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });



});


