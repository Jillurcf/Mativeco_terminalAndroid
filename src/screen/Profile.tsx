
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { IconDrawer, IconPlus } from '../assets/icon/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {}

const Profile = (props: Props) => {
  const [imageUri, setImageUri] = useState()
  const navigation = useNavigation();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  // console.log(user?.name, "user+++++++=")

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
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`bg-secondary flex-1 p-[4%] `}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}
            style={tw``}>
            <SvgXml color={"white"} xml={IconDrawer} />

          </TouchableOpacity>
          <Text style={tw`text-primary text-[30px] font-RobotoBold`}>Profile</Text>
          <View></View>
        </View>
        <View style={tw`flex-1 items-center justify-center h-[80%]`}>
          <TouchableOpacity
          //  onPress={selectImage}
          >
            <View style={tw`relative`}>
              <View
                style={tw`w-18 h-18 bg-gray-400 rounded-full overflow-hidden mx-auto justify-center items-center`}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={tw`w-full h-full`}
                    resizeMode="cover"
                    resizeMethod='resize'
                  />
                ) : <Image
                  source={{ uri: imageUri }}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                  resizeMethod='resize'
                />}


              </View>
              <View style={tw`absolute bottom-0 right-0 bg-gray-200 rounded-full p-2`}>
                <SvgXml xml={IconPlus} width={16} height={16} />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={tw`text-center text-primary font-RobotoBlack mt-2`}>{user?.name}</Text>
          <Text style={tw`text-center text-primary font-RobotoBlack mt-2`}>{user?.email}</Text>
          {/* <Text style={tw`text-center text-primary font-RobotoBlack mt-2`}>{user?.bank_account}</Text> */}
        </View>
        <StatusBar translucent={false} />
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})