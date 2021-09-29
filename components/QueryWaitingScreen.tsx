import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../style/styles';

export const QueryWaitingScreen = () => {
  return (
    <TouchableOpacity style={styles.centeredScreen}>
      <Text style={styles.screenText}>
        Loading... Hope everything is fine :)
      </Text>
    </TouchableOpacity>
  );
};
