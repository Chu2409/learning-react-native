import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signInSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type SignInFormData = z.infer<typeof signInSchema>

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn({
        email: data.email,
        password: data.password,
      })
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Success', 'Logged in successfully')
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn
