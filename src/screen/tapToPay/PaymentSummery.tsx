
import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from '../../lib/tailwind'
import { IconBack } from '../../assets/icon/icon'
import TButton from '../../components/TButton'

type Props = {}

const PaymentSummery = ({navigation}:{navigation:any}) => {
    return (
       <SafeAreaView style={tw`flex-1 bg-secondary`}>
         <View style={tw`bg-secondary flex-1 p-[4%]`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <SvgXml xml={IconBack} />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={tw`flex-col justify-between h-[95%]`}>
                <View style={tw`items-center mt-4`}>
                    <Text style={tw`text-primary font-RobotoBold text-[28px]`}>Payment Summary </Text>

                    {/* Card 2 */}
                    <View style={tw`bg-secondary rounded-xl p-4-2 w-full shadow-lg mt-8`}>
                        <Text style={tw`text-primary text-[28px] text-center font-RobotoBold`}>Receipt</Text>
                        <Text style={tw`text-[#1BAB1E] text-[38px] py-2 text-center font-RobotoBold`}>$101.77</Text>
                        <View>
                            <View style={tw`flex-row justify-between`}>
                                <Text style={tw`text-center text-primary text-lg`}>Transaction ID:</Text>
                                <Text style={tw`text-center text-primary text-lg font-bold`}>TX-T7XXJI</Text>
                            </View>
                            <View style={tw`flex-row justify-between mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Payment method:</Text>
                                <Text style={tw`text-center text-primary text-lg font-bold`}>NFC</Text>
                            </View>
                            <View style={tw`flex-row justify-between mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Date & time:</Text>
                                <Text style={tw`text-center text-primary text-lg font-bold`}>May 12, 2025</Text>
                            </View>
                            <View style={tw`flex-row justify-between mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Status:</Text>
                                <Text style={tw`text-center text-[#048506] text-lg font-bold`}>Completed</Text>
                            </View>

                        </View>
                        <View style={tw`border border-primary my-4`}></View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-center text-primary text-lg`}>Total amount:</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>$50</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-primary text-lg`}>Platform Fee:</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>$50</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-primary text-lg`}>Stripe Fee (1.4% + $0.25):</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>$50</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-primary text-lg`}>Total Charged:</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>$50</Text>
                        </View>

                    </View>
                </View>

                <View>
                    <TButton onPress={() => navigation.navigate('PaymentSummery')} containerStyle={tw`bg-white w-full border border-gray-200`} title='Download receipt' titleStyle={tw`text-primary`} />
                </View>

                <View>
                    <TButton onPress={() => navigation.navigate('DummyInvoice')} containerStyle={tw`bg-primary w-full border`} title='Download vendor invoice' />
                </View>
                <View>
                    <TButton onPress={() => navigation.navigate('/(drawer)/(tab)')} containerStyle={tw`bg-primary w-full`} title='Done' />
                </View>
            </ScrollView>
            <StatusBar translucent={false} />
        </View>
       </SafeAreaView>
    )
}

export default PaymentSummery

const styles = StyleSheet.create({})