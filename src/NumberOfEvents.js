import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numQuery: 6,
  };

  noeInput = (e) => {
    const value = e.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numQuery: value });
  };

  componentDidMount() {
    this.setState({ numQuery: this.props.numQuery || 6 });
  }

  render() {
    const { numQuery } = this.state;
    return (
      <div className="numOfEvents">
        <h2>Number Of Events</h2>
        <input
          type="number"
          className="noe-Input"
          value={numQuery}
          onChange={(event) => {
            this.noeInput(event.target.value);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
