import { icons } from '@/constants'
import { AppwriteVideo } from '@/interfaces/video.interface'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
  bookmarkId,
  isBookmarked,
  onCreate,
  onDelete,
  refresing,
  className,
}: {
  video: AppwriteVideo
  isBookmarked: boolean
  bookmarkId?: string
  refresing?: boolean
  onCreate: (videoId: string) => Promise<void>
  onDelete: (bookmarkId: string) => Promise<void>
  className?: string
}) => {
  const [play, setPlay] = useState(false)

  const [optionesOpen, setOptionesOpen] = useState(false)

  return (
    <View className={`mb-10 gap-3 ${className}`}>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{
                uri: avatar,
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
              {username || 'Anónimo'}
            </Text>
          </View>
        </View>

        <Pressable
          className='my-auto'
          onPress={() => setOptionesOpen(!optionesOpen)}
        >
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </Pressable>
      </View>

      <View className='h-60'>
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
            className='w-full h-60 rounded-xl relative justify-center items-center active:opacity-70'
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
          </Pressable>
        )}

        {optionesOpen && (
          <View className='absolute bg-secondary/80 px-1 py-3 items-center gap-4 right-0 h-60 mt-1 rounded-r-xl'>
            <Pressable
              className='flex-row gap-3 items-center'
              onPress={async () => {
                if (isBookmarked) {
                  await onDelete(bookmarkId!)
                } else {
                  await onCreate($id)
                }
              }}
              disabled={refresing}
            >
              <Ionicons
                name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={30}
                color='black'
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

export default VideoCard
