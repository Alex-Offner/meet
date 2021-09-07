import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />);
    });

    test("check for event title", () => {
        expect(EventWrapper.find(".event-title")).toHaveLength(1);
    });

    test("check for location shown", () => {
        expect(EventWrapper.find(".event-location")).toHaveLength(1);
    });

    test("check for date and time", () => {
        expect(EventWrapper.find(".event-date")).toHaveLength(1);
    });

    test("check for show-details button", () => {
        expect(EventWrapper.find(".show-details-button")).toHaveLength(1);
    });

    test("normally hide details", () => {
        EventWrapper.setState({
            show: false,
        });
        expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });

    test("change show-state on click", () => {
        EventWrapper.setState({
            show: false,
        });
        EventWrapper.find(".show-details-button").simulate("click");
        expect(EventWrapper.state("show")).toBe(true);
    });

    test("show details on click", () => {
        EventWrapper.setState({
            show: false,
        });
        EventWrapper.find(".show-details-button").simulate("click");
        expect(EventWrapper.find(".event-details")).toHaveLength(1);
    });

    test("hide details on click", () => {
        EventWrapper.setState({
            show: true,
        });
        EventWrapper.find(".hide-details-button").simulate("click");
        expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });



});