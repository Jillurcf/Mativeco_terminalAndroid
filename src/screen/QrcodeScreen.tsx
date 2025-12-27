

import React from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';
import { IconBack } from '../assets/icon/icon';

const QrcodeScreen = ({ navigation }: { navigation: any }) => {
  const valueToEncode = 'https://yourexample.com/pay/txn123'; // You can customize this

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <View style={tw`flex-1 bg-secondary p-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>
        <View style={tw`items-center justify-center flex-1`}>
          <Text style={tw`text-xl text-primary font-bold mb-4`}>Scan this QR Code</Text>
          <View style={tw`bg-white p-4 rounded-lg shadow`}>
            <QRCode
              value={valueToEncode}
              size={200}
            />
          </View>
        </View>
        <StatusBar translucent={false} />
      </View>
    </SafeAreaView>
  );
};

export default QrcodeScreen;
