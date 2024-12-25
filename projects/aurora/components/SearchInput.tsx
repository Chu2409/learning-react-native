import { icons } from '@/constants'
import { router } from 'expo-router'
import { usePathname } from 'expo-router'
import { useState } from 'react'
import {
  View,
  TextInput,
  Image,
  Alert,
  Pressable,
  TextInputProps,
} from 'react-native'

interface Props extends TextInputProps {
  initialQuery?: string
  containerClassName?: string
}

const SearchInput = ({
  initialQuery,
  className,
  containerClassName,
  ...rest
}: Props) => {
  const pathname = usePathname()

  const [query, setQuery] = useState(() => initialQuery || '')

  return (
    <View className={`relative flex-row ${containerClassName}`}>
      <TextInput
        {...rest}
        className={`text-white flex-1 font-pregular w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary ${className}`}
        value={query}
        placeholder='Buscar videos'
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />

      <Pressable
        onPress={() => {
          if (!query) return Alert.alert('Ingrese un término de búsqueda')

          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
        }}
        className='px-4 absolute right-5 top-[18px]'
      >
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </Pressable>
    </View>
  )
}

export default SearchInput
