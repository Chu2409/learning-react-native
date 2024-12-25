import type { Models } from 'react-native-appwrite'
import { AppwriteUser } from './user.interface'
import { AppwriteVideo } from './video.interface'

export interface AppwriteBookmark extends Models.Document {
  user: AppwriteUser
  video: AppwriteVideo
}
