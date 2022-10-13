import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native-elements';
import { Surface } from 'react-native-paper';

const SPACING = 2;
const ITEM_SIZE = 75;
const TOTAL_ITEM_SIZE = ITEM_SIZE + (SPACING * 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    verticalPadding: SPACING,
    flexDirection: 'row',
    padding: SPACING,
  },
  teamCardContainerStyle: {
    borderRadius: 15,
    width: '95%',
    justifyContent: 'center',
  },
  taskTitle: {
    width: '80%',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
  deleteAction: {
    alignSelf: 'flex-end',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 50,
    margin: 15,
    backgroundColor: '#fff',
  }
});

const myTasks = [{
  name: "test1",
},
{
  name: "test2",
},
{
  name: "test3",
}];

export default function Task() {
    const [tasks, updateTasks] = useState(myTasks);
    const [text, updateText] = useState("");
    const [isTaskListEmpty, updateIsTaskListEmpty] = useState(true);

    const scrollY = useRef(new Animated.Value(0)).current;

    const addTaskItem = () => {
      updateTasks( oldTasks => [...oldTasks, {
        name: text,
      }]);

      updateText("");
    }

    const deleteTaskItem = (targetIndex) => {
      updateTasks(oldTasks => oldTasks.filter((item, index) => index !== targetIndex));
    }

    const renderTeamItem = ({ item, index }) => {
      const height = ITEM_SIZE;

    // Normal Animation
    const inputRange = [
      TOTAL_ITEM_SIZE * (index - 10),
      TOTAL_ITEM_SIZE * (index - 6),
      TOTAL_ITEM_SIZE * (index - 5),
      TOTAL_ITEM_SIZE * (index),
      TOTAL_ITEM_SIZE * (index + 3),
      TOTAL_ITEM_SIZE * (index + 7),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.75, 0.90, 1, 1, 0.5, 0.5],
    });

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
            <Card containerStyle={styles.teamCardContainerStyle}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style={styles.taskTitle} numberOfLines={1}>{item.name}</Text>

                <TouchableOpacity style={styles.deleteAction} onPress={() => deleteTaskItem(index)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Surface>
        </Animated.View>
      );
  }

  useEffect(() => {
    const isTaskListEmptied = tasks.length === 0 ? true : false;
    updateIsTaskListEmpty(isTaskListEmptied);
  }, [tasks]);

  return (
    <>
      <View style={{ backgroundColor: '#f2f2f2', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
        {
          isTaskListEmpty ? 

          <Text style={{ alignSelf: 'center', marginTop: 150 }}>There is currently no task (add some below)</Text>

          : 
          
          <Animated.FlatList
            contentContainerStyle={{ paddingTop: 0, paddingBottom: 100, paddingTop: 40 }}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
            data={tasks}
            keyExtractor={(item, index) => index}
            renderItem={renderTeamItem}
          />
        }

        <View style={styles.bottomContainer}>
          <TextInput
            value={text}
            style={{ flex: 1, borderColor: '#2e2e2e', backgroundColor: '#fff', paddingHorizontal: 15, fontSize: 18 }}
            placeholder="Enter New Task Here"
            onChangeText={(value) => updateText(value)}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={false}
            inputStyle={{
              borderRadius: 15,
              borderWidth: 2,
              paddingLeft: 10,
              color: "#2e2e2e",
              fontSize: 16,
            }}
          />

          <Button
            style={{ flex: 1, margin: 5 }}
            title="Add"
            onPress={addTaskItem}/>
        </View>
      </View>
    </>
  );
}
