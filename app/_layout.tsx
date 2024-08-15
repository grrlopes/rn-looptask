import FontAwesome from '@expo/vector-icons/FontAwesome';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Login from './auth/login';
import { LogIn } from '@/api/label';
import { getUserToken } from '@/store/persistor';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)', // Ensure reloading on `/modal` keeps a back button present.
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontsError) {
      console.error('Error loading fonts', fontsError);
    }
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null or a splash screen while fonts are loading
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const [auth, setAuth] = useState<LogIn | null>(null)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2
      }
    }
  })

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getUserToken();
      if (token) {
        setAuth(token)
      } else {
        setAuth({
          success: false,
        })
      }
    };
    checkLoginStatus();
  }, []);

  const doAuth = (log: LogIn): void => {
    setAuth(log)
  }

  if (auth == undefined) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!auth?.success) {
    return (
      <QueryClientProvider client={queryClient}>
        <Login logIn={doAuth} />
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modals/stacktray" options={{
          title: "",
          presentation: 'modal',
          headerStyle: { backgroundColor: "#757575" },
        }}
        />
        <Stack.Screen name="modals/labeled" options={{
          title: "",
          presentation: 'modal',
          headerShown: false,
        }}
        />
        <Stack.Screen name="modals/barcode" options={{
          title: "",
          presentation: 'modal',
          headerStyle: { backgroundColor: "#757575" },
        }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center',
  }
})
