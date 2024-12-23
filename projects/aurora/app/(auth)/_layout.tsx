import { colors } from '@/constants/colors'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.primary, height: '100%' },
      }}
    >
      <Stack.Screen name='sign-in' />

      <Stack.Screen name='sign-up' />
    </Stack>
  )
}

export default AuthLayout
