import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container:{
    backgroundColor:'red',
    paddingLeft:10
    
  },
  textTitle:{
    fontSize:20
  },
  textDesc:{
    fontSize:15
  }
})
const ErrorBar= ({error}) =>(
  <View style={styles.container}>
    <Text style={styles.textTitle}>{error.title}</Text>
    <Text style={styles.text}>{error.desc}</Text>
  </View>
);

export default ErrorBar;