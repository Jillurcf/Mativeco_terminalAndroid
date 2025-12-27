import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import tw from "twrnc";
import Button from "../../components/Button";
import { SvgXml } from "react-native-svg";
import { IconDown } from "../../assets/icon/icon";
import { SafeAreaView } from "react-native-safe-area-context";

const stepImages = [
  require("../../assets/images/getAuthentic.png"),
  require("../../assets/images/CreateAccount.png"),
  require("../../assets/images/CeateAccount1.png"),
  require("../../assets/images/VerifyScreen.png"),
  require("../../assets/images/SelectAccount.png"),
  require("../../assets/images/TapToPay.png"),
  require("../../assets/images/TapToPay_1.png"),
  require("../../assets/images/ConfirmPayment.png"),
];

const steps = [
  // "Click Start Tour \n(This button is at the bottom)",
  "Click on GET AUTHENTICATION button",
  "Click skip from this if you have account already otherwise put email and press submit",
  "Enter password and press submit",
  "Collect otp from google authenticator \n and Enter here",
  "Select existing one or create new account",
  "Click Tap to Pay button",
  "Enter amount, click Tap to Pay button",
  "Place the card HORIZONTALLY on the back of the phone",
 ];

export default function UserFlowScreen({ navigation }: { navigation: any }) {
  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={tw`items-center mb-6`}>
      {stepImages[index] && (
        <Image
          source={stepImages[index]}
          style={tw`w-full h-40 mb-2`}
          resizeMode="contain"
        />
      )}

      <View
        style={[
          tw`items-center bg-secondary rounded-2xl p-4`,
          {
            shadowColor: "#01503B",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          },
        ]}
      >
        <Text style={tw`font-RobotoBold text-[#01503B] text-center text-sm`}>
          {index + 1}. {item}
        </Text>
      </View>

      {index < steps.length - 1 && <SvgXml xml={IconDown} />}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#D8E7BC]`}>
      {/* Title */}
      <View style={tw`items-center mt-4`}>
        <Text style={tw`font-RobotoBold font-bold text-[#01503B] text-2xl`}>
         How to use tap to pay
        </Text>
      </View>

      <View style={tw`items-center flex justify-center mt-4`}>
        <View style={tw`w-[80%] p-2 rounded-lg items-center`}>
          <Text style={tw`font-RobotoBold text-[#01503B] text-center text-sm`}>
            Click START TOUR to begin the step by step guide
          </Text>
        </View>
      </View>

      {/* FlatList */}
      <FlatList
        data={steps}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={tw`px-6 m-[4%] pb-36`}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Button */}
      <View
        style={[
          tw`absolute left-0 right-0 bottom-6 items-center`,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 8,
          },
        ]}
      >
        <View style={tw`w-[90%]`}>
          <Button
            onPress={() => navigation.navigate("Authenticate")}
            containerStyle={tw`bg-[#01503B] p-4 rounded-lg`}
            style={tw`text-white font-RobotoBold text-center`}
            title="Start Tour"
          />
        </View>
      </View>

      <StatusBar backgroundColor="#01503B" translucent={false} />
    </SafeAreaView>
  );
}
