import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import tw from '../lib/tailwind';


interface CustomInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const TextInput1: React.FC<CustomInputProps> = ({
  value,
  defaultValue,
  onChangeText,
  placeholder,
  multiline,
  numberOfLines,
  keyboardType = 'default',
  style,
  ...rest
}) => {
  return (
    <TextInput
      style={[tw`h-10 border border-gray-400 px-3 my-2 rounded`, style]}
      value={value}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      {...rest}
    />
  );
};

export default TextInput1;
