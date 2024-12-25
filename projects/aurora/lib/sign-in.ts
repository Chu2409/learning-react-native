import { appwrite } from '@/config/appwrite.config'
import { Models } from 'react-native-appwrite'

interface SignInParams {
  email: string
  password: string
}

export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<Models.Session> => {
  try {
    const session = await appwrite.account.createEmailPasswordSession(
      email,
      password,
    )
    return session
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error)
    throw new Error('Error al iniciar sesión', error)
  }
}
