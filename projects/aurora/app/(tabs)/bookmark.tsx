import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserBookmaks } from '@/lib/get-user-bookmars'
import { AppwriteBookmark } from '@/interfaces/bookmark.interface'
import { deleteBookmark } from '@/lib/delete-bookmark'

const Bookmark = () => {
  const { user } = useGlobalContext()

  const searchBookmarksMemoized = useCallback(
    () => getUserBookmaks(user?.$id as string),
    [user?.$id],
  )

  const { data, refetch } = useAppwrite<AppwriteBookmark>(
    searchBookmarksMemoized,
  )
  const [refreshing, setRefreshing] = useState(false)

  const onDelete = async (bookmarkId: string) => {
    setRefreshing(true)
    await deleteBookmark(bookmarkId)

    await refetch()

    setRefreshing(false)
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => {
          return (
            <VideoCard
              video={item.video}
              className='px-4'
              isBookmarked
              bookmarkId={item.$id}
              onCreate={() => Promise.resolve()}
              refresing={refreshing}
              onDelete={onDelete}
            />
          )
        }}
        ListHeaderComponent={() => (
          <Text className='text-2xl text-white font-psemibold pt-8 px-4'>
            Videos guardados
          </Text>
        )}
        contentContainerClassName='gap-6'
        ListEmptyComponent={() => (
          <EmptyState
            title='No hay videos guardados'
            subtitle='Guarda tus videos favoritos para verlos más tarde'
            buttonTitle='Ver videos'
            onPress={() => router.push('/home')}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Bookmark
