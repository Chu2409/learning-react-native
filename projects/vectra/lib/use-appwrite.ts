import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

const useAppwrite = <T>(fetchFn: () => Promise<T[]>) => {
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchFn()
        setData(response)
      } catch (error: any) {
        Alert.alert('Error', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [fetchFn])

  const refetch = async () => {
    setIsLoading(true)
    try {
      const response = await fetchFn()
      setData(response)
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, refetch }
}

export default useAppwrite
