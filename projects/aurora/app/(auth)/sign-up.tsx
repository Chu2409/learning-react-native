import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createUser } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setUser, setIsLoggedIn } = useGlobalContext()

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }

    setIsSubmitting(true)

    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
      })
      setUser(result)
      setIsLoggedIn(true)

      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white mt-10 font-psemibold'>
            Sign up to Aora
          </Text>

          <FormField
            title='Username'
            value={form.username}
            onChangeText={(e) => {
              setform({
                ...form,
                username: e,
              })
            }}
            className='mt-7'
          />

          <FormField
            title='Email'
            value={form.email}
            onChangeText={(e) => {
              setform({
                ...form,
                email: e,
              })
            }}
            className='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            onChangeText={(e) => {
              setform({
                ...form,
                password: e,
              })
            }}
            className='mt-7'
          />

          <CustomButton
            title='Sign Up'
            onPress={submit}
            containerStyles='mt-7'
            disabled={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>

            <Link
              href={'/sign-in'}
              className='text-lg font-psemibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
