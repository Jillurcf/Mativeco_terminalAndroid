import tw from '@/src/lib/tailwind'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { IconDown, IconUp } from '../assets/icon/icon'

const CustomNumericInput = () => {
    const [value, setValue] = useState(1)

    const increment = () => setValue(prev => prev + 1)
    const decrement = () => setValue(prev => (prev > 0 ? prev - 1 : 0))

    return (
        <View style={tw`flex-row items-center border border-gray-300 rounded-2xl px-4 py-2 w-full justify-between`}>

            <Text style={tw`text-xl font-bold`}>{value}</Text>
            <View>
               
                <TouchableOpacity onPress={increment}>
                    <SvgXml xml={IconUp}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={decrement}>
                <SvgXml xml={IconDown}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomNumericInput
