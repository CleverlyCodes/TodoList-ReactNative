import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "../screens/AuthScreen.jsx"

jest.useFakeTimers();

describe("<AuthScreen />", () => {
  it('Renders action buttons to add list', async () => {
    const tree = renderer.create(<AuthScreen />).toJSON();

    await expect(tree).toMatchSnapshot();
  });
});