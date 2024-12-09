import { icons } from '@/constants'
import { useFetch } from '@/lib/fetch'
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
  getRouteCoordinates,
} from '@/lib/map'
import { useDriverStore, useLocationStore } from '@/store'
import { Driver, MarkerData } from '@/types/types'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps'

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore()
  const { selectedDriver, setDrivers } = useDriverStore()

  const { data: drivers, loading, error } = useFetch<Driver[]>('/(api)/driver')
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [routeCoordinates, setRouteCoordinates] = useState([])

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      })

      setMarkers(newMarkers)
    }
  }, [drivers, userLatitude, userLongitude])

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude != null &&
      destinationLongitude != null
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, destinationLatitude, destinationLongitude])

  useEffect(() => {
    if (
      userLatitude &&
      userLongitude &&
      destinationLatitude &&
      destinationLongitude
    ) {
      const fetchRoute = async () => {
        const coordinates = await getRouteCoordinates({
          startLatitude: userLatitude,
          startLongitude: userLongitude,
          endLatitude: destinationLatitude,
          endLongitude: destinationLongitude,
        })
        setRouteCoordinates(coordinates)
      }

      fetchRoute()
    }
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude])

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  })

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className='flex justify-between items-center w-full'>
        <ActivityIndicator size='small' color='#000' />
      </View>
    )

  if (error)
    return (
      <View className='flex justify-between items-center w-full'>
        <Text>Error: {error}</Text>
      </View>
    )

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ width: '100%', height: '100%' }}
      tintColor='black'
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle='light'
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key='destination'
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title='Destination'
            image={icons.pin}
          />

          <Polyline
            coordinates={routeCoordinates}
            strokeColor='#0286FF'
            strokeWidth={3}
          />
        </>
      )}
    </MapView>
  )
}

export default Map
