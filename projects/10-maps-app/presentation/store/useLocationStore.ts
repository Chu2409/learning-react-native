import {
  getCurrentLocation,
  watchCurrentPosition,
} from '@/core/actions/location/location'
import { LatLng } from '@/infrastructure/interfaces/lat-lng'
import { LocationSubscription } from 'expo-location'
import { create } from 'zustand'

interface LocationState {
  lastKnownLocation: LatLng | null
  userLocationList: LatLng[]
  watchSubscriptionId: LocationSubscription | null

  getLocation: () => Promise<LatLng>
  watchLocation: () => Promise<void>
  clearWatchLocation: () => Promise<void>
}

export const useLocationSotre = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchSubscriptionId: null,

  getLocation: async () => {
    const location = await getCurrentLocation()
    set({ lastKnownLocation: location })
    return location
  },

  watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionId
    if (oldSubscription !== null) {
      get().clearWatchLocation()
    }

    const watchSubscription = await watchCurrentPosition((location) => {
      set((state) => ({
        lastKnownLocation: location,
        userLocationList: [...state.userLocationList, location],
      }))
    })

    set({ watchSubscriptionId: watchSubscription })
  },

  clearWatchLocation: async () => {
    const subscription = get().watchSubscriptionId
    if (subscription !== null) {
      subscription.remove()
      set({ watchSubscriptionId: null })
    }
  },
}))
