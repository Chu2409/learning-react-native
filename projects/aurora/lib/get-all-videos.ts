import { appwrite, config } from '@/config/appwrite.config'
import { AppwriteVideo } from '@/interfaces/video.interface'
import { Query } from 'react-native-appwrite'

export const getAllVideos = async (): Promise<AppwriteVideo[]> => {
  try {
    const posts = await appwrite.databases.listDocuments<AppwriteVideo>(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt')],
    )

    return posts.documents
  } catch (error: any) {
    throw new Error('Error al obtener los posts', error)
  }
}
