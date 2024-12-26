import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import { useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllVideos } from '@/lib/get-all-videos'
import { getLatestVideos } from '@/lib/get-latest-videos'
import { AppwriteVideo } from '@/interfaces/video.interface'
import { createBookmark } from '@/lib/create-bookmark'
import { deleteBookmark } from '@/lib/delete-bookmark'

const Home = () => {
  const { user } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite<AppwriteVideo>(getAllVideos)
  const { data: latestPosts } = useAppwrite<AppwriteVideo>(getLatestVideos)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)

    await refetch()

    setRefreshing(false)
  }

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
          <View className='mt-6'>
            <View className='justify-between items-start flex-row mb-6 px-4'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Bienvenido de vuelta,
                </Text>

                <Text className='text-2xl font-psemibold text-white'>
                  {user?.username}
                </Text>
              </View>

              <View className='mt-1.5 '>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput containerClassName='px-4' />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular px-4'>
                Últimos videos
              </Text>

              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No hay videos'
            subtitle='Se el primero en subir un video'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  )
}

export default Home
