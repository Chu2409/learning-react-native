import { appwrite, config } from '@/config/appwrite.config'
import { AppwriteUser } from '@/interfaces/user.interface'
import { Query } from 'react-native-appwrite'

export const getCurrentUser = async (): Promise<AppwriteUser | null> => {
  try {
    const currentAccount = await appwrite.account.get()

    const response = await appwrite.databases.listDocuments<AppwriteUser>(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!response.documents.length) {
      return null
    }

    return response.documents[0]
  } catch (error) {
    console.error('Error al obtener usuario actual:', error)
    // Retornamos null en lugar de throw ya que es una operación de consulta
    return null
  }
}
