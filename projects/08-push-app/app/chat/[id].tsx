import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

const ChatIdScreen = () => {
  const { id } = useLocalSearchParams()

  return (
    <View style={{ marginHorizontal: 10, marginTop: 25 }}>
      <ThemedText style={{ fontSize: 25 }}>Chat ID Screen</ThemedText>

      <ThemedText style={{ fontSize: 20 }}>Chat ID: {id}</ThemedText>
    </View>
  )
}

export default ChatIdScreen
