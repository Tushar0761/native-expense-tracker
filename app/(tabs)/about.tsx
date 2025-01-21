import { ExpenseItemArray } from '@/components/AddExpense/types';
import { getItemFromStorage } from '@/utils/utils';
import DateTimePicker from '@react-native-community/datetimepicker'; // Install this package
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

export default function App() {
  const [expenseArray, setExpenseArray] = useState<ExpenseItemArray>([]);

  const [showExpense, setShowExpense] = useState<ExpenseItemArray>([]);

  const [totalSum, setTotalSum] = useState<number>(0);
  const [filterType, setFilterType] = useState<'date' | 'month' | 'week' | ''>('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sortOption, setSortOption] = useState<'date' | 'price'>('date');

  useEffect(() => {
    // Fetch expenses and initialize
    (async () => {
      const data = await getItemFromStorage('expenseArray');
      if (data !== null) {
        const expenses = (JSON.parse(data!) as ExpenseItemArray).map(
          ({ expenseDate, createdAt, ...rest }) => ({
            ...rest,
            expenseDate: new Date(expenseDate),
            createdAt: new Date(createdAt),
          })
        );
        setExpenseArray(expenses);
        setShowExpense(expenses);
      }
    })();
  }, []);

  useEffect(() => {
    // Create a shallow copy of the array to avoid mutating the original state
    const sortedExpenses = [...showExpense];

    if (sortOption === 'date') {
      // Sort by date (newest first)
      sortedExpenses.sort(
        (a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
      );
    } else {
      // Sort by amount (ascending)
      sortedExpenses.sort((a, b) => a.amount - b.amount);
    }

    console.log(sortedExpenses);

    // Update the state with the sorted array
    setShowExpense(sortedExpenses);
  }, [sortOption, showExpense]);
  useEffect(() => {
    // Create a shallow copy of the array to avoid mutating the original state

    if (sortOption === 'date') {
      // Sort by date (newest first)
      sortedExpenses.sort(
        (a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime()
      );
    } else {
      // Sort by amount (ascending)
      sortedExpenses.sort((a, b) => a.amount - b.amount);
    }

    console.log(sortedExpenses);

    // Update the state with the sorted array
    setShowExpense(sortedExpenses);
  }, [sortOption, showExpense]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [categoryFilter]);

  const applyFiltersAndSorting = () => {
    let expenses = showExpense;
    // Filter by category
    if (categoryFilter) {
      expenses = expenses.filter(
        (item) =>
          item.category?.match(new RegExp(categoryFilter, 'i')) ||
          item.description?.match(new RegExp(categoryFilter, 'i'))
      );
    } else {
      expenses = expenseArray;
    }

    setShowExpense(expenses);

    // Calculate total sum
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    setTotalSum(total);
  };

  const isSameDate = (date1: Date, date2: Date) => date1.toDateString() === date2.toDateString();

  const isSameWeek = (date1: Date, date2: Date) => {
    const startOfWeek = new Date(date2);
    startOfWeek.setDate(date2.getDate() - date2.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date1 >= startOfWeek && date1 <= endOfWeek;
  };

  return (
    <View style={styles.container}>
      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total: ₹{totalSum}</Text>
      </View>

      {/* Filter and Sorting Controls */}
      <View style={styles.controlsContainer}>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={(event, date) => setSelectedDate(date || selectedDate)}
        />
        <TextInput
          mode="outlined"
          placeholder="Search"
          value={categoryFilter}
          onChangeText={setCategoryFilter}
          style={styles.input}
        />
        <View style={styles.sortButtons}>
          <Button onPress={() => setSortOption('date')}>Sort by Date</Button>
          <Button onPress={() => setSortOption('price')}>Sort by Price</Button>
        </View>
      </View>

      {/* Expense List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {showExpense.map((item, index: number) => (
          <Card style={styles.card} key={index}>
            <View style={styles.cardContent}>
              <View style={styles.leftSection}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.amount}>{`₹${item.amount}`}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.date}>{`Date: ${format(item.expenseDate, 'dd MMM yyyy')}`}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  summaryContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlsContainer: {
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 4,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
});
