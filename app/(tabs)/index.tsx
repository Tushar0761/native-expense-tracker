import AddExpense from '@/components/AddExpense';
import NavigationBar from '@/components/NavigationBar';
import React from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

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
        <View
          style={{
            flex: 0.2,
          }}
        >
          <Text
            style={{
              ...styles.header,
            }}
          >
            Hello
          </Text>
        </View>
        <AddExpense />
        <NavigationBar />
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
