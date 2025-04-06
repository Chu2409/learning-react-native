import * as SecureStore from 'expo-secure-store'
import { Alert } from 'react-native'

export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo guardar la información de forma segura. Por favor, inténtelo de nuevo más tarde.',
      )
    }
  }

  static async getItem(key: string) {
    try {
      const value = await SecureStore.getItemAsync(key)
      return value
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo recuperar la información de forma segura. Por favor, inténtelo de nuevo más tarde.',
      )
      return null
    }
  }

  static async deleteItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo eliminar la información de forma segura. Por favor, inténtelo de nuevo más tarde.',
      )
    }
  }
}
