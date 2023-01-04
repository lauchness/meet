import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="Event">
        <h1 className="summary">{event.summary}</h1>
        <p className="start">{event.start.dateTime}</p>
        {!collapsed && (
          <div className="details">
            <p className="description">{event.description}</p>
          </div>
        )}
        <button className="details-btn" onClick={this.toggleDetails}>
          {collapsed ? "show" : "hide"} Details
        </button>
      </div>
    );
  }
}
export default Event;

// for whatever reason, i cant display "summary" unless it is INSIDE the fucking collapse.
// CSS file provided is all fucked up.
// "detailsButton" is there but doesnt do anything good.
