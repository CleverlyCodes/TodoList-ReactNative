import React from "react";
import renderer from "react-test-renderer";
import TaskScreen from "../screens/TaskScreen.jsx"

jest.useFakeTimers();

describe("<TaskScreen />", () => {
  it('Renders action buttons to add list', async () => {
    renderer.create(<TaskScreen />).toJSON();
  });
});