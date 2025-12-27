import { IconBack, IconPaymentSuccess } from '@/src/assets/icon/icon'
import TButton from '@/src/components/TButton'
import tw from '@/src/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

type Props = {}

const PaymentSuccessScreen = (props: Props) => {
    return (
        <View style={tw`flex-1 bg-white p-[4%]`}>
            <TouchableOpacity onPress={() => router.back()}>
                <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <View style={tw`flex-col justify-between h-[95%]`}>
                <View style={tw`items-center mt-8`}>
                    <SvgXml xml={IconPaymentSuccess} />
                    <Text style={tw`text-black font-RobotoBold text-[28px]`}>Payment Successful! </Text>
                    <Text style={tw`text-black font-RobotoRegular text-xl`}>$101.77 charged</Text>
                    {/* Card 2 */}
                    <View style={tw`bg-white rounded-xl p-4-2 w-full shadow-lg mt-8`}>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg`}>Total amount:</Text>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg font-bold`}>$50</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg`}>Platform Fee:</Text>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg font-bold`}>$50</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg`}>Stripe Fee (1.4% + $0.25):</Text>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg font-bold`}>$50</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg`}>Total Charged:</Text>
                            <Text style={tw`text-center text-[#5E5E5E] text-lg font-bold`}>$50</Text>
                        </View>
                    </View>
                </View>


                
                <View>
                    <TButton onPress={() => router.push('/screen/tapToPay/PaymentSummery')} containerStyle={tw`bg-black w-full`} title='Done' />
                </View>
            </View>
            <StatusBar translucent={false} />
        </View>
    )
}

export default PaymentSuccessScreen

const styles = StyleSheet.create({})