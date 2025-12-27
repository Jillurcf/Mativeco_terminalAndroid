// import { useNavigation, DrawerActions } from 'expo-router'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
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

  const [user, setUser] = React.useState<any>(null);
  console.log(user?.name, "user+++++++=")

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
                  <Text style={tw`text-center font-RobotoRegular text-primary text-2xl font-bold`}>$100</Text>
                </View>

                {/* Card 2 */}
                <View style={tw`bg-secondary rounded-xl p-4 ml-2 w-40 shadow-lg`}>
                  <Text style={tw`text-center font-RobotoRegular text-primary text-sm`}>Last Payment Amount</Text>
                  <Text style={tw`text-center font-RobotoRegular text-primary text-2xl font-bold`}>$50</Text>
                </View>
              </View>

              {/* Bottom Card */}
              <View style={tw`bg-secondary rounded-xl p-4 w-40 shadow-lg`}>
                <Text style={tw`text-center text-primary font-RobotoRegular text-sm`}>Total Payments{'\n'}This Month</Text>
                <Text style={tw`text-center font-RobotoRegular text-primary text-2xl font-bold`}>$15,000</Text>
              </View>
            </View>
          </View>
          <View>
            <TButton onPress={() => navigation?.navigate('TapToPay')} containerStyle={tw`bg-primary w-full`} titleStyle={tw`font-RobotoBold text-secondary`} title='Tap to Pay on iPhone' />
          </View>
        </View>
        <StatusBar backgroundColor='#01503B' translucent={false} />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})