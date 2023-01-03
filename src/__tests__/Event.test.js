import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test("renders summary correcly", () => {
    expect(EventWrapper.find(".summary h1")).toHaveLength[1];
  });
  test("renders start time correctly", () => {
    const start = EventWrapper.find("start");
    expect(EventWrapper.find(".start p")).toHaveLength[1];
  });
  test("details are hidden before details button is pushed", () => {
    const detailsButton = EventWrapper.find("detailsButton");
    expect(EventWrapper.state("collapsed")).toBe(true);
    expect(detailsButton).toBeDefined();
    expect(EventWrapper.find(".summary h1")).toHaveLength[0];
    expect(EventWrapper.find(".start p")).toHaveLength[0];
  });
  test("details are expanded when button is pushed", () => {
    EventWrapper.find(".detailsButton").simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
    expect(EventWrapper.find(".summary h1")).toHaveLength[1];
    expect(EventWrapper.find(".start p")).toHaveLength[1];
  });
});
