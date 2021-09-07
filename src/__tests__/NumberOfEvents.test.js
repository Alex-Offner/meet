import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test("check for number-events", () => {
        expect(NumberOfEventsWrapper.find(".number-events")).toHaveLength(1);
    });

    test("check for label", () => {
        expect(NumberOfEventsWrapper.find(".number-label")).toHaveLength(1);
    });

    test("check if 5 events are shown", () => {
        expect(NumberOfEventsWrapper.find(".number-events").prop("value")).toEqual(5);
    });

    test('change state when text input changes', () => {
        NumberOfEventsWrapper.setState({
            numberOfEvents: '5'
        });
        const eventObject = { target: { value: '2' } };
        NumberOfEventsWrapper.find('.number-events').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe('2');
    });
});