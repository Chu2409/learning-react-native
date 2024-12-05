import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { AppwriteVideo, searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/use-appwrite'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  const { query } = useLocalSearchParams()

  const searchPostsMemoized = useCallback(
    () => searchPosts(query as string),
    [query],
  )

  const { data: posts, refetch } =
    useAppwrite<AppwriteVideo>(searchPostsMemoized)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>

            <Text className='text-2xl font-psemibold text-white'>{query}</Text>

            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No videos found for the search query'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search
