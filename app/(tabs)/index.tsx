import AddExpense from '@/components/AddExpense';
import { ExpenseItemArray } from '@/components/AddExpense/types';
import { getItemFromStorage, setItemToStorage } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function Index() {
  const [expenseArray, setExpenseArray] = useState<ExpenseItemArray>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItemFromStorage('expenseArray');
      if (data !== null) {
        console.log(data);

        setExpenseArray(JSON.parse(data!));
      } else {
        await setItemToStorage('expenseArray', JSON.stringify([]));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const setStorage = async () => {
      await setItemToStorage('expenseArray', JSON.stringify(expenseArray));
    };
    setStorage();
  }, [expenseArray]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* AddExpense Component */}
        <View style={styles.addExpenseContainer}>
          <AddExpense expenseArray={expenseArray} setExpenseArray={setExpenseArray} />
        </View>
        <View style={styles.expenseListContainer}>
          <ScrollView
            onScroll={(e) => console.log(e)}
            scrollEnabled={true}
            style={{ borderWidth: 1, borderColor: 'blue' }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Expense List */}
            {expenseArray.map((item, index) => (
              <View key={index} style={{ borderWidth: 1, borderColor: 'red' }}>
                <Card style={styles.card} key={index}>
                  <Card.Title title={`₹${item.amount}`} subtitle={item.category} />
                  <Card.Content>
                    <Text>{item.description}</Text>
                    <Text>{`Date: ${item.day}/${item.month}`}</Text>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addExpenseContainer: {
    flex: 2,
    padding: 10,
    backgroundColor: '#fff',
  },
  expenseListContainer: {
    flex: 1, // Takes up remaining space for scrolling
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: '#f9f9f9',
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#e6f7ff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
  },
});
