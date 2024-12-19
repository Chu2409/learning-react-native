import { View, Text, ViewProps } from 'react-native'

interface Props extends ViewProps {
  className?: string

}


const ThemedCard = ({className, ...rest}: Props) => {
  return (
    <View className={`bg-white dark:bg-black/10 rounded-xl p-2 shadow shadow-black/5 ${className}`} {...rest} />

  )
}

export default ThemedCard