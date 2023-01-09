import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    numQuery: 7,
  };

  noeInput = (e) => {
    const inputValue = e.target.value;
    this.props.updateEvents(null, inputValue);
    this.setState({ numQuery: inputValue });
  };

  // componentDidMount() {
  //   this.setState({ numQuery: this.props.numQuery || 5 });
  // }

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
            this.noeInput(event);
          }}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
