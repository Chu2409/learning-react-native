import { appwrite, config } from '@/config/appwrite.config'
import { AppwriteUser } from '@/interfaces/user.interface'
import { ID } from 'react-native-appwrite'
import { signIn } from './sign-in'

interface CreateUserParams {
  email: string
  password: string
  username: string
}

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserParams) => {
  try {
    const newAccount = await appwrite.account.create(
      ID.unique(),
      email,
      password,
      username,
    )

    if (!newAccount) {
      throw new Error('La creación de la cuenta falló')
    }

    const avatarUrl = appwrite.avatars.getInitials(username)

    await signIn({ email, password })

    const newUser = await appwrite.databases.createDocument<AppwriteUser>(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      },
    )

    return newUser
  } catch (error: any) {
    console.error('Error al crear usuario:', error)
    throw new Error('Error al crear usuario', error)
  }
}
