import AddExpense from '@/components/AddExpense';
import NavigationBar from '@/components/NavigationBar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
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
