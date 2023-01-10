import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import Event from "../Event";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";
describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  test("App passes 'events' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test("App passes 'locations' state as a prop to CitySearch", () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });
  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(
      allEvents.slice(0, AppWrapper.state("numberOfEvents"))
    );
    AppWrapper.unmount();
  });
  test("check if number of events is properly passed on as a prop to NumberOfEvents", () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ numberOfEvents: 5 });
    expect(AppWrapper.find(NumberOfEvents).props().numQuery).toBe(5);
    AppWrapper.unmount();
  });
  test("check to see if state changes when number of events is changed", () => {
    const AppWrapper = mount(<App />);
    const NumberWrapper = AppWrapper.find(NumberOfEvents);
    NumberWrapper.find(".noe-Input").simulate("change", {
      target: { value: 9 },
    });
    expect(NumberWrapper.state("numQuery")).toBe(9);
    expect(AppWrapper.state("numberOfEvents")).toBe(9);
    AppWrapper.unmount();
  });
});

// so when i change the number of events to be displayed, it doesnt actually change. double check code with submitted ones again. something is wrong.
