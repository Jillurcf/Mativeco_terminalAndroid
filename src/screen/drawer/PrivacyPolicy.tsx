import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from '../../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../../assets/icon/icon'
import { LAST_UPDATED_PRIVACY_POLICY } from '../../constants'

type Props = {}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'Unknown'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return String(dateStr)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

const PrivacyPolicy = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <View style={tw`flex-1 bg-secondary p-[4%]`}>
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw``}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`font-RobotoBold text-primary text-xl`}>Privacy Policy</Text>
          <View></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={tw`font-RobotoBold text-primary px-[4%] mt-4`}>
              Last Updated: {formatDate(LAST_UPDATED_PRIVACY_POLICY)}
            </Text>
            <Text style={tw`font-RobotoRegular text-primary px-[4%] mt-4`}>
              Our company ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
            </Text>
          </View>
          <View style={tw`px-[4%] mt-6`}>
            <Text style={tw`font-RobotoBold text-primary`}>
              Information We Collect
            </Text>
            <Text style={tw`font-RobotoRegular text-primary mt-2`}>
              We may collect personal information including:{'\n'}
              Contact details (name, email, phone number).{'\n'}
              Payment information through Stripe.{'\n'}
              Device and usage data.{'\n'}
              Location information.{'\n'}
            </Text>
          </View>
          <View style={tw`px-[4%] mt-4`}>
            <Text style={tw`font-RobotoBold text text-primary`}>
              How We Use Your Information
            </Text>
            <Text style={tw`font-RobotoRegular text-primary mt-2`}>
              We use the information we collect to:{'\n'}

              Provide and maintain our services.{'\n'}
              Process transactions.{'\n'}
              Improve user experience.{'\n'}
              Communicate with you.{'\n'}
              Comply with legal obligations{'\n'}
            </Text>
          </View>
          <View style={tw`px-[4%] mt-4`}>
            <Text style={tw`font-RobotoBold text-primary`}>
              Data Security
            </Text>
            <Text style={tw`font-RobotoRegular text-primary mt-2`}>
              We implement appropriate technical and organizational measures to protect your personal data. Payment information is processed securely through Stripe and we do not store credit card details.
            </Text>
          </View>
          <View style={tw`px-[4%] mt-4`}>
            <Text style={tw`font-RobotoBold text-primary`}>
              Data Retention
            </Text>
            <Text style={tw`font-RobotoRegular text-primary mt-2`}>
              We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law.
            </Text>
          </View>
          <View style={tw`px-[4%] mt-4`}>
            <Text style={tw`font-RobotoBold text-primary`}>
              Your Rights
            </Text>
            <Text style={tw`font-RobotoRegular text-primary mt-2`}>

              You have the right to:{'\n'}
              Access your personal data.{'\n'}
              Request correction or deletion{'\n'}
              Object to processing.{'\n'}
              Request data portability.{'\n'}

            </Text>
          </View>
          <View style={tw`px-[4%] my-4`}>
            <Text style={tw`font-RobotoBold text-primary`}>
              For any privacy-related inquiries, please contact us:
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('HelpAndSupport')}
              style={tw``}>
              <Text style={tw`font-RobotoItalic underline text-green-700`}>
                Help & Support.
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({})