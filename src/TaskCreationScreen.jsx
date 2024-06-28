import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './components/CustomButton';

const TaskCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSaveTask = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title cannot be empty.");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status: 'todo'
    };
    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(newTask);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    Alert.alert("Success", "Task added successfully.");
    navigation.navigate("TaskList");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#888"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#888"
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date"
        placeholderTextColor="#888"
        onChangeText={setDueDate}
        value={dueDate}
      />
      <CustomButton title="Save Task" onPress={handleSaveTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#f8f8f8'
  },
  input: {
    fontSize: wp('4%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: hp('2%'),
    padding: wp('2%'),
    backgroundColor: '#fff',
    color: '#000'
  }
});

export default TaskCreationScreen;
