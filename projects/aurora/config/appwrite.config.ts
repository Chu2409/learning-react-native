import {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
} from 'react-native-appwrite'

const validateEnvVariables = () => {
  const requiredVars = [
    'EXPO_PUBLIC_APPWRITE_PLATFORM',
    'EXPO_PUBLIC_APPWRITE_PROJECT_ID',
    'EXPO_PUBLIC_APPWRITE_DATABASE_ID',
    'EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID',
    'EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID',
    'EXPO_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID',
    'EXPO_PUBLIC_APPWRITE_LIKES_COLLECTION_ID',
    'EXPO_PUBLIC_APPWRITE_STORAGE_ID',
  ]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    )
  }
}

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID!,
  bookmarksCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_BOOKMARKS_COLLECTION_ID!,
  likesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_LIKES_COLLECTION_ID!,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
} as const

class AppwriteService {
  private static instance: AppwriteService
  private client: Client
  private _account: Account
  private _avatars: Avatars
  private _databases: Databases
  private _storage: Storage

  private constructor() {
    validateEnvVariables()

    this.client = new Client()
      .setEndpoint(config.endpoint)
      .setProject(config.projectId!)
      .setPlatform(config.platform!)

    this._account = new Account(this.client)
    this._avatars = new Avatars(this.client)
    this._databases = new Databases(this.client)
    this._storage = new Storage(this.client)
  }

  public static getInstance(): AppwriteService {
    if (!AppwriteService.instance) {
      AppwriteService.instance = new AppwriteService()
    }
    return AppwriteService.instance
  }

  get account(): Account {
    return this._account
  }

  get avatars(): Avatars {
    return this._avatars
  }

  get databases(): Databases {
    return this._databases
  }

  get storage(): Storage {
    return this._storage
  }
}

export const appwrite = AppwriteService.getInstance()
