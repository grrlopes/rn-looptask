import { LogIn } from '@/api/label';
import { decodeToken } from '@/helper/token';
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

export const getUserToken = async (): Promise<LogIn | null> => {
  try {
    const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
    if (token) {
      const decoded = decodeToken(token)
      const currentDate = new Date();
      const expirationDate = new Date(decoded !== null ? decoded?.exp * 1000 : 0);
      if (currentDate < expirationDate) {
        if (decoded) {
          const Auth: LogIn = {
            error: null,
            message: {
              name: decoded.name,
              token: token,
              created_at: decoded.created_at,
              email: decoded.email,
              id: decoded.id,
              surname: decoded.surname,
              updated_at: decoded.updated_at
            },
            success: true
          }
          return Auth;
        }
      } else {
        await removeUserToken();
        return null;
      }
    }
    return null;
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
