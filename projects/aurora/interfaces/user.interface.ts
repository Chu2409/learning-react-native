import type { Models } from 'react-native-appwrite'

export interface AppwriteUser extends Models.Document {
  email: string
  username: string
  avatar: string
  accountId: string
}
