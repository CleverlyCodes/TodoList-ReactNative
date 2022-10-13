import React from "react";
import renderer from "react-test-renderer";
import App from "../App.jsx"

describe("<App />", () => {
    it('Renders the root of the application', () => {
      const tree = renderer.create(<App />).toJSON();

      expect(tree).toMatchSnapshot();
    });
});