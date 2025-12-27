import { Image, StatusBar, StyleSheet, View } from 'react-native';
// import {getSocket, initiateSocket} from '../../redux/services/socket';

import React, { useEffect } from 'react';

// import {NavigProps} from '../../interfaces/NaviProps';
// import { getStorageToken, lStorage } from '../utils/utils';
import tw from '../lib/tailwind';
import { useNavigation } from '@react-navigation/native';
// import { useLazyGetCheckTokenQuery } from '../redux/apiSlices/authSlice';


// import { usePostCheckTokenMutation } from '../redux/apiSlice/authSlice';
// import { lStorage } from '../utils';
// import {getStorageToken} from '../../utils/utils';

const LoadingSplash = () => {
 
//   const [postCheckToken, { data, error, isLoading }] = usePostCheckTokenMutation()
//  const token = lStorage.getString("token")

 
const navigation = useNavigation();

 useEffect(() => {
  //  const task = InteractionManager.runAfterInteractions(async () => {

  //    try {
  //      const res = await postCheckToken(token);
  //      console.log(res, 'res after sending');
  //      if (res?.data?.success === true) {
  //        router.replace('/(drawer)/(tab)');
  //      } else {
  //       router.replace('/screens/auth/onboarding1');
  //      }
  //    } catch (err) {
  //      router.replace('/screens/auth/onboarding1');
  //    }
  //  });

  //  return () => task.cancel();

  const timer = setTimeout(()=> {
 navigation.replace('UserFlowScreen')

    // router.replace('/(drawer)/(tab)')
    return ()=> timer
  }, 1000)
 }, []);


  return (
    <View style={tw`flex-1 w-full bg-secondary justify-center items-center`}>
      <Image
      resizeMethod='resize' 
      resizeMode='cover'
        style={tw`w-28 h-28 overflow-hidden`}
        
        // resizeMode={FastImage.resizeMode.contain}
        source={require('../assets/images/logo.png')}
      />
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
