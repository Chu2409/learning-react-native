import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import VideoCard from '@/components/VideoCard'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import useAppwrite from '@/hooks/useAppwrite'
import { router } from 'expo-router'
import { useCallback } from 'react'
import { View, FlatList, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserVideos } from '@/lib/get-user-videos'
import { AppwriteVideo } from '@/interfaces/video.interface'

const Profile = () => {
  const { user, logout } = useGlobalContext()

  const searchPostsMemoized = useCallback(
    () => getUserVideos(user?.$id as string),
    [user?.$id],
  )

  const { data: posts } = useAppwrite<AppwriteVideo>(searchPostsMemoized)

  const handleLogout = () => {
    logout()
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} className='px-4' />}
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
      />
    </SafeAreaView>
  )
}

export default Profile
