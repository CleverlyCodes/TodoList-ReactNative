import React from 'react';
import { Alert } from 'react-native';

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom'
import renderer from "react-test-renderer";
import TaskScreen from "../screens/TaskScreen.jsx"

jest.useFakeTimers();

describe("<TaskScreen />", () => {

  let taskNameInput,
      submitTaskButton,
      findByText,
      findById;

  beforeEach(async () => {
    const { getByTestId, getByText } = render(
      <TaskScreen />
    );

    taskNameInput = getByTestId('taskNameInput');
    submitTaskButton = getByTestId('submitTaskButton');

    await fireEvent(taskNameInput, 'onChangeText', 'test 1');
    await fireEvent.press(submitTaskButton);

    findByText = getByText;
    findById = getByTestId;
  });

  it('Renders Task Screen', () => {
    const tree = renderer.create(<TaskScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Adds a new task', async () => {
    fireEvent(taskNameInput, 'onChangeText', 'test 4');
    fireEvent.press(submitTaskButton);

    await waitFor(() => {
      expect(findByText('test 4'));
    });
  });

  it('Deletes an existing task', async () => {
    const firstElement = findByText('test 1');

    expect(firstElement);

    await fireEvent.press(findById('deleteButton-0'));
    expect(firstElement).toBeNull;
  });

  it('Shows empty text if list is empty', async () => {
    const firstElement = findByText('test 1');

    expect(firstElement);

    await fireEvent.press(findById('deleteButton-0'));

    expect(findByText('There is currently no task (add some below)'));
  });
});