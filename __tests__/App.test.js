import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App.jsx';

describe('<App />', () => {
  it('Renders the root of the application', () => {
    const tree = render(<App />);

    expect(tree).toMatchSnapshot();
  });
});
