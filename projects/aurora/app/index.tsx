import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { Redirect, router } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />

  return (
    <SafeAreaView className='justify-center items-center min-h-[85vh] px-6'>
      <Image
        source={images.logo}
        className='w-[130px] h-[84px]'
        resizeMode='contain'
      />

      <Image
        source={images.cards}
        className='max-w-[380px] w-full h-[300px]'
        resizeMode='contain'
      />

      <View className='relative mt-5'>
        <Text className='text-3xl font-bold text-center text-white'>
          Descubra infinitas posibilidades con{' '}
          <Text className='text-secondary-200'>Aora</Text>
        </Text>

        <Image
          source={images.path}
          className='w-[136px] h-[15px] absolute -bottom-3 left-40'
          resizeMode='contain'
        />
      </View>

      <Text className='text-base font-pregular text-gray-100 my-7 text-center'>
        Donde la creatividad se encuentra con la innovación: emprende un viaje
        de exploración sin límites con Aora
      </Text>

      <CustomButton
        title='Comenzar'
        onPress={() => router.push('/sign-in')}
        containerStyles='w-full mt-4'
      />
    </SafeAreaView>
  )
}

export default App
