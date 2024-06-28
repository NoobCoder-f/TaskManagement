import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({ title, onPress, color = '#6200EE' }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 25,
    marginVertical: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default CustomButton;
