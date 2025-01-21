import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItemToStorage(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}
export async function getItemFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
  }
}
