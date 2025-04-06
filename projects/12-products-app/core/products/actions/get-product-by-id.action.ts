import { API_URL, productsApi } from '@/core/api/productsApi'
import { Gender, type Product } from '../interfaces/product.interface'

const emptyeProduct: Product = {
  id: '',
  title: 'Nuevo producto',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: [],
}

export const getProductById = async (id: string) => {
  if (id === 'new') return emptyeProduct

  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`)

    return {
      ...data,
      images: data.images.map(
        (image: string) => `${API_URL}/files/product/${image}`,
      ),
    }
  } catch (error) {
    throw new Error('Error fetching product')
  }
}
