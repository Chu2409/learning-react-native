import { appwrite } from '@/config/appwrite.config'

export const signOut = async () => {
  try {
    const session = await appwrite.account.deleteSession('current')

    return session
  } catch (error: any) {
    throw new Error('Error al cerrar sesión', error)
  }
}
