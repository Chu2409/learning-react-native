import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='find-ride' options={{ headerShown: false }} />
      <Stack.Screen name='confirm-ride' options={{ headerShown: false }} />
      <Stack.Screen name='book-ride' options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
