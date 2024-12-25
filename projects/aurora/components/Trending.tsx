import { icons } from '@/constants'
import { AppwriteVideo } from '@/lib/appwrite'
import { useState } from 'react'
import {
  ImageBackground,
  Image,
  useWindowDimensions,
  View,
  Pressable,
} from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import Carousel from 'react-native-reanimated-carousel'
import { useSharedValue } from 'react-native-reanimated'

const TrendingItem = ({ item }: { item: AppwriteVideo }) => {
  const [play, setPlay] = useState(false)

  return (
    <View>
      {play ? (
        <Video
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={{
            backgroundColor: 'rgb(255 255 255 / 0.1)',
            width: 220,
            height: 275,
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <Pressable
          className='relative flex justify-center items-center active:opacity-70'
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className='w-52 h-72 rounded-[33px] overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </Pressable>
      )}
    </View>
  )
}

const Trending = ({ posts }: { posts: AppwriteVideo[] }) => {
  const width = useWindowDimensions().width
  const progress = useSharedValue<number>(0)

  return (
    <Carousel
      data={posts}
      loop
      renderItem={({ item }) => <TrendingItem item={item} />}
      width={220}
      height={250}
      style={{
        width: width,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      mode='parallax'
      onProgressChange={(p, a) => {
        progress.value = p
      }}
      modeConfig={{
        parallaxScrollingScale: 0.85,
        parallaxScrollingOffset: 50,
      }}
      defaultIndex={1}
    />
  )
}

export default Trending
