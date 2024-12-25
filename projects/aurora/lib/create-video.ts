import { appwrite, config } from '@/config/appwrite.config'
import { CreateVideoFormData } from '@/hooks/useCreateVideo'
import { File } from '@/interfaces/file.interface'
import { ID, ImageGravity } from 'react-native-appwrite'

export const getFilePreview = async (
  fileId: string,
  type: 'image' | 'video',
) => {
  let fileUrl

  try {
    if (type === 'video') {
      fileUrl = appwrite.storage.getFileView(config.storageId, fileId)
    } else if (type === 'image') {
      fileUrl = appwrite.storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100,
      )
    }

    if (!fileUrl) {
      throw new Error('Error al obtener la vista previa del archivo')
    }

    return fileUrl
  } catch (error: any) {
    throw new Error('Error al obtener la vista previa del archivo', error)
  }
}

export const uploadFile = async (file: File, type: 'image' | 'video') => {
  if (!file) return

  try {
    const uploadedFile = await appwrite.storage.createFile(
      config.storageId,
      ID.unique(),
      file,
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)

    return fileUrl
  } catch (error: any) {
    throw new Error('Error al subir el archivo', error)
  }
}

interface CreateVideoParams extends CreateVideoFormData {
  userId: string
}

export const createVideo = async (form: CreateVideoParams) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newPost = await appwrite.databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      },
    )

    return newPost
  } catch (error: any) {
    throw new Error('Error al crear el video', error)
  }
}
