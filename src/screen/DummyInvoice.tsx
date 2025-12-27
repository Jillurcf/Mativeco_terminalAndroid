import { IconBack } from '@/src/assets/icon/icon';
import tw from '@/src/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const DummyInvoice = () => {
    const { width } = Dimensions.get('screen');

    return (
        <ScrollView contentContainerStyle={tw`flex-grow p-4`} style={tw`bg-white`}>
            <TouchableOpacity
            onPress={()=> router.back()}
            >
                <SvgXml xml={IconBack} />
            </TouchableOpacity>

            <View style={tw`flex-1 items-center mt-12`}>
                <Image
                resizeMethod='resize'
                resizeMode='cover'
                    source={require('../../assets/images/invoice.png')}
                
                    style={{ width: width, height: undefined, aspectRatio: 1 }}
                />
            </View>
        </ScrollView>
    )
}

export default DummyInvoice
