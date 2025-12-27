import React from 'react';
import { TouchableOpacity, View, Text, TextStyle, StyleProp } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';

type Props = {
  icon: string;
  label: string;
  onPress: () => void;
  labelStyle?: StyleProp<TextStyle>; // ✅ allow inline style
  labelClassName?: string; // ✅ allow tailwind-based class too
};

export const DrawerItem = ({ icon, label, onPress, labelStyle, }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={tw`flex-row gap-4 items-center px-[4%] py-2`}>
      <SvgXml xml={icon} />
      <Text
        style={[tw`text-[#5E5E5E] text-lg font-RobotoBold`, labelStyle]}>
       
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);
