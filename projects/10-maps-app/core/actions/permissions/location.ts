import { PermissionStatus } from '@/infrastructure/interfaces/location'
import * as Location from 'expo-location'
import { Alert, Linking } from 'react-native'

export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      if (status === 'denied') {
        manualPermissionRequest()
      }

      manualPermissionRequest()
      return PermissionStatus.DENIED
    }

    return PermissionStatus.GRANTED
  }

export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync()

  switch (status) {
    case 'granted':
      return PermissionStatus.GRANTED
    case 'denied':
      return PermissionStatus.DENIED
    default:
      return PermissionStatus.UNDETERMINED
  }
}

export const manualPermissionRequest = async () => {
  Alert.alert(
    'Permisos de ubicación necesario',
    'Para poder usar la aplicación, es necesario habilitar los permisos de ubicación.',
    [
      {
        text: 'Abrir ajustes',
        onPress: () => {
          Linking.openSettings()
        },
      },
      {
        text: 'Cancelar',
        style: 'destructive',
      },
    ],
  )
}
