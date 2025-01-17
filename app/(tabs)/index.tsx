import AddExpense from '@/components/AddExpense';
import { ExpenseItemArray } from '@/components/AddExpense/types';
import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Card } from 'react-native-paper';

export default function Index() {
  const [expenseArray, setExpenseArray] = useState<ExpenseItemArray>([]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* AddExpense Component */}
        <View style={styles.addExpenseContainer}>
          <AddExpense expenseArray={expenseArray} setExpenseArray={setExpenseArray} />
        </View>
        <View style={styles.sexpenseListContainer}>
          <ScrollView scrollEnabled={true}>
            {/* Expense List */}
            {expenseArray.map((item, index) => (
              <View>
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
    flex: 0.7, // Takes up remaining space for scrolling
    padding: 10,
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
