import { appwrite, config } from '@/config/appwrite.config'
import { AppwriteBookmark } from '@/interfaces/bookmark.interface'
import { ID } from 'react-native-appwrite'

export const createBookmark = async (userId: string, videoId: string) => {
  try {
    const newBookmark =
      await appwrite.databases.createDocument<AppwriteBookmark>(
        config.databaseId,
        config.bookmarksCollectionId,
        ID.unique(),
        {
          user: userId,
          video: videoId,
        },
      )

    return newBookmark
  } catch (error: any) {
    console.error('Error al crear el bookmark:', error)
    throw new Error('Error al crear el bookmark', error)
  }
}
