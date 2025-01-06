import AddExpense from '@/components/AddExpense';
import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default function Index() {
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View
        style={{
          flex: 1,
          ...styles.container,
        }}
      >
        <AddExpense />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
  },
});
