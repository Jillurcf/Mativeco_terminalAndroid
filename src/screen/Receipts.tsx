import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { IconDrawer, IconTick } from '../assets/icon/icon';
import useStoredUser from '../hook/useStoredUser';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Receipt = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1))); // Default to one month ago
  const [endDate, setEndDate] = useState(new Date()); // Default to today's date
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [payments, setPayments] = useState([]);
  const navigation = useNavigation();
  const { user } = useStoredUser();

  // ---- Format Date: YYYY-MM-DD ----
  const formatDate = (date) => {
    // Check if date is valid and format accordingly
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  };

  // Fetching Payments API
  const fetchPayments = async () => {
    if (!user?.stripe_account_id) {
      console.log('❌ Merchant ID missing');
      return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const url = `http://103.186.20.114:8084/api/get-payments?merchant_id=${user?.stripe_account_id}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&amount_min=${minAmount}&amount_max=${maxAmount}&page=1&per_page=10`;

    console.log('🌍 Fetching:', url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('📌 Response:', data);
      setPayments(data?.data || []);
    } catch (error) {
      console.log('❌ API Error:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user?.stripe_account_id, startDate, endDate, minAmount, maxAmount]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ReceiptDetails', { id: item?.id }) // optional navigation params
        }
        style={tw`bg-primary rounded-2xl p-4 mb-4 shadow-lg shadow-primary flex-row justify-between items-center`}
      >
        <View>
          <Text style={tw`text-white mb-1`}>Date: {item?.created_at.slice(0,10)}</Text>
          <Text style={tw`font-bold text-xs text-secondary`}>
            Transaction ID: {item?.transaction_id}
          </Text>
        </View>

        <View style={tw`flex-row gap-3 items-center`}>
          <SvgXml xml={IconTick} />
        </View>
      </TouchableOpacity>
    );
  };


  
  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <ScrollView style={tw`p-4 bg-secondary flex-1`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}
            style={tw``}>
            <SvgXml color={'white'} xml={IconDrawer} />
          </TouchableOpacity>
          <Text style={tw`text-primary text-[30px] font-RobotoBold`}>Receipts history</Text>
          <View></View>
        </View>

        {/* Date Range */}
        <Text style={tw`text-primary mb-1`}>Date Range</Text>
         <View style={tw`w-full flex-row mb-4`}>
          <TextInput
            placeholder="(YYYY-MM-DD)"
            style={tw`flex-1 border border-primary p-3 rounded-xl mr-2 text-black`}
            keyboardType="default"
            placeholderTextColor="#01503B"
            value={startDate}
            // defaultValue={startDate}
            onChangeText={(text)=> setStartDate(text)}
          />
          <TextInput
            placeholder="(YYYY-MM-DD)"
            style={tw`flex-1 border border-primary p-3 rounded-xl ml-2 text-black`}
            keyboardType="default"
            placeholderTextColor="#01503B"
            value={endDate}
            onChangeText={(text)=>setEndDate(text)}
          />
        </View>


        {/* Amount Range */}
        <Text style={tw`text-primary mb-1`}>Amount Range</Text>
        <View style={tw`flex-row justify-between mb-4`}>
          <TextInput
            placeholder="Min"
            style={tw`flex-1 border border-primary p-3 rounded-xl mr-2 text-black`}
            keyboardType="numeric"
            placeholderTextColor="#01503B"
            value={minAmount}
            onChangeText={setMinAmount}
          />
          <TextInput
            placeholder="Max"
            style={tw`flex-1 border border-primary p-3 rounded-xl ml-2 text-black`}
            keyboardType="numeric"
            placeholderTextColor="#01503B"
            value={maxAmount}
            onChangeText={setMaxAmount}
          />
        </View>

        {/* Payment List */}
        <FlatList
          data={payments?.data || []} // Ensure data is defined
          renderItem={renderItem}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()} // Ensure unique key
          showsVerticalScrollIndicator={false}
        />
        <StatusBar translucent={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Receipt;
