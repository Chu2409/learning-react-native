import { appwrite, config } from '@/config/appwrite.config'
import { AppwriteVideo } from '@/interfaces/video.interface'
import { Query } from 'react-native-appwrite'

export const searchVideos = async (
  search: string,
): Promise<AppwriteVideo[]> => {
  try {
    const posts = await appwrite.databases.listDocuments<AppwriteVideo>(
      config.databaseId,
      config.videosCollectionId,
      [Query.search('title', search)],
    )

    return posts.documents
  } catch (error: any) {
    throw new Error('Error al obtener los posts', error)
  }
}
