import React from 'react'
import { View, Text, useWindowDimensions, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  poster: string
  originalTitle: string
  title: string
}

const MovieHeader = ({originalTitle, poster, title}: Props) => {
  const {height} = useWindowDimensions()

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        start={[0, 0]}
        style={{
          height: height * 0.4,
          position: 'absolute',
          zIndex: 1,
          width: '100%'
        }}
      />

      <View style={{
        position: 'absolute',
        top: 25,
        left: 10,
        zIndex: 1000
      }}>
        <Pressable onPress={() => router.dismiss()} >
          <Ionicons name='arrow-back' size={30} color='white' className='shadow' />
        </Pressable>
      </View>

      <View className='shadow-xl shadow-black/20' style={{height: height * 0.7}}>
        <View className='flex-1 rounded-b-[25px] overflow-hidden'>
          <Image source={{uri: poster}} resizeMode='cover' className='flex-1'/>
        </View>
      </View>

      <View className='px-5 mt-5'>
        <Text className='font-normal'>{originalTitle}</Text>
        <Text className='font-semibold text-2xl'>{title}</Text>
      </View>
    </>
  )
}

export default MovieHeader