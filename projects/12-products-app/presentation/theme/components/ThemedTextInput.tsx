import {
  View,
  TextInputProps,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '../hooks/useThemeColor'
import { useRef, useState } from 'react'

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap
}

const ThemedTextInput = ({ icon, style, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, 'primary')
  const textColor = useThemeColor({}, 'text')

  const [isActive, setIsActive] = useState(false)
  const inputRef = useRef<TextInput>(null)

  return (
    <View
      style={[
        {
          ...styles.border,
          borderColor: isActive ? primaryColor : '#5c5c5c',
        },
        style as ViewStyle,
      ]}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={textColor}
          style={{ marginRight: 10, marginLeft: 5 }}
        />
      )}

      <TextInput
        ref={inputRef}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholderTextColor='#5c5c5c'
        style={{
          color: textColor,
          marginRight: 10,
          flex: 1,
        }}
        {...rest}
      />
    </View>
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
