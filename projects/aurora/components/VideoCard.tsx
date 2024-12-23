import { icons } from '@/constants'
import { AppwriteVideo } from '@/lib/appwrite'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: {
  video: AppwriteVideo
}) => {
  const [play, setPlay] = useState(false)

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{
                uri: 'https://cloud.appwrite.io/v1/avatars/initials?name=Chudan&project=674b756a002b26a7647d',
              }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>

          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text
              className='text-white font-psemibold text-sm'
              numberOfLines={1}
            >
              {title}
            </Text>

            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className='pt-2'>
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          style={{
            backgroundColor: 'rgb(255 255 255 / 0.1)',
            width: '100%',
            height: 240,
            borderRadius: 33,
            marginTop: 12,
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
        <TouchableOpacity
          className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
          />

          <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard
