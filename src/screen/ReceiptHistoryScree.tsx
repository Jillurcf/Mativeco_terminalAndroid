import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { IconBack } from '../assets/icon/icon'; // Adjust path accordingly
import tw from '../lib/tailwind';


const ReceiptHistoryScreen = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <ScrollView style={tw`flex-1 bg-secondary p-4`}>
      <View style={tw`mt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>

        {/* Search */}
        <TextInput
          placeholder="Search by Transaction ID"
          placeholderTextColor="#01503B"
          style={tw`border border-[#01503B] p-3 rounded-xl my-4`}
        />

        {/* Date Range */}
        <Text style={tw`text-gray-600 mb-1`}>Date Range</Text>
        <View style={tw`flex-row justify-between mb-4`}>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={tw`flex-1 border border-gray-300 p-3 rounded-xl mr-2 flex-row justify-between`}
          >
            <Text>{startDate.toLocaleDateString()}</Text>
            {/* <MaterialIcons name="calendar-today" size={20} /> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={tw`flex-1 border border-gray-300 p-3 rounded-xl ml-2 flex-row justify-between`}
          >
            <Text>{endDate.toLocaleDateString()}</Text>
            {/* <MaterialIcons name="calendar-today" size={20} /> */}
          </TouchableOpacity>
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartDate(selectedDate);
            }}
          />
        )}
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndDate(selectedDate);
            }}
          />
        )}

        {/* Status Dropdown */}
        <Text style={tw`text-gray-600 mb-1`}>Status</Text>
        <TouchableOpacity style={tw`border border-gray-300 p-3 rounded-xl flex-row justify-between mb-4`}>
          <Text>All Statuses</Text>
          {/* <Ionicons name="chevron-down" size={20} /> */}
        </TouchableOpacity>

        {/* Amount Range */}
        <Text style={tw`text-gray-600 mb-1`}>Amount</Text>
        <View style={tw`flex-row justify-between mb-4`}>
          <TextInput
            placeholder="Min"
            keyboardType="numeric"
            style={tw`flex-1 border border-gray-300 p-3 rounded-xl mr-2`}
          />
          <TextInput
            placeholder="Max"
            keyboardType="numeric"
            style={tw`flex-1 border border-gray-300 p-3 rounded-xl ml-2`}
          />
        </View>

        {/* Card */}
        <View style={tw`bg-white rounded-2xl p-4 shadow-md flex-row justify-between items-center`}>
          <View>
            <Text style={tw`text-gray-500 mb-1`}>Date: January 12, 2025</Text>
            <Text style={tw`font-bold`}>Transaction ID: TX-T7XXJI</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            {/* <MaterialIcons name="check-box" size={28} color="green" style={{ marginRight: 8 }} />
          <Ionicons name="chevron-forward" size={24} /> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReceiptHistoryScreen;
