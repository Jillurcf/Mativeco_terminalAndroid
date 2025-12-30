import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from '../../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../../assets/icon/icon'

type Props = {}

const HowDoesAppWork = ({ navigation }: { navigation: any }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
    <SafeAreaView style={tw`flex-1 bg-secondary `}>
            <View style={tw`flex-1 bg-secondary p-4`}>
            <View style={tw`flex-row justify-between items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw``}>
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <Text style={tw`font-RobotoBold text-primary text-xl`}>Terms & Condition</Text>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`px-[4%] mt-12`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Use of Tap to pay
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>

                        This feature allows you to accept contactless payments directly on a compatibleandroid (iPhone XS or later, iOS 16.4+).
                        You must have an active merchant account with a supported payment provider (e.g., Stripe, Square).
                        The app is intended solely for in-person, card-present transactions.
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text text-primary`}>
                        Prohibited Usage
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>

                        You are not allowed to:
                        Manually enter card information to simulate a tap.
                        Store or retain any customer payment information.
                        Use Tap to Pay for remote, card-not-present transactions.
                        Enable payment mode outside of an active checkout session.

                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Data & Privacy
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>

                        Your payment data is handled securely using Apple’s NFC technology.
                        Apple does not store or log any card numbers.
                        Transactions require Face ID, Touch ID, or a passcode to be initiated.
                        We do not store or process sensitive cardholder data within our servers.
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Security
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>


                        You are responsible for keeping your device secure.
                        Any misuse or unauthorized access to your device is your responsibility.
                        It is recommended to use a strong passcode and enable Face ID or Touch ID.
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Limitation of Liability
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>


                        We are not liable for:
                        Losses due to device theft or unauthorized access.
                        Failed or declined transactions.
                        Any delays in payment processing by third-party providers (e.g., Stripe).
                    </Text>
                </View>
                <View style={tw`px-[4%] my-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Changes to Terms
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>
                        We reserve the right to update these Terms at any time. Continued use of the app indicates your agreement to the updated Terms.


                    </Text>
                </View>
                <View style={tw`px-[4%] my-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Contact
                    </Text>
                    <View style={tw``}>
                        <Text style={tw`font-RobotoRegular text-primary mt-2`}>
                            For support or questions regarding these Terms, please contact us at:
                        </Text>
                        <TouchableOpacity
                        onPress={()=> navigation.navigate('HelpAndSupport')}
                        style={tw``}>
                            <Text style={tw`font-RobotoItalic underline text-green-700`}>
                                Help & Support.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
           <StatusBar backgroundColor='#01503B' translucent={false} />
        </View>
    </SafeAreaView>
    )
}

export default HowDoesAppWork

const styles = StyleSheet.create({})