import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const backgroundColor = useThemeColor({}, 'background')

  const [loaded] = useFonts({
    KaninRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    KaninBold: require('../assets/fonts/Kanit-Bold.ttf'),
    KaninThin: require('../assets/fonts/Kanit-Thin.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          ></Stack>
          <StatusBar style='auto' />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
