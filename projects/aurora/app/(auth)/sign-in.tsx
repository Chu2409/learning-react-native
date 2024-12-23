import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'

const SignIn = () => {
  const [form, setform] = useState({
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setUser, setIsLoggedIn } = useGlobalContext()

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields')
    }

    setIsSubmitting(true)

    try {
      await signIn({
        email: form.email,
        password: form.password,
      })
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Success', 'Logged in successfully')
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full justify-center min-h-[85vh] px-6 gap-8'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white mt-4 font-psemibold'>
            Ingresar a Aora
          </Text>

          <FormField
            title='Email'
            value={form.email}
            onChangeText={(e) => {
              setform({
                ...form,
                email: e,
              })
            }}
            placeholder='dzhu2409@gmail.com'
            keyboardType='email-address'
          />

          <FormField
            title='Contraseña'
            isPassword
            value={form.password}
            onChangeText={(e) => {
              setform({
                ...form,
                password: e,
              })
            }}
            placeholder='********'
          />

          <CustomButton
            title='Ingresar'
            onPress={submit}
            containerStyles='mt-4'
            disabled={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              ¿No tienes una cuenta?
            </Text>

            <Link
              href={'/sign-up'}
              className='text-lg font-psemibold text-secondary'
            >
              Regístrate
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn
