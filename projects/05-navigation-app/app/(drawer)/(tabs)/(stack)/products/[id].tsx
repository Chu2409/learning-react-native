import { products } from '@/store/products.store'
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { View, Text } from 'react-native'

const ProductScreen = () => {
  const {id} = useLocalSearchParams()
  const navigation = useNavigation()

  const product = products.find((product) => product.id === id)

  useEffect(() => {
    navigation.setOptions({
      title: product?.title || 'Product'
    })
  }, [product])
  


  if (!product) return <Redirect href='/' />

  return (
    <View className='px-5 mt-4'>
      <Text className='font-work-black text-2xl'>{product.title}</Text>

      <Text>{product.description}</Text>

      <Text className='font-work-black'>{product.price}</Text>
    </View>
  )
}

export default ProductScreen