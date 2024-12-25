import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import useAppwrite from '@/hooks/useAppwrite'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchVideos } from '@/lib/search-videos'
import { AppwriteVideo } from '@/interfaces/video.interface'

const Search = () => {
  const { query } = useLocalSearchParams()

  const searchPostsMemoized = useCallback(
    () => searchVideos(query as string),
    [query],
  )

  const { data: posts, refetch } =
    useAppwrite<AppwriteVideo>(searchPostsMemoized)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} className='px-4' />}
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
      />
    </SafeAreaView>
  )
}

export default Search
