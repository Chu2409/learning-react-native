import { Product } from '@/core/products/interfaces/product.interface'
import { FlatList, RefreshControl } from 'react-native'
import { ProductCard } from './ProductCard'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  products: Product[]
  loadNextPage: () => void
}

const ProductsList = ({ products, loadNextPage }: Props) => {
  const [isRefreshing, setisRefreshing] = useState(false)
  const queryClient = useQueryClient()

  const onPullToRefresh = async () => {
    setisRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 200))

    queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })

    setisRefreshing(false)
  }

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  )
}

export default ProductsList
