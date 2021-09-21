import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        errorText: null,
    };

    handleInputChanged = (e) => {
        const value = e.target.value;

        if (value < 1 || value > 99) {
            this.setState({
                numberOfEvents: '',
                errorText: 'You can only enter a number between 1 and 99.',
            });
        } else {
            this.setState({
                numberOfEvents: value,
                errorText: null,
            });
            this.props.updateNumberOfEvents(value);
        }
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
                {this.state.errorText
                    ? <ErrorAlert text={this.state.errorText} />
                    : <div></div>}
            </div>
        );
    }
}

export default NumberOfEvents;