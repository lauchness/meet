import "./App.css";
import React, { Component } from "react";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import "./nprogress.css";
import { extractLocations, getEvents } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 5,
  };

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.numberOfEvents);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, inputNumber) => {
    const { numberOfEvents, selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const currentNum = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: currentNum,
          selectedLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          selectedLocation === "all"
            ? events
            : events.filter((event) => event.location === selectedLocation);
        const currentNum = locationEvents.slice(0, inputNumber);
        this.setState({
          events: currentNum,
          numberOfEvents: inputNumber,
        });
      });
    }
  };

  // updateNumQuery(number) {
  //   this.setState({ numQuery: number });
  // }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numQuery={this.state.numberOfEvents}
          // updateNumQuery={(numQuery) => this.updateNumQuery(numQuery)}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;

// i think part of step 1 is done from what i did in the exercise, but its hard to say. keep checking back from other
// submitted things to try and make sense of it all. maybe re-read what exactly you did with CitySearch in this exercise
// and how things were "passed".
