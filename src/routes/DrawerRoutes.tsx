import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Image,
  Platform,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from '../lib/tailwind';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import BottomRoutes from './BottomsRotues';
import { IconAppWork, IconBack, IconLogout, IconNotification, IconPrivacyPolicy, IconSupport, IconTermsAndCondition } from '../assets/icon/icon';
import NormalModal from '../components/NormalModal';
import Button from '../components/Button';
import { DrawerItem } from '../components/DrawerItem';
import { SafeAreaView } from 'react-native-safe-area-context';


// Shared DrawerItem label style
const drawerLabelStyle = {
  color: '#01503B',
  fontFamily: 'Roboto-Bold',
  fontSize: 18,
}

function DrawerContent({ navigation, route }: any) {
  console.log("route 21 +++++++++++++", route)
  const [vacationMode, setVacationMode] = useState(true);
  const [logoutConfirmationModalVisible, setLogoutConfirmationModalVisible] =
    useState(false);

  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <SafeAreaView 
     style={[
    tw`flex-1`,
    // Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight } : {},
  ]}
  edges={['top', 'left', 'right']}
    >
      <View style={tw` px-4 h-full justify-between rounded-xl ${isDark ? "bg-secondary" : "bg-secondary"} `}>
        <View style={tw`rounded-lg`}>
          <View style={tw`flex-row justify-end`}>
            <View style={tw` w-10 h-10 rounded-full flex-row justify-center items-center`}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw`flex-row justify-end`}>
                <SvgXml xml={IconBack} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`mt-6 gap-y-12`}>
            <DrawerItem
              icon={IconAppWork}
              label="How does the app work?"
              onPress={() => navigation?.navigate('HowDoesAppWork')}
              labelStyle={drawerLabelStyle}
            />
            <DrawerItem
              icon={IconTermsAndCondition}
              label="Terms & Conditions"
              labelStyle={drawerLabelStyle}
              onPress={() => navigation?.navigate('TermsAndCondition')}
            />
            <DrawerItem
              icon={IconPrivacyPolicy}
              label="Privacy Policy"
              labelStyle={drawerLabelStyle}
              onPress={() => navigation?.navigate('PrivacyPolicy')}
            />
            <DrawerItem
              icon={IconSupport}
              label="Help & Support"
              labelStyle={drawerLabelStyle}
              onPress={() => navigation?.navigate('HelpAndSupport')}
            />

            <TouchableOpacity
              style={tw`flex-row items-center gap-4 px-[4%]`}
              onPress={() => {
                console.log("Pressed"); // For debugging
                setLogoutConfirmationModalVisible(true);
              }}
            >
              <SvgXml xml={IconLogout} />
              <Text style={tw`text-red-500 text-lg font-bold`}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <NormalModal
          layerContainerStyle={tw`flex-1 justify-end animate-bounce`} // Ensure modal content aligns at the bottom
          containerStyle={tw`bg-secondary shadow-lg rounded-t-2xl p-6`} // Styling the modal itself
          visible={logoutConfirmationModalVisible}
          setVisible={setLogoutConfirmationModalVisible}
        >
          <View>
            <View style={tw`flex-row justify-center mb-4`}>
              <Image
                resizeMethod='resize'
                resizeMode='cover'
                style={tw`w-[80px]  h-[80px]`} source={require('../assets/images/logo.png')} />
            </View>
            <Text style={tw`text-black text-lg text-center font-RobotoRegular mb-2`}>
              Sure you want to log out?
            </Text>

            <View style={tw`mt-2`}>
              <View style={tw` w-full`}>
                <Button
                  title="Yes, Log Out"
                  style={tw`text-white font-RobotoRegular`}
                  containerStyle={tw`bg-primary px-6`}
                  onPress={() => {
                    navigation?.navigate('Authenticate');
                    setLogoutConfirmationModalVisible(false);
                  }}
                />
              </View>
              <View style={tw` mt-2`}>
                <Button
                  title="No"
                  style={tw`text-black px-6 font-RobotoRegular`}
                  containerStyle={tw`bg-green-700`}
                  onPress={() => {
                    setLogoutConfirmationModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </NormalModal>
      </View>
    </SafeAreaView>
  );
}

function DrawerRoute() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        drawerStyle: tw`rounded-lg`,
      }}
      drawerContent={(props) => <DrawerContent {...props} />} // ✅ props passed correctly
    >
      <Drawer.Screen name="BottomRoutes" component={BottomRoutes} />
    </Drawer.Navigator>
  );
}

export default DrawerRoute;
