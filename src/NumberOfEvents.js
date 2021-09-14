import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 5,
    };

    handleInputChanged = (e) => {
        const value = e.target.value;

        this.setState({
            numberOfEvents: value,
        });
    };

    render() {
        const numberOfEvents = this.state.numberOfEvents;
        return (
            <div className="numberOfEvents">
                <label className="number-label">Choose a number of events:</label>
                <br />
                <input
                    type='number'
                    className='number-events'
                    value={numberOfEvents}
                    onChange={(e) => this.handleInputChanged(e)}
                    placeholder="Number of Events"
                />
            </div >
        );
    }
}

export default NumberOfEvents;