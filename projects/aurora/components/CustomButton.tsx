import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({
  title,
  handlePress,
  className,
  textStyles,
  isLoading,
}: {
  title: string
  handlePress: () => void
  className?: string
  textStyles?: string
  isLoading?: boolean
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[58px] justify-center items-center ${isLoading ? 'opacity-50' : ''} ${className}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
