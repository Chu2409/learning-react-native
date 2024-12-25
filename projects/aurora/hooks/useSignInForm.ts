import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'
import { signIn } from '@/lib/sign-in'
import { getCurrentUser } from '@/lib/get-current-user'

const signInSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type SignInFormData = z.infer<typeof signInSchema>

export const useSignInForm = () => {
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
      await signIn(data)
      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Success', 'Ingreso exitoso')
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  return { control, handleSubmit, onSubmit, isSubmitting, errors }
}
