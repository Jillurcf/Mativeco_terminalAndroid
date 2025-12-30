
// import { useNavigation, DrawerActions } from 'expo-router'
import { DrawerActions, useNavigation } from '@react-navigation/native'



import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from '../lib/tailwind'
import { IconDrawer } from '../assets/icon/icon'
import TButton from '../components/TButton'
import AsyncStorage from '@react-native-async-storage/async-storage'



type Props = {}

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const id = route?.params;
  console.log(id, "id from HomeScreen")
 const [user, setUser] = useState<any>(null);
 const [homeData, setHomeData] = React.useState()
  console.log(homeData, "user+++++++=")

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('AUTH_TOKEN');
        const user = await AsyncStorage.getItem('USER_INFO');
        // setUser(user);
        if (token && user) {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
          // console.log('🔐 Token:', token);
          // console.log('👤 User:', parsedUser);

          // OPTIONAL: set state if you want
          // setAuthToken(token);
          // setUser(parsedUser);

          // OPTIONAL: navigate automatically
          // navigation.navigate('Drawer', {
          //   id: parsedUser.stripe_account_id,
          // });
        } else {
          console.log('ℹ️ No user found in storage');
        }
      } catch (error) {
        console.log('❌ Failed to load user from storage', error);
      }
    };

    loadUserFromStorage();
  }, []);

  console.log(user?.stripe_account_id, "user+++++++=")
const merchant_id = user?.stripe_account_id;

const fetchPayments = async () => {
    if (!user?.stripe_account_id) {
      console.log('❌ Merchant ID missing');
      return;
    }

  

    const url = `http://103.186.20.114:8084/api/get-dashboard-data?merchant_id=${merchant_id}`;

    console.log('🌍 Fetching:', url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('📌 Response:', data);
      setHomeData(data?.data || []);
    } catch (error) {
      console.log('❌ API Error:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user?.stripe_account_id,]);


   return (
    <SafeAreaView style={tw`flex-1 bg-secondary `}>
      <View style={tw`flex-1 bg-secondary p-[4%] `}>
        <View style={tw`flex-col  justify-between h-full`}>
          <View>
            <View style={tw`flex-row justify-between mt-4`}>
              <TouchableOpacity
                onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}
                style={tw``}>
                <SvgXml color={"#01503B"} xml={IconDrawer} />

              </TouchableOpacity>
              <View style={tw` mt-12 items-center`}>
                <Image
                  resizeMethod='resize'
                  resizeMode='cover'
                  style={tw`w-[200px]  h-[200px]`} source={require('../assets/images/logo.png')} />
                <Text style={tw`text-primary font-RobotoBold text-3xl`}>{user?.name} 👋</Text>
              </View>
              <View style={tw``}>

              </View>
            </View>
            {/* <Text>index</Text> */}
            <View style={tw`mt-12 items-center justify-center bg-secondary`}>
              {/* Top Row */}
              <View style={tw`flex-row mb-4`}>
                {/* Card 1 */}
                <View style={tw`bg-secondary rounded-xl p-4 mr-2 w-40 shadow-lg`}>
                  <Text style={tw`text-center font-RobotoRegular text-primary text-sm`}>Today's Payment Account</Text>
                  <Text style={tw`text-center font-RobotoRegular text-primary text-2xl font-bold`}>€{homeData?.today_payment_account}</Text>
                </View>

                {/* Card 2 */}
                <View style={tw`bg-secondary rounded-xl p-4 ml-2 w-40 shadow-lg`}>
                  <Text style={tw`text-center font-RobotoRegular text-primary text-sm`}>Last Payment Amount</Text>
                  <Text style={tw`text-center font-RobotoRegular text-primary text-2xl font-bold`}>€{homeData?.last_payment_account}</Text>
                </View>
              </View>

              {/* Bottom Card */}
              <View style={tw`bg-secondary rounded-xl p-4 w-40 shadow-lg`}>
                <Text style={tw`text-center text-primary font-RobotoRegular text-sm`}>Total Payments{'\n'}This Month</Text>
                <Text style={tw`text-center font-RobotoRegular text-primary text-2xl font-bold`}>€{homeData?.total_payment_in_this_month}</Text>
              </View>
            </View>
          </View>
          <View>
            <TButton onPress={() => navigation?.navigate('TapToPay')} containerStyle={tw`bg-primary w-full`} titleStyle={tw`font-RobotoBold text-secondary`} title='Tap to Pay' />
          </View>
        </View>
        <StatusBar backgroundColor='#01503B' translucent={false} />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})