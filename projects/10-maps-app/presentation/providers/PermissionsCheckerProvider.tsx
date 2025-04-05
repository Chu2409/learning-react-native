import { PropsWithChildren, useEffect } from 'react'
import { usePermissionsStore } from '../store/usePermissions'
import { PermissionStatus } from '@/infrastructure/interfaces/location'
import { router } from 'expo-router'
import { AppState } from 'react-native'

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore()

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace('/map')
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace('/permissions')
    }
  }, [locationStatus])

  useEffect(() => {
    checkLocationPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkLocationPermission()
      }
    })

    return () => {
      subscription.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default PermissionsCheckerProvider
