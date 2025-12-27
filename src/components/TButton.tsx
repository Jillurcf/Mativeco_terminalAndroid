import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';

interface IButton {
  containerStyle?: {};
  titleStyle?: {};
  title?: string;
  isLoading?: boolean;
  onPress?: () => void;
  disabled?: boolean; // Disabled prop to control if the button is disabled
}

const TButton = ({
  containerStyle,
  title,
  titleStyle,
  isLoading,
  onPress,
  disabled = false, // Default disabled to false
}: IButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled} // Disable the button when isLoading or disabled is true
      activeOpacity={0.5}
      style={[
        // Apply gray background when disabled
        tw`py-4 px-3 flex-row justify-center gap-3 rounded-2xl w-36`,
        disabled || isLoading ? tw`bg-gray-300` : tw`bg-[#003CFF]`, // Change to gray if disabled or loading
        containerStyle,
      ]}
    >
      {isLoading && <ActivityIndicator />}
      {title && <Text style={[tw`text-white font-semibold`, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default TButton;

const styles = StyleSheet.create({});
