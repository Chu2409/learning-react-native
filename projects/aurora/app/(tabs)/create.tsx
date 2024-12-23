import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

export interface PostForm {
  title: string
  video: ImagePicker.ImagePickerAsset | null
  thumbnail: ImagePicker.ImagePickerAsset | null
  prompt: string
  userId?: string
}

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState<PostForm>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  })

  const openPicker = async (selectType: 'video' | 'image') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? 'images' : 'videos',
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        })
      }

      if (selectType === 'video') {
        setForm({
          ...form,
          video: result.assets[0],
        })
      }
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      return Alert.alert('All fields are required')
    }

    setUploading(true)

    try {
      await createVideo({
        ...form,
        userId: user?.$id,
      })

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error: any) {
      Alert.alert('An error occurred', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      })

      setUploading(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>

        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Give your video a catchy title...'
          handleChangeText={(e) =>
            setForm({
              ...form,
              title: e,
            })
          }
          otherStyles='mt-10'
        />

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{ width: '100%', height: 256, borderRadius: 16 }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-xl'
              />
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className='w-5 h-5 mr-2'
                />

                <Text className='text-sm text-gray-100 font-pmedium'>
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='The prompt you used to generate this video'
          handleChangeText={(e) =>
            setForm({
              ...form,
              prompt: e,
            })
          }
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submit & Publish'
          handlePress={submit}
          className='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
