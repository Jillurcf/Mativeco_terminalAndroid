
import tw from '@/src/lib/tailwind';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { ParamListBase } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { IconDrawer } from '../assets/icon/icon';

export const CustomHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={tw`ml-4`}>
      <SvgXml xml={IconDrawer} width={24} height={24} />
    </TouchableOpacity>
  );
};
