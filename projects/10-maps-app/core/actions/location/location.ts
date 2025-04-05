import { LatLng } from '@/infrastructure/interfaces/lat-lng'
import * as Location from 'expo-location'

export const getCurrentLocation = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    })

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Error getting location')
  }
}

export const watchCurrentPosition = async (
  locationCallback: (location: LatLng) => void,
) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10,
    },
    ({ coords }) => {
      locationCallback({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    },
  )
}
