import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function TaskList({data, handlerDelete}) {
  return (
    <Animatable.View
      style={styles.container}
      animation="bounceIn"
      useNativeDriver>
      <TouchableOpacity onPress={() => handlerDelete(data)}>
        <Icon name="checkcircle" size={25} color="#323232" />
      </TouchableOpacity>
      <View>
        <Text style={styles.task}>{data.task}</Text>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  task: {
    color: '#323232',
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 20,
  },
});
