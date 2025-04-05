import { LatLng } from '@/infrastructure/interfaces/lat-lng'
import { useLocationSotre } from '@/presentation/store/useLocationStore'
import { useEffect, useRef, useState } from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'
import MapView, { Polyline } from 'react-native-maps'
import FAB from '../shared/FAB'

interface Props extends ViewProps {
  initialLocation: LatLng
  showUserLocation?: boolean
}

const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const mapRef = useRef<MapView>(null)
  const [isFollowingUser, setIsFollowingUser] = useState(true)
  const [isShowingPolyline, setIsShowingPolyline] = useState(true)

  const {
    userLocationList,
    watchLocation,
    clearWatchLocation,
    lastKnownLocation,
    getLocation,
  } = useLocationSotre()

  useEffect(() => {
    watchLocation()

    return () => {
      clearWatchLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation)
    }
  }, [lastKnownLocation, isFollowingUser])

  const moveCameraToLocation = (location: LatLng) => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: location,
      })
    }
  }

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation)
    } else {
      moveCameraToLocation(lastKnownLocation)
    }

    const location = await getLocation()
    if (!location) return

    moveCameraToLocation(location)
  }

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        showsUserLocation={showUserLocation}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isShowingPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor='black'
            strokeWidth={3}
          />
        )}
      </MapView>

      <FAB
        iconName={isShowingPolyline ? 'eye-off-outline' : 'eye-outline'}
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
        style={{
          bottom: 140,
          right: 20,
        }}
      />

      <FAB
        iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{
          bottom: 80,
          right: 20,
        }}
      />

      <FAB
        iconName='compass-outline'
        onPress={moveToCurrentLocation}
        style={{
          bottom: 20,
          right: 20,
        }}
      />
    </View>
  )
}

export default CustomMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
