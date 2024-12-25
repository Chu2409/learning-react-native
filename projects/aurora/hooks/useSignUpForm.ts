import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'
import { createUser } from '@/lib/create-user'

const signUpSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export const useSignUpForm = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await createUser({
        email: data.email,
        password: data.password,
        username: data.username,
      })
      setUser(result)
      setIsLoggedIn(true)

      Alert.alert('Success', 'Registro exitoso')
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  return { control, handleSubmit, onSubmit, isSubmitting, errors }
}
