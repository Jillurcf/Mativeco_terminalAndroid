import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useDeviceContext } from 'twrnc';
import tw from '../lib/tailwind';
import LoadingSplash from '../screen/LoadingSplash';
import StripeAuthScreen from '../screen/auth/authenticationScreen';
import TapToPay from '../screen/tapToPay/TapToPay';
import ReceiptHistoryScreen from '../screen/ReceiptHistoryScree';
import Profile from '../screen/Profile';
import HomeScreen from '../screen/HomeScreen';
import DrawerRoute from './DrawerRoutes';
import AccountAndSecurity from '../screen/drawer/AccountAndSecurity';
import { SafeAreaView } from 'react-native-safe-area-context';
import Notification from '../screen/drawer/Notification';
import HowDoesAppWork from '../screen/drawer/HowDoesAppWork';
import TermsAndCondition from '../screen/drawer/TermsAndCondition';
import HelpSupport from '../screen/drawer/Help&Support';
import PrivacyPolicy from '../screen/drawer/PrivacyPolicy';
import UserFlowScreen from '../screen/drawer/UserFlowScreen';
import Receipt from '../screen/Receipts';
import ReceiptDetails from '../screen/ReceiptDetails';
import QrcodeScreen from '../screen/QrcodeScreen';
import PaymentSummery from '../screen/tapToPay/PaymentSummery';




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Routes() {
  const [partner, setPartner] = useState(false)
  useDeviceContext(tw);
  return (
    // <StripeProvider publishableKey="pk_test_51QKAtBKOpUtqOuW1x5VdNqH3vG7CZZl1P6V3VuV1qsRUmPLNk26i34AXeu2zCO3QurFJAOZ9zfb0EkWeCVhqBYgH008X41cXr6">
   <SafeAreaView style={{ flex: 1 }}>
     <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    // initialRouteName="LoadingSplash"
    >
      <Stack.Screen name="LoadingSplash" component={LoadingSplash}
      />
      <Stack.Screen name="Drawer" component={DrawerRoute} />
      {/*==================================== */}
      <Stack.Screen name="Authenticate" component={StripeAuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TapToPay" component={TapToPay} />
      {/* <Stack.Screen name="Receipts" component={ReceiptHistoryScreen} /> */}
      <Stack.Screen name="Receipts" component={Receipt} />
      <Stack.Screen name="ReceiptDetails" component={ReceiptDetails} />
      <Stack.Screen name="QrcodeScreen" component={QrcodeScreen} />
      <Stack.Screen name="PaymentSummery" component={PaymentSummery} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AccountAndSecurity" component={AccountAndSecurity} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="HowDoesAppWork" component={HowDoesAppWork} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="HelpAndSupport" component={HelpSupport} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="UserFlowScreen" component={UserFlowScreen} />
    </Stack.Navigator>
   </SafeAreaView>
    // </StripeProvider>
  );
}
