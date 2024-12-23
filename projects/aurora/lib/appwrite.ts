import { PostForm } from '@/app/(tabs)/create'
import { ImagePickerAsset } from 'expo-image-picker'
import {
  ID,
  Client,
  Account,
  Avatars,
  Databases,
  Query,
  Models,
  Storage,
  ImageGravity,
} from 'react-native-appwrite'

// Configuración
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.edzo.aora',
  projectId: '674c7a990037ec57dee0',
  databaseId: '674c7ae000088b833443',
  usersCollectionId: '674c7afe003127b19997',
  videosCollectionId: '674c7b71000503698c8e',
  storageId: '674c7aef001df2b2307f',
} as const

// Tipos
interface CreateUserParams {
  email: string
  password: string
  username: string
}

interface SignInParams {
  email: string
  password: string
}

interface AppwriteUser extends Models.Document {
  accountId: string
  username: string
  email: string
  avatar: string
}

export interface AppwriteVideo extends Models.Document {
  title: string
  thumbnail: string
  video: string
  prompt: string
  creator: AppwriteUser
}

class AppwriteError extends Error {
  constructor(
    message: string,
    public originalError?: unknown,
  ) {
    super(message)
    this.name = 'AppwriteError'
  }
}

// Cliente y servicios
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

// Funciones
export async function createUser({
  email,
  password,
  username,
}: CreateUserParams): Promise<AppwriteUser> {
  try {
    // Crear cuenta
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    )

    if (!newAccount) {
      throw new AppwriteError('La creación de la cuenta falló')
    }

    // Generar avatar
    const avatarUrl = avatars.getInitials(username)

    // Iniciar sesión
    await signIn({ email, password })

    // Crear documento de usuario
    const newUser = await databases.createDocument<AppwriteUser>(
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
  } catch (error) {
    console.error('Error al crear usuario:', error)
    throw new AppwriteError('Error al crear usuario', error)
  }
}

export async function signIn({
  email,
  password,
}: SignInParams): Promise<Models.Session> {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    throw new AppwriteError('Error al iniciar sesión', error)
  }
}

export async function getCurrentUser(): Promise<AppwriteUser | null> {
  try {
    const currentAccount = await account.get()

    const response = await databases.listDocuments<AppwriteUser>(
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

export const getAllPosts = async (): Promise<AppwriteVideo[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt')],
    )

    return posts.documents as AppwriteVideo[]
  } catch (error) {
    throw new AppwriteError('Error al obtener los posts', error)
  }
}

export const getLatestPosts = async (): Promise<AppwriteVideo[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(3)],
    )

    return posts.documents as AppwriteVideo[]
  } catch (error) {
    throw new AppwriteError('Error al obtener los posts', error)
  }
}

export const searchPosts = async (query: string): Promise<AppwriteVideo[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search('title', query)],
    )

    return posts.documents as AppwriteVideo[]
  } catch (error) {
    throw new AppwriteError('Error al obtener los posts', error)
  }
}

export const getUserPosts = async (
  userId: string,
): Promise<AppwriteVideo[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')],
    )

    return posts.documents as AppwriteVideo[]
  } catch (error) {
    throw new AppwriteError('Error al obtener los posts', error)
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    throw new AppwriteError('Error al cerrar sesión', error)
  }
}

export const getFilePreview = async (
  fileId: string,
  type: 'image' | 'video',
) => {
  let fileUrl

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100,
      )
    }

    if (!fileUrl) {
      throw new AppwriteError('Error al obtener la vista previa del archivo')
    }

    return fileUrl
  } catch (error) {
    throw new AppwriteError(
      'Error al obtener la vista previa del archivo',
      error,
    )
  }
}

export const uploadFile = async (
  file: ImagePickerAsset | null,
  type: 'image' | 'video',
) => {
  if (!file) return

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      {
        name: file.fileName!,
        size: file.fileSize!,
        type: file.mimeType!,
        uri: file.uri,
      },
    )

    const fileUrl = await getFilePreview(uploadedFile.$id, type)

    return fileUrl
  } catch (error) {
    throw new AppwriteError('Error al subir el archivo', error)
  }
}

export const createVideo = async (form: PostForm) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(
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
  } catch (error) {
    throw new AppwriteError('Error al crear el video', error)
  }
}
