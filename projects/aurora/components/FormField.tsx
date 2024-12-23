import { icons } from '@/constants'
import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  TextInputProps,
  Pressable,
} from 'react-native'

interface Props extends TextInputProps {
  title: string
  className?: string
  isPassword?: boolean
}

const FormField = ({
  title,
  onChangeText,
  className,
  isPassword,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`gap-y-2 ${className}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='relative flex-row'>
        <TextInput
          {...rest}
          className='flex-1 text-white font-psemibold text-base w-full h-16 px-4 bg-black-100 rounded-2xl border border-black-200 focus:border-secondary'
          placeholderTextColor='#7B7B8B'
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
        />

        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6 absolute right-4 top-5'
              resizeMode='contain'
            />
          </Pressable>
        )}
      </View>
    </View>
  )
}

export default FormField
