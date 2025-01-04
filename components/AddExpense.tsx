import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const AddExpense = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} keyboardType="decimal-pad" />
      <Text>Help</Text>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 },
});
