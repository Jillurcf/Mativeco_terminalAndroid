import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from '../../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../../assets/icon/icon'
import TextInput1 from '../../components/TextInput'
import Textarea from 'react-native-textarea';
import Button from '../../components/Button'
import NormalModal from '../../components/NormalModal'




const HelpSupport = ({ navigation }: { navigation: any }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [helpSupportModalVisible, setHelpSupportModalVisible] = useState(false)


  const handleSubmit = () => {
    const isSubjectValid = subject.trim().length > 0;
    const isDescriptionValid = description.trim().length > 0;

    // if (!isSubjectValid || !isDescriptionValid) {
    //   setErrorMessage('Please fill in all the fields');
    //   return;
    // }

    // Clear error and show modal if both fields are filled
    setErrorMessage('');
    setHelpSupportModalVisible(true);
  };


  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`}>
      <View style={tw`flex-1 bg-secondary p-[4%]`}>
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgXml xml={IconBack} />
          </TouchableOpacity>
          <Text style={tw`font-RobotoBold text-primary text-xl`}>Help & Support</Text>
          <View />
        </View>

        {/* ============================== Input Section =================== */}
        <View>
          {/* Subject input */}
          <View style={tw`mt-12 px-[4%]`}>
            <Text style={tw`text-primary font-RobotoRegular`}>Subject</Text>
            <TextInput1
              value={subject}
              onChangeText={setSubject}
              placeholder="Enter subject"
              placeholderTextColor="#01503B"
              style={tw`border border-primary rounded-lg h-12`}
            />
          </View>

          {/* Description input */}
          <View style={tw`mt-4 px-[4%]`}>
            <Text style={tw`text-primary font-RobotoRegular`}>Description</Text>
            <View style={tw`mt-2 justify-center items-center`}>
              <Textarea
                containerStyle={tw`w-[100%] p-1 border rounded-lg border-primary`} // height: 176 (44*4)
                style={[tw`text-primary`, { textAlignVertical: 'top', height: 170 }]}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                maxLength={500}
                placeholder="Write description here"
                placeholderTextColor="#01503B"
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
        </View>
        <View style={tw`p-[4%]`}>  {errorMessage && (
          <Text style={tw`text-red-500 font-RobotoRegular`}>{errorMessage}*</Text>
        )}</View>
        <View style={tw`items-center mt-8`}>

          <Button onPress={handleSubmit} title="Submit" style={tw`text-secondary font-RobotoBold`} containerStyle={tw`bg-primary w-[95%] items-center`} />

        </View>
        <NormalModal
          layerContainerStyle={tw`flex-1 justify-center items-center animate-none`} // Ensure modal content aligns at the bottom
          containerStyle={tw`bg-black w-[90%] items-center shadow-lg rounded-2xl p-6`} // Styling the modal itself
          visible={helpSupportModalVisible}
          setVisible={setHelpSupportModalVisible}
        >
          <View>
            <Text style={tw`text-white text-lg text-center font-RobotoRegular mb-2`}>
              Your message sent successfully
            </Text>

            <View style={tw`mt-2`}>
              <View style={tw` w-full`}>

              </View>
              <View style={tw` mt-2 flex justify-center mx-0 items-center`}>
                <Button
                  title="Done"
                  style={tw`text-black font-RobotoRegular`}
                  containerStyle={tw`bg-white py-3 w-[50%]`}
                  onPress={() => {
                    setHelpSupportModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </NormalModal>
      </View>
    </SafeAreaView>
  )
}

export default HelpSupport

const styles = StyleSheet.create({})
