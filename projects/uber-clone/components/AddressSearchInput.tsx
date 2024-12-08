import { debounce } from '@/lib/utils'
import { AddressSearchInputProps, NominatimPlace } from '@/types/types'
import { useCallback, useState } from 'react'
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'

const AddressSearchInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: AddressSearchInputProps) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<NominatimPlace[]>([])

  // Función para buscar las sugerencias de Nominatim
  const fetchSuggestions = async (text: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1&limit=5`,
      )
      const data: NominatimPlace[] = await response.json()
      setSuggestions(data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  // Usar useCallback para memoizar la función debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    [],
  )

  return (
    <View
      className={`flex flex-row items-center justify-center relative rounded-xl ${containerStyle}`}
      // style={{ zIndex: 10 }}
    >
      <View className='flex flex-row justify-center relative items-center mx-2 gap-2'>
        {icon && (
          <Image source={icon} className='w-6 h-6' resizeMode='contain' />
        )}

        <TextInput
          value={query}
          className='rounded-full font-Jakarta text-[15px] flex-1'
          placeholder={initialLocation ?? 'Where do you want to go?'}
          onChangeText={(text) => {
            setQuery(text)
            if (text.length > 2) debouncedFetchSuggestions(text) // Llamada API solo si el texto tiene más de 2 caracteres
          }}
          placeholderTextColor='gray'
        />
      </View>

      {/* Lista de sugerencias */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => item.place_id + '-' + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setQuery(item.display_name) // Coloca el nombre seleccionado en el input
                setSuggestions([]) // Limpia las sugerencias
                handlePress({
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lon),
                  address: item.display_name,
                })
              }}
              style={{
                padding: 10,
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
              }}
            >
              <Text style={{ fontSize: 14 }}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={{
            backgroundColor: textInputBackgroundColor || 'white',
            position: 'absolute',
            top: 40,
            width: '100%',
            borderRadius: 10,
            zIndex: 100,
            maxHeight: 150, // Para evitar una lista infinita
          }}
        />
      )}
    </View>
  )
}

export default AddressSearchInput
