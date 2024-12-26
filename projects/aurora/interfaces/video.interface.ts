import { AppwriteBookmarkWithUser } from './bookmark.interface'
import { AppwriteUser } from './user.interface'
import { Models } from 'react-native-appwrite'

export interface AppwriteVideo extends Models.Document {
  title: string
  thumbnail: string
  video: string
  prompt: string
  creator: AppwriteUser
  bookmarks: AppwriteBookmarkWithUser[]
}
