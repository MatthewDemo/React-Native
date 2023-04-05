import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const HeartIcon = ({ color = 'gray' }) => {
  return (
    <View style={styles.container}>
      <Feather name="heart" size={24} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeartIcon;
