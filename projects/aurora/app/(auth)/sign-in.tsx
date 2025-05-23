import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { Link } from 'expo-router'
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import { useSignInForm } from '@/hooks/useSignInForm'

const SignIn = () => {
  const { control, handleSubmit, onSubmit, isSubmitting, errors } =
    useSignInForm()

  return (
    <KeyboardAvoidingView className='my-safe h-full'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='justify-center gap-6 flex-grow pb-20'
      >
        <Image
          source={images.logo}
          resizeMode='contain'
          className='w-[115px] h-[35px]'
        />

        <Text className='text-2xl text-white mt-4 font-psemibold'>
          Ingresar en Aora
        </Text>

        <FormField
          control={control}
          name='email'
          title='Email'
          placeholder='dzhu2409@gmail.com'
          keyboardType='email-address'
          error={errors.email?.message}
        />

        <FormField
          control={control}
          name='password'
          title='Contraseña'
          isPassword
          placeholder='********'
          error={errors.password?.message}
        />

        <CustomButton
          title='Ingresar'
          onPress={handleSubmit(onSubmit)}
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn
