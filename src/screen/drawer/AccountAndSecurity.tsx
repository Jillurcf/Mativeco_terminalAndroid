import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../../assets/icon/icon'
import tw from '../../lib/tailwind'

type Props = {}

const AccountAndSecurity = ({ navigation }: { navigation: any }) => {
  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row justify-between items-center`}> <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw``}>
        <SvgXml xml={IconBack} />
      </TouchableOpacity>
        <Text style={tw`font-RobotoBold`}>Account & security</Text>
        <View></View>
      </View>

    </View>
  )
}

export default AccountAndSecurity

const styles = StyleSheet.create({})