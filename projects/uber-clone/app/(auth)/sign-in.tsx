import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { icons, images } from '@/constants'
import InputField from '@/components/InputField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import OAuth from '@/components/OAuth'
import { useSignIn } from '@clerk/clerk-expo'

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Error', err.errors[0].longMessage)
    }
  }, [isLoaded, signIn, form.email, form.password, setActive])

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='flex-1 bg-white'>
        <View className='relative w-full h-60'>
          <Image source={images.signUpCar} className='z-0 w-full h-60' />

          <Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
            Welcome 👋
          </Text>
        </View>

        <View className='p-5'>
          <InputField
            label='Email'
            placeholder='Enter your email'
            icon={icons.email}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.nativeEvent.text })}
          />

          <InputField
            label='Password'
            placeholder='Enter your password'
            icon={icons.lock}
            value={form.password}
            secureTextEntry
            onChange={(e) => setForm({ ...form, password: e.nativeEvent.text })}
          />

          <CustomButton
            title='Sign In'
            onPress={onSignInPress}
            className='mt-6'
          />

          <OAuth />

          <Link
            href={'/sign-up'}
            className='text-lg text-center text-general-200 mt-10'
          >
            <Text>Don't have an account? </Text>

            <Text className='text-primary-500'>Sign Up</Text>
          </Link>
        </View>

        {/* Verification Modal */}
      </View>
    </ScrollView>
  )
}

export default SignIn
