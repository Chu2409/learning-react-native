import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import VideoCard from '@/components/VideoCard'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { View, FlatList, Image, Pressable, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserVideos } from '@/lib/get-user-videos'
import { AppwriteVideo } from '@/interfaces/video.interface'
import { createBookmark } from '@/lib/create-bookmark'
import { deleteBookmark } from '@/lib/delete-bookmark'

const Profile = () => {
  const { user, logout } = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const searchPostsMemoized = useCallback(
    () => getUserVideos(user?.$id as string),
    [user?.$id],
  )

  const { data: posts, refetch } =
    useAppwrite<AppwriteVideo>(searchPostsMemoized)

  const handleLogout = () => {
    logout()
    router.replace('/sign-in')
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
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <Pressable
              className='w-full items-end mb-10'
              onPress={handleLogout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </Pressable>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={user?.username || 'Username'}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />

            <View className='mt-5 flex-row'>
              <InfoBox
                title={posts?.length.toString() || '0'}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />

              <InfoBox
                title='1.2k'
                subtitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No existen videos'
            subtitle='Sube tu primer video'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      />
    </SafeAreaView>
  )
}

export default Profile
