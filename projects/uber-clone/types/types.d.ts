import { TextInputProps, TouchableOpacityProps } from 'react-native'

declare interface Driver {
  driver_id: number
  first_name: string
  last_name: string
  profile_image_url: string
  car_image_url: string
  car_seats: number
  rating: number
}

declare interface MarkerData {
  latitude: number
  longitude: number
  id: number
  title: string
  profile_image_url: string
  car_image_url: string
  car_seats: number
  rating: number
  first_name: string
  last_name: string
  time?: number
  price?: string
}

declare interface MapProps {
  destinationLatitude?: number
  destinationLongitude?: number
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void
  selectedDriver?: number | null
  onMapReady?: () => void
}

declare interface Ride {
  ride_id: number
  origin_address: string
  destination_address: string
  origin_latitude: number
  origin_longitude: number
  destination_latitude: number
  destination_longitude: number
  ride_time: number
  fare_price: number
  payment_status: string
  driver_id: number
  user_id: number
  user_email: string
  created_at: string
  driver: Driver
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string
  bgVariant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success'
  textVariant?: 'primary' | 'default' | 'secondary' | 'danger' | 'success'
  IconLeft?: React.ComponentType<any>
  IconRight?: React.ComponentType<any>
  className?: string
}

declare interface GoogleInputProps {
  icon?: string
  initialLocation?: string
  containerStyle?: string
  textInputBackgroundColor?: string
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) => void
}

declare interface AddressSearchInputProps {
  icon?: string | any // Icono opcional, puede ser una URL o un recurso local
  initialLocation?: string // Texto inicial en el input
  containerStyle?: string // Clases de estilo personalizadas para el contenedor
  textInputBackgroundColor?: string // Color de fondo del TextInput
  handlePress: (location: {
    latitude: number
    longitude: number
    address: string
  }) => void // Callback que se ejecuta cuando el usuario selecciona una dirección
}

declare interface InputFieldProps extends TextInputProps {
  label: string
  icon?: any
  secureTextEntry?: boolean
  labelStyle?: string
  containerStyle?: string
  inputStyle?: string
  iconStyle?: string
  className?: string
}

declare interface PaymentProps {
  fullName: string
  email: string
  amount: string
  driverId: number
  rideTime: number
}

declare interface LocationStore {
  userLatitude: number | null
  userLongitude: number | null
  userAddress: string | null
  destinationLatitude: number | null
  destinationLongitude: number | null
  destinationAddress: string | null
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) => void
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) => void
}

declare interface DriverStore {
  drivers: MarkerData[]
  selectedDriver: number | null
  setSelectedDriver: (driverId: number) => void
  setDrivers: (drivers: MarkerData[]) => void
  clearSelectedDriver: () => void
}

declare interface DriverCardProps {
  item: MarkerData
  selected: number
  setSelected: () => void
}

export interface NominatimPlace {
  address: Address
  addresstype: string
  boundingbox: string[]
  class: string
  display_name: string
  importance: number
  lat: string
  licence: string
  lon: string
  name: string
  osm_id: number
  osm_type: string
  place_id: number
  place_rank: number
  type: string
}

export interface Address {
  'ISO3166-2-lvl4': string
  country: string
  country_code: string
  county: string
  state: string
  municipality?: string
  city_district?: string
  state_district?: string
}
