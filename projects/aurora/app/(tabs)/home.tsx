import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { AppwriteVideo, getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/use-appwrite'
import { useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { user } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite<AppwriteVideo>(getAllPosts)
  const { data: latestPosts } = useAppwrite<AppwriteVideo>(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)

    await refetch()

    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full px-4'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='mt-6'>
            <View className='justify-between items-start flex-row mb-6'>
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

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular'>
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
