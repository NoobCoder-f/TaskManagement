import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './components/CustomButton';
import CustomDropdown from './components/CustomDropdown';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      setFilteredTasks(parsedTasks);
    } else {
      setTasks([]);
      setFilteredTasks([]);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    filterTasks(text, filterStatus);
  };

  const filterTasks = (searchTerm, status) => {
    let updatedTasks = tasks;

    if (searchTerm.trim()) {
      updatedTasks = updatedTasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (status) {
      updatedTasks = updatedTasks.filter(task => task.status === status);
    }

    setFilteredTasks(updatedTasks);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    filterTasks(searchTerm, status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return '#4CAF50';
      case 'postponed':
        return '#FFC107';
      case 'under progress':
        return '#2196F3';
      default:
        return '#000';
    }
  };

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'To Do', value: 'todo' },
    { label: 'Done', value: 'done' },
    { label: 'Postponed', value: 'postponed' },
    { label: 'Under Progress', value: 'under progress' },
  ];

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Search by title..."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <CustomDropdown
        selectedValue={filterStatus}
        onValueChange={handleFilterChange}
        options={statusOptions}
        placeholder="Filter by status"
        placeholderTextColor="#888"
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskCard} onPress={() => navigation.navigate('TaskDetails', { task: item })}>
            <Text style={[styles.taskTitle, { color: getStatusColor(item.status) }]}>{item.title}</Text>
            <Text style={styles.taskStatus}>{item.status}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.taskList}
      />
      <CustomButton title="Create Task" onPress={() => navigation.navigate('CreateTask')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('4%'),
    backgroundColor: '#f8f8f8'
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: wp('4%'),
    marginVertical: hp('1%'),
    width: wp('90%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold'
  },
  taskStatus: {
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
    color: '#000'
  },
  searchBar: {
    fontSize: wp('4%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: wp('90%'),
    padding: wp('2%'),
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    color: '#000'
  },
  taskList: {
    alignItems: 'center',
  }
});

export default TaskListScreen;
