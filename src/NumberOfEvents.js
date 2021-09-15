import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    };

    handleInputChanged = (e) => {
        const value = e.target.value;

        this.setState({
            numberOfEvents: value,
        });
        this.props.updateNumberOfEvents(value);
    };

    render() {
        const numberOfEvents = this.state.numberOfEvents;
        return (
            <div className="NumberOfEvents">
                <label className="number-label">Choose a number of events:</label>
                <br />
                <input
                    type='number'
                    className='number-events'
                    id="number-of-events"
                    value={numberOfEvents}
                    onChange={(e) => this.handleInputChanged(e)}
                    placeholder="1"
                />
            </div >
        );
    }
}

export default NumberOfEvents;