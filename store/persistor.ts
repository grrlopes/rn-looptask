import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants for keys
const USER_TOKEN_KEY = 'userToken';

export const storeUserToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to save the user token to storage', e);
  }
};

export const getUserToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_TOKEN_KEY);
  } catch (e) {
    console.error('Failed to fetch the user token from storage', e);
    return null;
  }
};

export const removeUserToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove the user token from storage', e);
  }
};
