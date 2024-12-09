import { View, Text, Image, Alert } from 'react-native'
import CustomButton from './CustomButton'
import { icons } from '@/constants'
import { useOAuth } from '@clerk/clerk-expo'
import { useCallback } from 'react'
import { googleOAuth } from '@/lib/auth'
import { router } from 'expo-router'

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const handeleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow)

      if (result.code === 'session_exists') {
        Alert.alert('Success', 'Session Exists. Redirecting to home page')
        router.push('/(root)/(tabs)/home')
      }

      Alert.alert(result.success ? 'Success' : 'Error', result.message)
    } catch (err) {
      console.error('OAuth Error: ', err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View>
      <View className='flex flex-row justify-center items-center mt-4 gap-x-3'>
        <View className='flex-1 h-[1px] bg-general-100' />

        <Text className='text-lg'>Or</Text>

        <View className='flex-1 h-[1px] bg-general-100' />
      </View>

      <CustomButton
        title='Log In with Google'
        className='mt-5 w-full shadow-none'
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode='contain'
            className='w-5 h-5 mx-2'
          />
        )}
        bgVariant='outline'
        textVariant='primary'
        onPress={handeleGoogleSignIn}
      />
    </View>
  )
}

export default OAuth