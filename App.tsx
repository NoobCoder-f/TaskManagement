/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskListScreen from './src/TaskListScreen';
import TaskDetailsScreen from './src/TaskDetailsScreen';
import TaskCreationScreen from './src/TaskCreationScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{title: 'Tasks'}}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={{title: 'Task Details'}}
        />
        <Stack.Screen
          name="CreateTask"
          component={TaskCreationScreen}
          options={{title: 'Create Task'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
