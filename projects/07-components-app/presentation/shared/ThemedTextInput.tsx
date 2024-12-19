import { View, Text, TextInputProps, TextInput } from "react-native";

interface Props extends TextInputProps {
  className?: string;
}

const ThemedTextInput = ({ className, ...rest }: Props) => {
  return (
    <TextInput
      {...rest}
      className={`py-4 px-2 text-black dark:text-white ${className}`}
      placeholderTextColor="gray"
    />
  );
};

export default ThemedTextInput;
