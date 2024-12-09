import { Driver, MarkerData } from '@/types/types'

const orsAPIKey = process.env.EXPO_PUBLIC_ORS_API_KEY

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[]
  userLatitude: number
  userLongitude: number
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01 // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01 // Random offset between -0.005 and 0.005

    return {
      id: driver.driver_id,
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    }
  })
}

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null
  userLongitude: number | null
  destinationLatitude?: number | null
  destinationLongitude?: number | null
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  }

  const minLat = Math.min(userLatitude, destinationLatitude)
  const maxLat = Math.max(userLatitude, destinationLatitude)
  const minLng = Math.min(userLongitude, destinationLongitude)
  const maxLng = Math.max(userLongitude, destinationLongitude)

  const latitudeDelta = (maxLat - minLat) * 1.3 // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3 // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2
  const longitude = (userLongitude + destinationLongitude) / 2

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }
}

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[]
  userLatitude: number | null
  userLongitude: number | null
  destinationLatitude: number | null
  destinationLongitude: number | null
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return

  try {
    const timesPromises = markers.map(async (marker) => {
      // URL para calcular la distancia del marcador al usuario
      const responseToUser = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${orsAPIKey}&start=${marker.longitude},${marker.latitude}&end=${userLongitude},${userLatitude}`,
      )
      const dataToUser = await responseToUser.json()
      const timeToUser = dataToUser.features[0].properties.segments[0].duration // Tiempo en segundos

      // URL para calcular la distancia del usuario al destino
      const responseToDestination = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${orsAPIKey}&start=${userLongitude},${userLatitude}&end=${destinationLongitude},${destinationLatitude}`,
      )

      const dataToDestination = await responseToDestination.json()

      const timeToDestination =
        dataToDestination.features[0].properties.segments[0].duration // Tiempo en segundos

      // Calcular el tiempo total y el precio
      const totalTime = (timeToUser + timeToDestination) / 60 // Total time in minutes
      const price = (totalTime * 0.5).toFixed(2) // Calcular el precio en base al tiempo

      return { ...marker, time: totalTime, price }
    })

    return await Promise.all(timesPromises)
  } catch (error) {
    console.error('Error calculating driver times:', error)
  }
}

export const getRouteCoordinates = async ({
  startLatitude,
  startLongitude,
  endLatitude,
  endLongitude,
}: {
  startLatitude: number
  startLongitude: number
  endLatitude: number
  endLongitude: number
}) => {
  const orsAPIKey = process.env.EXPO_PUBLIC_ORS_API_KEY

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${orsAPIKey}&start=${startLongitude},${startLatitude}&end=${endLongitude},${endLatitude}`,
    )

    const data = await response.json()
    const coordinates = data.features[0].geometry.coordinates

    // ORS devuelve [long, lat], pero react-native-maps usa [lat, long]
    const routeCoordinates = coordinates.map(
      ([longitude, latitude]: [number, number]) => ({
        latitude,
        longitude,
      }),
    )

    return routeCoordinates
  } catch (error) {
    console.error('Error fetching route:', error)
    return []
  }
}
