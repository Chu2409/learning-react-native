import type { Models } from 'react-native-appwrite'

export interface AppwriteUser extends Models.Document {
  accountId: string
  username: string
  email: string
  avatar: string
}
