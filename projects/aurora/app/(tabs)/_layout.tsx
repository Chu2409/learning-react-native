import { Image } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import { colors } from '@/constants/colors'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary.DEFAULT,
        tabBarInactiveTintColor: colors.gray[100],
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 1,
          borderColor: colors.black[200],
          height: 60,
          paddingTop: 3,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.home}
              resizeMode='contain'
              tintColor={color}
              className='w-6 h-6'
            />
          ),
        }}
      />

      <Tabs.Screen
        name='bookmark'
        options={{
          title: 'Guardado',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.bookmark}
              resizeMode='contain'
              tintColor={color}
              className='w-6 h-6'
            />
          ),
        }}
      />

      <Tabs.Screen
        name='create'
        options={{
          title: 'Crear',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.plus}
              resizeMode='contain'
              tintColor={color}
              className='w-6 h-6'
            />
          ),
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.profile}
              resizeMode='contain'
              tintColor={color}
              className='w-6 h-6'
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
