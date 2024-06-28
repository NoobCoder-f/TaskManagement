import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './components/CustomButton';
import CustomDropdown from './components/CustomDropdown';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [status, setStatus] = useState(task.status);

  const updateTaskStatus = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index].status = status;
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      Alert.alert("Success", "Task status updated.");
      navigation.goBack();
    }
  };

  const deleteTask = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    let tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks = tasks.filter(t => t.id !== task.id);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    Alert.alert("Deleted", "Task has been deleted.");
    navigation.goBack();
  };

  const statusOptions = [
    { label: 'To Do', value: 'todo' },
    { label: 'Done', value: 'done' },
    { label: 'Postponed', value: 'postponed' },
    { label: 'Under Progress', value: 'under progress' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{task.description}</Text>
      <Text style={styles.label}>Due Date:</Text>
      <Text style={styles.value}>{task.dueDate}</Text>
      <Text style={styles.label}>Status:</Text>
      <CustomDropdown
        selectedValue={status}
        onValueChange={setStatus}
        options={statusOptions}
      />
      <CustomButton title="Update Status" onPress={updateTaskStatus} />
      <CustomButton title="Delete Task" onPress={deleteTask} color="#B00020" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#f8f8f8'
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#000'
  },
  label: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    color: '#000'
  },
  value: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: '#000'
  }
});

export default TaskDetailsScreen;
