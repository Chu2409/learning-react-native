/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Alert } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { createVideo } from '@/lib/create-video'

const createVideoSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  prompt: z.string().min(1, 'La descripción es requerida'),
  video: z.object(
    {
      name: z.string(),
      size: z.number(),
      type: z.string(),
      uri: z.string(),
    },
    { message: 'El video es requerido' },
  ),
  thumbnail: z.object(
    {
      name: z.string(),
      size: z.number(),
      type: z.string(),
      uri: z.string(),
    },
    { message: 'La imagen es requerida' },
  ),
})

export type CreateVideoFormData = z.infer<typeof createVideoSchema>

export const useCreateVideoForm = () => {
  const [video, setVideo] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateVideoFormData>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      title: '',
      prompt: '',
    },
  })

  useEffect(() => {
    setVideo(getValues('video')?.uri || '')
    clearErrors('video')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('video')])

  useEffect(() => {
    setThumbnail(getValues('thumbnail')?.uri || '')
    clearErrors('thumbnail')
  }, [watch('thumbnail')])

  const { user } = useGlobalContext()

  const selectVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'videos',
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setValue('video', {
        name: result.assets[0].fileName!,
        size: result.assets[0].fileSize!,
        type: result.assets[0].mimeType!,
        uri: result.assets[0].uri!,
      })
    }
  }

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setValue('thumbnail', {
        name: result.assets[0].fileName!,
        size: result.assets[0].fileSize!,
        type: result.assets[0].mimeType!,
        uri: result.assets[0].uri!,
      })
    }
  }

  const onSubmit = async (data: CreateVideoFormData) => {
    try {
      await createVideo({
        ...data,
        userId: user?.$id!,
      })

      Alert.alert('Success', 'Post uploaded successfully')
      reset()

      router.push('/home')
    } catch (error: any) {
      Alert.alert('An error occurred', error.message)
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    isSubmitting,
    errors,
    selectImage,
    selectVideo,
    video,
    thumbnail,
  }
}
