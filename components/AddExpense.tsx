import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const AddExpense = () => {
  const [amount, setAmount] = useState<undefined | number>(100);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          keyboardType="number-pad"
          label="Add Amount ₹"
          value={amount ? String(amount) : undefined}
          onChangeText={(num) => setAmount(num ? Number(num) : undefined)}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => console.log('Pressed')}
          contentStyle={styles.buttonContent}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  inputContainer: {
    display: 'flex',
    // flexDirection: 'row',
    flex: 1,
    gap: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  amountDisplay: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    padding: 10,
  },
  button: {
    flex: 0.3,
  },
  buttonContent: {
    justifyContent: 'center', // Ensures text is vertically centered
    alignItems: 'center', // Ensures text is horizontally centered
  },
});
