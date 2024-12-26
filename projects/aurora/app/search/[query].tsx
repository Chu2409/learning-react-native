import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import useAppwrite from '@/hooks/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchVideos } from '@/lib/search-videos'
import { AppwriteVideo } from '@/interfaces/video.interface'
import { useGlobalContext } from '@/context/GlobalProvider'
import { createBookmark } from '@/lib/create-bookmark'
import { deleteBookmark } from '@/lib/delete-bookmark'

const Search = () => {
  const { user } = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const { query } = useLocalSearchParams()

  const searchPostsMemoized = useCallback(
    () => searchVideos(query as string),
    [query],
  )

  const { data: posts, refetch } =
    useAppwrite<AppwriteVideo>(searchPostsMemoized)

  const onCreate = async (videoId: string) => {
    setRefreshing(true)
    await createBookmark(user?.$id as string, videoId)

    await refetch()

    setRefreshing(false)
  }

  const onDelete = async (bookmarkId: string) => {
    setRefreshing(true)
    await deleteBookmark(bookmarkId)

    await refetch()

    setRefreshing(false)
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          const isBookmarked = item.bookmarks.find(
            (bookmark) => bookmark.user.$id === user?.$id,
          )

          return (
            <VideoCard
              video={item}
              className='px-4'
              isBookmarked={!!isBookmarked}
              bookmarkId={isBookmarked?.$id}
              refresing={refreshing}
              onCreate={onCreate}
              onDelete={onDelete}
            />
          )
        }}
        ListHeaderComponent={() => (
          <View className='my-6'>
            <Text className='font-pmedium text-sm text-gray-100 px-4'>
              Resultados de búsqueda
            </Text>

            <Text className='text-2xl font-psemibold text-white px-4'>
              {query}
            </Text>

            <View className='my-6'>
              <SearchInput
                initialQuery={query as string}
                containerClassName='px-4'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No hay videos'
            subtitle='Intenta con otro término de búsqueda'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />
    </SafeAreaView>
  )
}

export default Search
