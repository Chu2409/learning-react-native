import AddressSearchInput from '@/components/AddressSearchInput'
import CustomButton from '@/components/CustomButton'
import RideLayout from '@/components/RideLayout'
import { icons } from '@/constants'
import { useLocationStore } from '@/store'
import { router } from 'expo-router'
import { Text, View } from 'react-native'

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore()

  return (
    <RideLayout title='Ride' snapPoints={['80%']}>
      <View className='my-3'>
        <Text className='text-lg font-JakartaSemiBold mb-3'>From</Text>

        <AddressSearchInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle='bg-neutral-100'
          textInputBackgroundColor='#F5F5F5'
          handlePress={(location) => setUserLocation(location)}
        />
      </View>

      <View className='my-3'>
        <Text className='text-lg font-JakartaSemiBold mb-3'>To</Text>

        <AddressSearchInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle='bg-neutral-100'
          textInputBackgroundColor='transparent'
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title='Find now'
        onPress={() => router.push('/(root)/confirm-ride')}
        className='mt-5'
      />
    </RideLayout>
  )
}

export default FindRide