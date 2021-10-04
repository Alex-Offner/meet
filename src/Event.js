import React, { Component } from "react";

class Event extends Component {

    state = {
        show: false
    };

    handleButton = () => {
        this.setState((prevState) => ({ show: !prevState.show }));
    }

    render() {

        const { event } = this.props;

        return (
            <div className="event">
                <h2 className="event-title">{event.summary}</h2>
                <p className="event-date"></p>
                <p className="event-location">{event.location}</p>
                {this.state.show === true && (
                    <p className="event-details">{event.description}</p>
                )}
                {this.state.show === false && (
                    <button className="show-details-button" onClick={() => this.handleButton()}>Show Details</button>
                )}
                {this.state.show === true && (
                    <button className="hide-details-button" onClick={() => this.handleButton()}>
                        Hide Details
                    </button>
                )}

            </div>
        );
    }
}
export default Event;