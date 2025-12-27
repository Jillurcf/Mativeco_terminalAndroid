import React, { useMemo } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../assets/icon/icon'
import tw from '../lib/tailwind'
import TButton from '../components/TButton'

type ReceiptData = {
    transactionId?: string
    paymentMethod?: string
    dateTime?: string | number
    status?: string
    totalAmount?: number | string
    platformFee?: number | string
    stripeFee?: number | string
    totalCharged?: number | string
}

type Props = {
    navigation: any
    route?: { params?: ReceiptData | { receipt?: ReceiptData } }
}

const ReceiptDetails = ({ navigation, route }: Props) => {
    // Accept receipt either directly in params or under params.receipt
    const params = route?.params
    let receipt: ReceiptData | undefined
    if (params && typeof params === 'object' && 'receipt' in params) {
        receipt = (params as { receipt?: ReceiptData }).receipt
    } else {
        receipt = params as ReceiptData | undefined
    }

    const {
        transactionId = 'N/A',
        paymentMethod = 'N/A',
        dateTime,
        status = 'Unknown',
        totalAmount,
        platformFee,
    } = receipt ?? {}

    // Parse numbers safely
    const parsedTotalAmount = Number(totalAmount)
    const parsedPlatformFee = Number(platformFee)
    // Stripe fee: 1.4% + $0.25
    const computedStripeFee = !isNaN(parsedTotalAmount) ? parsedTotalAmount * 0.014 + 0.25 : NaN
    // Total charged: totalAmount + platformFee + stripeFee
    const computedTotalCharged =
        !isNaN(parsedTotalAmount) && !isNaN(parsedPlatformFee) && !isNaN(computedStripeFee)
            ? parsedTotalAmount + parsedPlatformFee + computedStripeFee
            : NaN
    // If totalAmount is the final charge, compute baseAmount
    const computedBaseAmount =
        !isNaN(parsedTotalAmount) && !isNaN(parsedPlatformFee) && !isNaN(computedStripeFee)
            ? parsedTotalAmount - parsedPlatformFee - computedStripeFee
            : NaN

    const formattedDate = useMemo(() => {
        if (!dateTime) return 'N/A'
        const d = new Date(dateTime as any)
        if (isNaN(d.getTime())) return String(dateTime)
        return d.toLocaleString()
    }, [dateTime])

    // Helper to format currency
    const formatCurrency = (value?: number | string) => {
        const num = typeof value === 'number' ? value : Number(value)
        if (isNaN(num)) return 'N/A'
        try {
            return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(num)
        } catch (e) {
            return `$${num.toFixed(2)}`
        }
    }

    const statusColor = (status || '').toLowerCase() === 'completed' ? '#048506' : '#01503B'

    return (
        <SafeAreaView style={tw`flex-1 bg-secondary`}>
            <View style={tw`bg-secondary flex-1 p-[4%]`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <View style={tw`mt-[4%]`}>
                    <View style={tw`bg-secondary rounded-xl p-4-2 w-full shadow-lg`}>
                        <Text style={tw`text-primary text-[28px] text-center font-RobotoBold`}>Receipt details</Text>
                        <Text style={tw`text-primary text-[14px] py-4 text-center font-RobotoBold`}>Transaction Information</Text>
                        <View>
                            <View style={tw`flex-row justify-between`}>
                                <Text style={tw`text-center text-primary text-lg`}>Transaction ID:</Text>
                                <Text style={tw`text-center text-primary text-lg font-bold`}>{transactionId}</Text>
                            </View>
                            <View style={tw`flex-row justify-between mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Payment method:</Text>
                                <Text style={tw`text-center text-primary text-lg font-bold`}>{paymentMethod}</Text>
                            </View>
                            <View style={tw`flex-row justify-between mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Date & time:</Text>
                                <Text style={tw`text-center text-primary text-lg font-bold`}>{formattedDate}</Text>
                            </View>
                            <View style={tw`flex-row justify-between mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Status:</Text>
                                <Text style={[tw`text-lg font-bold`, { color: statusColor }]}>{status}</Text>
                            </View>
                        </View>
                        <View style={tw`border border-primary my-4`}></View>
                        <View style={tw`flex-row justify-between`}>
                            <Text style={tw`text-center text-primary text-lg`}>Total amount:</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>{formatCurrency(parsedTotalAmount)}</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-primary text-lg`}>Platform Fee:</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>{formatCurrency(parsedPlatformFee)}</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-primary text-lg`}>Stripe Fee (1.4% + $0.25):</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>{formatCurrency(computedStripeFee)}</Text>
                        </View>
                        <View style={tw`flex-row justify-between mt-1`}>
                            <Text style={tw`text-center text-primary text-lg`}>Total Charged:</Text>
                            <Text style={tw`text-center text-primary text-lg font-bold`}>{formatCurrency(computedTotalCharged)}</Text>
                        </View>

                    </View>
                    <View>
                        <View style={tw`mt-2`}>
                            <TButton onPress={() => navigation.navigate('PaymentSummery', { receipt })} containerStyle={tw`bg-primary w-full `} title='Download receipt' />
                        </View>

                        <View style={tw`mt-2`}>
                            <TButton onPress={() => navigation.navigate('QrcodeScreen', { receipt })} containerStyle={tw`bg-primary w-full border`} title='Show QR code' />
                        </View>
                        <View style={tw`mt-2`}>
                            <TButton onPress={() => navigation.navigate('/(drawer)/(tab)')} containerStyle={tw`bg-primary w-full`} title='Done' />
                        </View>
                    </View>
                </View>
                <StatusBar translucent={false} />
            </View>
        </SafeAreaView>
    )
}

export default ReceiptDetails

const styles = StyleSheet.create({})