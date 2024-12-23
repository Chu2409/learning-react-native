import { Pressable, PressableProps, Text } from 'react-native'

interface Props extends PressableProps {
  title: string
  containerStyles?: string
  textStyles?: string
}

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  disabled,
  ...rest
}: Props) => {
  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={onPress}
      className={`bg-secondary rounded-xl min-h-[58px] justify-center active:opacity-70 items-center ${disabled ? 'opacity-50' : ''} ${containerStyles}`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </Pressable>
  )
}

export default CustomButton
