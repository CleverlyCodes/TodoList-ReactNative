import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "../screens/AuthScreen.jsx"

jest.useFakeTimers();

describe("<AuthScreen />", () => {
  it('Renders authentication screen', async () => {
    const tree = renderer.create(<AuthScreen />).toJSON();

    await expect(tree).toMatchSnapshot();
  });
});