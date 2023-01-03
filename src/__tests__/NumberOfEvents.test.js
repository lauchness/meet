import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<Event /> component", () => {
  let NumberWrapper, noeInput, numQuery;

  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents />);
    noeInput = NumberWrapper.find(".noe-Input input");
  });

  test("renders NumberOfEvents and noe-Input", () => {
    expect(NumberWrapper).toBeDefined();
    expect(noeInput).toBeDefined();
  });

  test("renders a list of events", () => {
    expect(NumberWrapper.find("numOfEvents div")).toHaveLength[1];
  });

  test("noe-input is 5 (number type) by default", () => {
    expect(NumberWrapper.find("input.noe-Input").prop("type")).toBe("number");
    expect(NumberWrapper.state("numQuery")).toBe(5);
  });

  test("number of displayed events is changed and shows correctly", () => {
    expect(NumberWrapper.state("numQuery")).toBe(5);
    NumberWrapper.find("input.noe-Input").simulate("change", {
      target: { value: 12 },
    });
    expect(NumberWrapper.state("numQuery")).toBe(12);
  });
});
