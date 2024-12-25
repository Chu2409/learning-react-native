import { appwrite, config } from '@/config/appwrite.config'
import { AppwriteBookmark } from '@/interfaces/bookmark.interface'
import { Query } from 'react-native-appwrite'

export const getUserBookmaks = async (
  userId: string,
): Promise<AppwriteBookmark[]> => {
  try {
    const bookmarks = await appwrite.databases.listDocuments<AppwriteBookmark>(
      config.databaseId,
      config.bookmarksCollectionId,
      [Query.orderDesc('$createdAt'), Query.equal('user', userId)],
    )

    return bookmarks.documents
  } catch (error: any) {
    throw new Error('Error al obtener los posts', error)
  }
}
