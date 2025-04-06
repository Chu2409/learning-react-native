import { Ionicons } from '@expo/vector-icons'
import { Text, Pressable, PressableProps, StyleSheet } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor'

interface Props extends PressableProps {
  children: string
  icon?: keyof typeof Ionicons.glyphMap
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, 'primary')

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? primaryColor + '90' : primaryColor,
        },
      ]}
      {...rest}
    >
      <Text style={{ color: 'white' }} numberOfLines={1}>
        {children}
      </Text>

      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={'white'}
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Pressable>
  )
}

export default ThemedButton

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
