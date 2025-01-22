import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        setIsAuthenticated(!!token); // Set true if token exists
        setUserRole(role || ''); // Use empty string if role is null
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync(); // Hide splash screen after loading
      }
    };

    if (loaded) {
      checkAuth();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (userRole === 'student') {
          router.replace('/murid/MuridScreen');
        } else if (userRole === 'teacher') {
          router.replace('/guru/GuruNavigator');
        }
      } else {
        router.replace('/auth/LoginScreen');
      }
    }
  }, [isAuthenticated, userRole, isLoading]);

  if (!loaded || isLoading) {
    return null; // Return null until fonts are loaded and data is fetched
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen1" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen2" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen3" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SelectRole" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen" options={{ headerShown: false }} />
        <Stack.Screen name="murid" options={{ headerShown: false }} />
        <Stack.Screen name="guru/GuruNavigator" options={{ headerShown: false }} />
        <Stack.Screen name="Notifikasi" options={{ headerShown: false, title: 'Notifikasi' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
