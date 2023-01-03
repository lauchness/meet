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
        <button className="detailsButton" onClick={this.toggleDetails}>
          {collapsed ? "show" : "hide"}
          Details
        </button>
        {!collapsed && (
          <div clasName="details">
            <h1 className="summary">{event.summary}</h1>
            <p className="start">{event.start.dateTime}</p>
          </div>
        )}
      </div>
    );
  }
}
export default Event;
