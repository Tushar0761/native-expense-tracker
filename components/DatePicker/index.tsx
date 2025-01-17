import DateTimePicker from '@react-native-community/datetimepicker';
import { format, sub } from 'date-fns';
import React, { Dispatch, SetStateAction } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
const DatePickerComponent = ({
  date,
  setDate,
  show,
  setShow,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const currentDate = new Date();

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Keep picker open on iOS
    setDate(currentDate!);
  };

  const handleConfirm = () => {
    setShow(false);
  };

  const chipHandler = (subDays: number) => {
    setDate(sub(currentDate, { days: subDays }));
    setShow(false);
  };

  return (
    <View style={[{ height: 'auto' }, styles.row]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Text style={styles.dateText}>
          {' '}
          {format(date!, 'dd MMM yyyy')} ({format(date!, 'E')})
        </Text>
        <View style={{ flex: 1, height: 'auto', width: 'auto' }}>
          {!show ? (
            <Button style={styles.selectButton} mode="contained" onPress={() => setShow(true)}>
              Select Date
            </Button>
          ) : (
            <Button style={styles.selectButton} mode="contained" onPress={handleConfirm}>
              Confirm{' '}
            </Button>
          )}
        </View>
      </View>
      {show && (
        <View>
          <DateTimePicker
            textColor="black"
            style={styles.datePicker}
            value={date!}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
        </View>
      )}
      {show && (
        <ScrollView horizontal={true}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              margin: 10,
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => {
              return (
                <Chip onPress={() => chipHandler(i)}>
                  {format(sub(currentDate, { days: i }), 'dd MMM')} (
                  {format(sub(currentDate, { days: i }), 'E')})
                </Chip>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateText: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  selectButton: {
    display: 'flex',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    color: 'red',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default DatePickerComponent;
