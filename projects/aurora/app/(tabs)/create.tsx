import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native'
import { useCreateVideoForm } from '@/hooks/useCreateVideo'

const Create = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    selectImage,
    selectVideo,
    video,
    thumbnail,
  } = useCreateVideoForm()

  return (
    <KeyboardAvoidingView className='my-safe h-full'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='gap-6 flex-grow px-4 pt-8 pb-20'
      >
        <Text className='text-2xl text-white font-psemibold'>Cargar Video</Text>

        <FormField
          control={control}
          name='title'
          title='Título'
          placeholder='Capibara escribiendo código'
          error={errors.title?.message}
        />

        <View className='gap-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Subir Video
          </Text>

          <Pressable onPress={selectVideo} className='active:opacity-50'>
            {video !== '' ? (
              <Video
                source={{ uri: video }}
                style={{ width: '100%', height: 256, borderRadius: 16 }}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className='w-full h-52 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-1/2 h-1/2'
                  />
                </View>
              </View>
            )}

            {errors?.video?.message && (
              <Text className='text-red-500 text-sm font-pregular pt-2'>
                {errors.video.message}
              </Text>
            )}
          </Pressable>
        </View>

        <View className='gap-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Imágen de portada
          </Text>

          <Pressable onPress={selectImage} className='active:opacity-50'>
            {thumbnail !== '' ? (
              <Image
                source={{ uri: thumbnail }}
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
                  Elige una imagen
                </Text>
              </View>
            )}

            {errors?.thumbnail?.message && (
              <Text className='text-red-500 text-sm font-pregular pt-2'>
                {errors.thumbnail.message}
              </Text>
            )}
          </Pressable>
        </View>

        <FormField
          control={control}
          name='prompt'
          title='Descripción IA'
          placeholder='Genera un capibara escribiendo código'
          error={errors.prompt?.message}
        />

        <CustomButton
          title='Publicar'
          onPress={handleSubmit(onSubmit)}
          containerStyles='mt-4'
          disabled={isSubmitting}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Create
