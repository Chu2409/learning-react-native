import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useSignUpForm } from '@/hooks/useSignUpForm'
import { Link } from 'expo-router'
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native'

const SignUp = () => {
  const { control, handleSubmit, onSubmit, isSubmitting, errors } =
    useSignUpForm()

  return (
    <KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full justify-center min-h-[85vh] px-4 gap-8'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white mt-4 font-psemibold'>
            Registrarse en Aora
          </Text>

          <FormField
            control={control}
            name='username'
            title='Usuario'
            placeholder='dzhu2409'
            error={errors.username?.message}
          />

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
            title='Registrarse'
            onPress={handleSubmit(onSubmit)}
            containerStyles='mt-4'
            disabled={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              ¿Ya tienes una cuenta?
            </Text>

            <Link
              href={'/sign-in'}
              className='text-lg font-psemibold text-secondary'
            >
              Ingresar
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp
