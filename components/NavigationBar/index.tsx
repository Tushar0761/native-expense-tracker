import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const NavigationBar = () => {
  return (
    <View>
      <Text style={styles.button}>
        <Link href={'/about'}>home</Link>
      </Text>
      <Text style={styles.button}>
        <Link href={'/about'}>Second Screen</Link>
      </Text>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    alignContent: 'center',
    color: 'white',
    borderRadius: 20,
    width: 'auto',
    padding: 10,
    margin: 20,
  },
});
