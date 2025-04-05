import CustomMap from '@/presentation/components/maps/CustomMap'
import { useLocationSotre } from '@/presentation/store/useLocationStore'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

const MapsScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationSotre()

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (lastKnownLocation === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View>
      <CustomMap initialLocation={lastKnownLocation} />
    </View>
  )
}

export default MapsScreen
