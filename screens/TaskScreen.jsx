import React, { useEffect, useState } from 'react';
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  Button,
  Card,
  Icon,
} from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { theme } from '../constants/Theme';

const SPACING = 2;
const ITEM_SIZE = 75;
const TOTAL_ITEM_SIZE = ITEM_SIZE + (SPACING * 2);
const height = ITEM_SIZE;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.offWhite,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  emptyMessage: {
    alignSelf: 'center',
    marginTop: 150,
  },
  surface: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    verticalPadding: SPACING,
    flexDirection: 'row',
    padding: SPACING,
  },
  listContainerStyle: {
    paddingTop: 0,
    paddingBottom: 100,
    paddingTop: 40.
  },
  teamCardStyle: {
    borderRadius: 15,
    width: '95%',
    justifyContent: 'center',
  },
  teamCardContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  taskTitle: {
    width: '60%',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  taskAction: {
    alignSelf: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 50,
    margin: 15,
    backgroundColor: theme.white,
  },
  taskNameInput: {
    flex: 1,
    borderColor: theme.dark,
    backgroundColor: theme.white,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  inputTaskStyle: {
    borderRadius: 15,
    borderWidth: 2,
    paddingLeft: 10,
    color: theme.dark,
    fontSize: 16,
  },
  addTaskItemButton: {
    flex: 1,
    margin: 5,
  },
  successButtonStyle: {
    backgroundColor: theme.success,
  },
});

export default function Task() {
    const [tasks, updateTasks] = useState([]);
    const [text, updateText] = useState("");
    const [isTaskListEmpty, updateIsTaskListEmpty] = useState(true);
    const [isTaskNameEmpty, updateIsTaskNameEmpty] = useState(true);

    const scrollY = new Animated.Value(0);

    /**
    * Creates a new task item
    */
    const addTaskItem = () => {
      updateTasks( oldTasks => [{
        name: text,
        isChecked: false,
      },
      ...oldTasks]);

      updateIsTaskNameEmpty(true);
      updateText("");
    }

    /**
    * Deletes a specific task item based on index
    * Improve this later by using an actual unique identifier
    */
    const deleteTaskItem = (targetIndex) => {
      updateTasks(oldTasks => oldTasks.filter((item, index) => index !== targetIndex));
    }

    const updateTaskName = (textValue) => {
      updateText(textValue);

      const isTextValueEmpty = !textValue.trim() ? true : false;
      updateIsTaskNameEmpty(isTextValueEmpty);
    }

    /**
    * Updates items as done
    */
    const updateTaskAsDone = (targetIndex) => {
      const newTasks = [...tasks];
      const newTask = newTasks[targetIndex];

      // toggle done state for item
      newTask.isChecked = !newTask.isChecked;

      updateTasks(sortByDone(newTasks));
    }

    /**
    * Moves tasks to the bottom of the list as they are marked as done
    */
    const sortByDone = (currentTasks) => {
      currentTasks.sort((firstItem, secondItem) => {
        // If firstItem is done and second item is not done
        if (!firstItem.isChecked && secondItem.isChecked) return -1;
        // If secondUser balance greater than firstUser balance move up
        if (firstItem.isChecked && !secondItem.isChecked) return 1;
      })
      return currentTasks;
    }

    /**
    * Renders task item inside of the animated list view
    * Apply dynamic animation adjustments when scrolling
    */
    const renderTaskItem = ({ item, index }) => {
      // Applying some custom animations when scrolling 
      // relative to both scroll and item position
      const inputRange = [
        TOTAL_ITEM_SIZE * (index - 10),
        TOTAL_ITEM_SIZE * (index - 6),
        TOTAL_ITEM_SIZE * (index - 5),
        TOTAL_ITEM_SIZE * (index),
        TOTAL_ITEM_SIZE * (index + 3),
        TOTAL_ITEM_SIZE * (index + 7),
      ];

      // scale changes based on inputRange computation
      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.75, 0.90, 1, 1, 0.5, 0.5],
      });

      // opacity changes based on inputRnage computation
      const opacity = scrollY.interpolate({
        inputRange,
        outputRange: [0.25, 0.75, 1, 1, 0.5, 0.5],
      });

      return (
        <Animated.View
          style={{
            transform: [{ scale }],
            opacity,
          }}
        >
          <Surface key={index} style={[styles.surface, { height }]}>
            <Card containerStyle={styles.teamCardStyle}>
              <View style={styles.teamCardContainerStyle}>
                <TouchableOpacity
                  testID={`completeButton-${index}`}
                  style={styles.taskAction}
                  onPress={() => updateTaskAsDone(index)}
                >
                  <Icon
                    reverse
                    name='check'
                    type='font-awesome'
                    color={ item.isChecked ? theme.success : theme.confirm }
                    size='13'
                  />
                </TouchableOpacity>

                <Text
                  style={styles.taskTitle}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <TouchableOpacity
                  testID={`deleteButton-${index}`}
                  style={styles.deleteAction}
                  onPress={() => deleteTaskItem(index)}
                >
                  <Icon
                    reverse
                    name='trash'
                    type='font-awesome'
                    color={theme.error}
                    size='13'
                  />
                </TouchableOpacity>
              </View>
            </Card>
          </Surface>
        </Animated.View>
      );
  }

  useEffect(() => {
    // Rechecks state of task list if empty and updates state
    const isTaskListEmptied = tasks.length === 0 ? true : false;
    updateIsTaskListEmpty(isTaskListEmptied);
  }, [tasks]);

  return (
    <>
      <View style={styles.container}>
        {
          // Checks if task list is empty and shows corresponding UI elements
          isTaskListEmpty ? 

          <Text style={styles.emptyMessage}>
            There is currently no task (add some below)
          </Text>

          : 
          
          <Animated.FlatList
            contentContainerStyle={styles.listContainerStyle}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
            data={tasks}
            keyExtractor={(item, index) => index}
            renderItem={renderTaskItem}
          />
        }

        <View style={styles.bottomContainer}>
          <TextInput
            testID="taskNameInput"
            value={text}
            style={styles.taskNameInput}
            placeholder="Enter New Task Here"
            onChangeText={(value) => updateTaskName(value)}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={false}
            inputStyle={styles.inputTaskStyle}
          />

          <Button
            testID="submitTaskButton"
            style={styles.addTaskItemButton}
            buttonStyle={styles.successButtonStyle}
            disabled={isTaskNameEmpty}
            title="Add"
            onPress={addTaskItem}/>
        </View>
      </View>
    </>
  );
}
