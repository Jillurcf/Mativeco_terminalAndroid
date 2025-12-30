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
        <SafeAreaView style={tw`flex-1 bg-secondary`}>
            <View style={tw`flex-1 bg-secondary p-4`}>
            <View style={tw`flex-row justify-between items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw``}>
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <Text style={tw`font-RobotoBold text-primary text-xl`}>How does the app work?</Text>
                <View></View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`px-[4%] mt-12`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        What is Tap to Pay ?
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>

                        Tap to Pay  lets you accept contactless payments using just yourandroid — no extra hardware needed. Customers can simply hold their contactless credit/debit card or digital wallet (Apple Pay, Google Pay, etc.) near yourandroid to complete the payment securely.
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text text-primary`}>
                        What You Need to Get Started:
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>


                        Anandroid XS or later running iOS 16.4 or higher
                        A verified merchant account with a supported payment provider (like Stripe, Square, etc.)
                        Your customer must use a contactless card or digital wallet
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Security You Can Trust
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>

                        Tap to Pay  uses the same secure NFC technology as Apple Pay.
                        Apple never stores card numbers on the device or Apple servers.
                        Every transaction is encrypted and requires Face ID, Touch ID, or passcode.
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Accepted Payment Types
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>


                        Contactless credit/debit cards (Visa, Mastercard, American Express, etc.)
                        Apple Pay
                        Google Pay
                        Other contactless wallets (depending on your PSP)
                    </Text>
                </View>
                <View style={tw`px-[4%] mt-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        What You CANNOT Do:
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>


                        You can’t use Tap to Pay  to process card-not-present transactions.
                        You cannot manually enter card info to simulate Tap to Pay.
                        You must only activate Tap to Pay during a checkout/payment session.
                        You must not store any payment card information.
                    </Text>
                </View>
                <View style={tw`px-[4%] my-4`}>
                    <Text style={tw`font-RobotoBold text-primary`}>
                        Transaction Flow Overview
                    </Text>
                    <Text style={tw`font-RobotoRegular text-primary mt-2`}>
                        Customer confirms the total.
                        You present yourandroid to the customer.
                        They tap their card or device near the top of yourandroid.
                        You see a confirmation screen (success or error).
                        Optionally, send or print a receipt via your app.
                    </Text>
                </View>
            </ScrollView>
             <StatusBar backgroundColor='#01503B' translucent={false} />
             
        </View>
        </SafeAreaView>
    )
}

export default HowDoesAppWork

const styles = StyleSheet.create({})