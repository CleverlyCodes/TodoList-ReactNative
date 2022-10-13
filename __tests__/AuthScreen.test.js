import React from 'react';
import { render } from '@testing-library/react-native';
import AuthScreen from '../screens/AuthScreen';

jest.useFakeTimers();

describe('<AuthScreen />', () => {
  it('Renders authentication screen', () => {
    const tree = render(<AuthScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
