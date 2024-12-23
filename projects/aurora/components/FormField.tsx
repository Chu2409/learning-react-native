import { icons } from '@/constants'
import { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  View,
  Text,
  TextInput,
  Image,
  TextInputProps,
  Pressable,
} from 'react-native'

interface Props<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  title: string
  className?: string
  error?: string
  isPassword?: boolean
}

const FormField = <T extends FieldValues>({
  control,
  name,
  error,
  title,
  onChangeText,
  className,
  isPassword,
  ...rest
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`gap-2 ${className}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur } }) => (
          <View className='relative flex-row'>
            <TextInput
              {...rest}
              className={`flex-1 text-white font-psemibold text-base w-full h-16 px-4 bg-black-100 rounded-2xl border border-black-200 focus:border-secondary ${error ? 'border border-red-500' : ''}`}
              placeholderTextColor='#7B7B8B'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
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
        )}
      />

      {error && (
        <Text className='text-red-500 text-sm font-pregular'>{error}</Text>
      )}
    </View>
  )
}

export default FormField
