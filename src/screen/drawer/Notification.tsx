import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from '../../lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../../assets/icon/icon'
import { Switch } from 'react-native-switch';
type Props = {}

const Notification = ({ navigation }: { navigation: any }) => {
    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <View style={tw`flex-row justify-between items-center`}> <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw``}>
                <SvgXml xml={IconBack} />
            </TouchableOpacity>
                <Text style={tw`font-RobotoBold`}>Notificaiton</Text>
                <View></View>
            </View>
            <View style={tw` justify-center items-center`}>
                <View style={tw`bg-white rounded-xl mt-12 p-4 mr-2 w-80 shadow-lg`}>
                    <Switch
                        value={true}
                        onValueChange={(val) => console.log(val)}
                        disabled={false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={30}
                        barHeight={1}
                        circleBorderWidth={3}
                        backgroundActive={'green'}
                        backgroundInactive={'gray'}
                        circleActiveColor={'#30a566'}
                        circleInActiveColor={'#000000'}
                        // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                        innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
                        outerCircleStyle={{}} // style for outer animated circle
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                        switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                        switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
                        switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                    />
                </View>
            </View>
            <StatusBar backgroundColor='black' translucent={false} />
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({})