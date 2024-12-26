import { appwrite, config } from '@/config/appwrite.config'

export const deleteBookmark = async (bookmarkId: string) => {
  try {
    const deletedBookmark = await appwrite.databases.deleteDocument(
      config.databaseId,
      config.bookmarksCollectionId,
      bookmarkId,
    )

    return deletedBookmark
  } catch (error: any) {
    console.error('Error al eliminar el bookmark:', error)
    throw new Error('Error al eliminar el bookmark', error)
  }
}
