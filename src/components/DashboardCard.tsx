import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

const DashboardCard = ({ iconName, iconColor, label, value, percent }: any) => {
  return (
    <View style={tw`bg-white rounded-2xl items-center  m-1 p-2 w-[47%] shadow`}>
     
        <Ionicons name={iconName} size={25} color={iconColor} />
        <Text style={tw`ml-2 text-gray-700 mt-4 font-semibold`}>{label}</Text>
   
      <Text style={tw`text-xl mt-2 font-bold`}>{value}</Text>
      <View style={tw`flex-row items-center mt-1`}>
        <Ionicons name="trending-up" size={16} color="green" />
        <Text style={tw`text-green-600 text-xs ml-1`}>{percent} from last month</Text>
      </View>
    </View>
  );
};

export default DashboardCard;
