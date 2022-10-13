import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import TaskScreen from '../screens/TaskScreen';

jest.useFakeTimers();

describe('<TaskScreen />', () => {
  let taskNameInput;
  let submitTaskButton;
  let findByText;
  let findById;

  beforeEach(async () => {
    const { getByTestId, getByText } = render(<TaskScreen />);

    taskNameInput = await getByTestId('taskNameInput');
    submitTaskButton = getByTestId('submitTaskButton');

    await fireEvent(taskNameInput, 'onChangeText', 'test 1');
    await fireEvent.press(submitTaskButton);

    findByText = getByText;
    findById = getByTestId;
  });

  it('Renders Task Screen', () => {
    const tree = render(<TaskScreen />).toJSON();

    return expect(tree).toMatchSnapshot();
  });

  it('Adds a new task', async () => {
    fireEvent(taskNameInput, 'onChangeText', 'test 4');
    fireEvent.press(submitTaskButton);

    return expect(findByText('test 4'));
  });

  it('Deletes an existing task', async () => {
    const firstElement = findByText('test 1');

    expect(firstElement);

    await fireEvent.press(findById('deleteButton-0'));
    return expect(firstElement).toBeNull;
  });

  it('Shows empty text if list is empty', async () => {
    const firstElement = findByText('test 1');

    expect(firstElement);

    await fireEvent.press(findById('deleteButton-0'));

    return expect(findByText('There is currently no task (add some below)'));
  });
});
