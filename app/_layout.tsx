import 'react-native-reanimated';
import { useEffect,useState } from 'react';
import { useFonts } from 'expo-font';
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
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    };

    if (loaded) {
      checkAuth();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/auth/LoginScreen');
      }
    }
  }, [isAuthenticated, isLoading]);

  if (!loaded || isLoading) {
    return null; // Optionally return a custom loading/splash screen
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth/LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen1" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen2" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreen3" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SelectRole" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreenGuru" options={{ headerShown: false }} />
        <Stack.Screen name="auth/SignUpScreenMurid" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
