import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.fontSize = '16px';
        // this.backgroundColor = null;
        // this.padding = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            fontSize: this.fontSize,
            // backgroundColor: this.backgroundColor,
            // padding: this.padding,
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue';
        this.fontSize = '20px';
        // this.backgroundColor = '#eee';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
    }
}


export { InfoAlert, ErrorAlert };