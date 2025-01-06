import React, { useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Card, Chip, Divider, Menu, TextInput } from 'react-native-paper';
import { ExpenseItemArray } from './types';

const AddExpense = () => {
  const [mostAddedItems, setMostAddedItems] = useState<{ description: string; count: number }[]>(
    []
  );
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [expenseArray, setExpenseArray] = useState<ExpenseItemArray>([]);
  const [error, setError] = useState<{
    amount: boolean;
    description: boolean;
  }>({
    amount: false,
    description: false,
  });
  const [menuVisible, setMenuVisible] = useState(false);

  const descriptionRef = useRef<any>(null);
  const amountRef = useRef<any>(null);

  const addCategory = () => {
    if (category)
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories];
        const categoryIndex = updatedCategories.findIndex((c) => c.name === category);
        if (categoryIndex !== -1) {
          updatedCategories[categoryIndex].count += 1;
        } else {
          updatedCategories.push({ name: category, count: 1 });
        }
        return updatedCategories.sort((a, b) => b.count - a.count).slice(0, 5);
      });
  };

  const addExpenseHandler = () => {
    if (amount && description) {
      const date = new Date();

      setExpenseArray((prev) => [
        {
          amount: Number(amount),
          description,
          category,
          day: String(date.getDate()),
          month: String(date.getMonth() + 1),
          createdAt: date,
        },
        ...prev,
      ]);

      const existingItem = mostAddedItems.find((item) => item.description === description);
      if (existingItem) {
        existingItem.count += 1;
        setMostAddedItems([...mostAddedItems]);
      } else {
        setMostAddedItems((prev) => [...prev, { description, count: 1 }]);
      }

      setDescription('');
      setAmount('');
      setCategory('');
      setError({ amount: false, description: false });

      addCategory();
    } else {
      setError({
        amount: !amount,
        description: !description,
      });
    }
  };

  const handleItemClick = (item: { description: string }) => {
    const expense = expenseArray.find((exp) => exp.description === item.description);
    if (expense) {
      console.log(expense);

      setAmount(expense.amount.toString());
      setDescription(expense.description);
      setCategory(String(expense?.category ?? ''));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={amountRef}
            style={styles.input}
            mode="outlined"
            keyboardType="number-pad"
            label="Add Amount ₹"
            value={amount}
            onChangeText={(num) => {
              if (/^\d*\.?\d*$/.test(num)) {
                setAmount(num);
                setError((prev) => ({ ...prev, amount: false }));
              }
            }}
            theme={{
              colors: {
                primary: error.amount ? 'red' : 'blue',
              },
            }}
          />
          <TextInput
            ref={descriptionRef}
            style={styles.input}
            mode="outlined"
            label="Description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              setError((prev) => ({ ...prev, description: false }));
            }}
            theme={{
              colors: {
                primary: error.description ? 'red' : 'blue',
              },
            }}
          />
          <View style={styles.dropdownContainer}>
            <TextInput
              style={styles.dropdownInput}
              mode="outlined"
              label="Category"
              value={category}
              onChangeText={(text) => {
                setCategory(text);
              }}
              onFocus={() => setMenuVisible(true)}
            />
            {menuVisible && (
              <View style={styles.menu}>
                {categories.map((item) => (
                  <Menu.Item
                    key={item.name}
                    onPress={() => {
                      setCategory(item.name);
                      setMenuVisible(false);
                    }}
                    title={`${item.name} (${item.count})`}
                  />
                ))}
                <Divider />
                <Menu.Item onPress={() => setMenuVisible(false)} title="Close" />
              </View>
            )}
          </View>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mostAddedBar}>
            {mostAddedItems.slice(0, 5).map((item, index) => (
              <Chip key={index} style={styles.chip} onPress={() => handleItemClick(item)}>
                {item.description} ({item.count})
              </Chip>
            ))}
          </ScrollView>
        </View>
        <Button style={styles.button} mode="contained" onPress={addExpenseHandler}>
          Add Expense
        </Button>
        <FlatList
          data={expenseArray.filter(
            (item) =>
              Number(item.day) === new Date().getDate() &&
              Number(item.month) === new Date().getMonth() + 1
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={`₹${item.amount}`} subtitle={item.category} />
              <Card.Content>
                <Text>{item.description}</Text>
                <Text>{`Date: ${item.day}/${item.month}`}</Text>
              </Card.Content>
            </Card>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No expenses for today.</Text>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownInput: {
    fontSize: 18,
    backgroundColor: '#fff',
  },
  menu: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1000,
  },
  button: {
    height: 60,
    justifyContent: 'center',
    marginVertical: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#e6f7ff',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  mostAddedBar: {
    marginBottom: 10,
  },
  chip: {
    marginHorizontal: 5,
    backgroundColor: '#e0f7fa',
  },
});
