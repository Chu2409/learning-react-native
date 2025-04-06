import { ThemedText } from '@/presentation/theme/components/ThemedText'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { Ionicons } from '@expo/vector-icons'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { router } from 'expo-router'
import { useRef, useState } from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import { useCameraStore } from '@/presentation/store/useCameraStore'
import * as ImagePicker from 'expo-image-picker'

const CameraScreen = () => {
  const { addSelectedImage } = useCameraStore()

  const [facing, setFacing] = useState<CameraType>('back')
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediapermission, requestMediaPermission] =
    MediaLibrary.usePermissions()

  const [selectedImage, setSelectedImage] = useState<string>()

  const cameraRef = useRef<CameraView>(null)

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } = await requestCameraPermission()
      if (cameraPermissionStatus !== 'granted') {
        Alert.alert('Lo siento', 'Necesitas permitir el acceso a la cámara.')
        return
      }

      const { status: mediaPermissionStatus } = await requestMediaPermission()
      if (mediaPermissionStatus !== 'granted') {
        Alert.alert('Lo siento', 'Necesitas permitir el acceso a la galería.')
        return
      }
    } catch (error) {
      console.log('Error requesting permissions:', error)
      Alert.alert(
        'Error',
        'No se pudieron solicitar los permisos de la cámara.',
      )
    }
  }

  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          ...styles.container,
          marginHorizontal: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.message}>
          Necesitas permitir el acceso a la cámara y la galería para usar esta
          función.
        </Text>

        <TouchableOpacity onPress={onRequestPermissions}>
          <ThemedText type='subtitle' style={styles.message}>
            Solicitar permisos de cámara
          </ThemedText>
        </TouchableOpacity>
      </View>
    )
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    })

    console.log('Picture taken:', picture)

    if (!picture?.uri) return

    setSelectedImage(picture.uri)
  }

  const onReturnCancel = () => {
    router.dismiss()
  }

  const onPictureConfirm = async () => {
    if (!selectedImage) return
    await MediaLibrary.createAssetAsync(selectedImage!)

    addSelectedImage(selectedImage)

    router.dismiss()
  }

  const onRetakePicture = () => {
    setSelectedImage(undefined)
  }

  const onPickImages = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    })

    if (result.canceled) return

    result.assets.forEach((asset) => {
      addSelectedImage(asset.uri)
    })

    router.dismiss()
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />

        <ConfirmImageButton onPress={onPictureConfirm} />

        <RetakeImageButton onPress={onRetakePicture} />

        <ReturnCancelButton onPress={onReturnCancel} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <ShutterButton onPress={onShutterButtonPress} />

        <FlipCameraButton onPress={toggleCameraFacing} />

        <GalleryButton onPress={onPickImages} />

        <ReturnCancelButton onPress={onReturnCancel} />
      </CameraView>
    </View>
  )
}

export default CameraScreen

const ShutterButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions()
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: 'absolute',
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    ></TouchableOpacity>
  )
}

const ConfirmImageButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions()
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: 'absolute',
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    >
      <Ionicons name='checkmark-outline' size={30} color={primaryColor} />
    </TouchableOpacity>
  )
}

const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name='close-outline' size={30} color='white' />
    </TouchableOpacity>
  )
}

const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name='camera-reverse-outline' size={30} color='white' />
    </TouchableOpacity>
  )
}

const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
      <Ionicons name='images-outline' size={30} color='white' />
    </TouchableOpacity>
  )
}

const ReturnCancelButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
      <Ionicons name='arrow-back-outline' size={30} color='white' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    top: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
