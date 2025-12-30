import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { IconBack } from '../assets/icon/icon'
import tw from '../lib/tailwind'
import TButton from '../components/TButton'
import QRCode from 'react-native-qrcode-svg';  // To display QR code for the URL
import RNFS from 'react-native-fs';  // To save the PDF file locally
import PDFReader from 'react-native-pdf'; // To render the PDF

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
    const [receipt, setReceipt] = useState<ReceiptData | null>(null);
    const [loading, setLoading] = useState(true);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null); // State for QR code URL
    const [pdfPath, setPdfPath] = useState<string | null>(null); // State to store the generated PDF path
    const { params } = route ?? {};
    const receiptId = params?.id; // Assuming you're passing the receipt ID through params
    const base_url = 'http://103.186.20.114:8084/api';

    useEffect(() => {
        fetchReceiptData();
    }, [receiptId]);

    const fetchReceiptData = async () => {
        try {
            const response = await fetch(`${base_url}/get-payment/${receiptId}`);
            const data = await response.json();
            setReceipt(data);
        } catch (error) {
            console.log('Error fetching receipt data:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateAndSavePDF = async () => {
        if (!receipt?.data) return;

        try {
            // Define the PDF path with the file:// prefix
            const path = `${RNFS.DocumentDirectoryPath}/receipt_${receipt.data.transaction_id}.pdf`;

            // Here you would use a PDF library to generate and save the actual PDF content
            await RNFS.writeFile(path, 'This is a dummy PDF content for the receipt.');

            // Set the path of the saved PDF and the QR code URL
            setPdfPath(`file://${path}`);  // Prefix the path with `file://`
            setQrCodeUrl(`file://${path}`);  // Prefix the path with `file://`

            Alert.alert('PDF Generated', 'Your receipt PDF has been generated and saved locally.');

        } catch (error) {
            console.error('Error generating or saving PDF:', error);
            Alert.alert('Error', 'Failed to generate or save the PDF');
        }
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-secondary`}>
            <ScrollView style={tw`bg-secondary flex-1 p-[4%]`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgXml xml={IconBack} />
                </TouchableOpacity>
                <View style={tw`mt-[4%]`}>
                    {loading ? (
                        <Text style={tw`text-primary text-center`}>Loading receipt data...</Text>
                    ) : (
                        <View style={tw`bg-secondary rounded-xl p-4-2 w-full shadow-lg`}>
                            <Text style={tw`text-primary text-[28px] text-center font-RobotoBold`}>Receipt details</Text>
                            <Text style={tw`text-primary text-[14px] py-4 text-center font-RobotoBold`}>Transaction Information</Text>
                            <View>
                                <View style={tw`flex-row items-center gap-2`}>
                                    <Text style={tw`text-center text-primary text-lg`}>Transaction ID:</Text>
                                    <Text style={tw`text-center text-xs text-primary font-bold`}>{receipt?.data?.transaction_id}</Text>
                                </View>

                                <View style={tw`flex-row items-center gap-2 mt-1`}>
                                    <Text style={tw`text-center text-primary text-lg`}>Date:</Text>
                                    <Text style={tw`text-center text-primary text-xs font-bold`}>{receipt?.data?.created_at?.slice(0, 10)}</Text>
                                </View>
                                <View style={tw`flex-row items-center gap-2 mt-1`}>
                                    <Text style={tw`text-center text-primary text-lg`}>Time:</Text>
                                    <Text style={tw`text-center text-primary text-xs font-bold`}>{receipt?.data?.created_at?.slice(11, 19)}</Text>
                                </View>
                                <View style={tw`flex-row items-center gap-2 mt-1`}>
                                    <Text style={tw`text-center text-primary text-lg`}>Status:</Text>
                                    <Text style={[tw` font-bold text-xs`,]}>{receipt?.data?.status}</Text>
                                </View>
                            </View>
                            <View style={tw`border border-primary my-4`}></View>
                            <View style={tw`flex-row items-center gap-2`}>
                                <Text style={tw`text-center text-primary text-lg`}>Total amount:</Text>
                                <Text style={tw`text-center text-primary text-xs font-bold`}>{receipt?.data?.amount}</Text>
                            </View>
                            <View style={tw`flex-row gap-2 items-center mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Platform Fee:</Text>
                                <Text style={tw`text-center text-primary text-xs font-bold`}>{receipt?.data?.platform_fee}</Text>
                            </View>

                            <View style={tw`flex-row items-center gap-2 mt-1`}>
                                <Text style={tw`text-center text-primary text-lg`}>Total Charged:</Text>
                                <Text style={tw`text-center text-primary text-xs font-bold`}>{receipt?.data?.amount}</Text>
                            </View>
                        </View>
                    )}

                    {/* PDF Viewer */}
                    {/* {pdfPath && (
                        <View style={tw`h-96`}>
                            {pdfPath ? (
                                <PDFReader
                                    source={{ uri: pdfPath, cache: true }}
                                    style={tw`flex-1`}
                                    onError={(error) => console.log('Error loading PDF:', error)}
                                />
                            ) : (
                                <Text style={tw`text-primary text-center`}>PDF is being generated...</Text>
                            )}
                        </View>
                    )} */}


                    {/* Buttons */}
                    <View>
                        <View style={tw`mt-2`}>
                            <TButton onPress={generateAndSavePDF} containerStyle={tw`bg-primary w-full `} title="Generate and Save Receipt" />
                        </View>
                    </View>

                    {/* Render QR Code */}
                    {qrCodeUrl && (
                        <View style={{ marginVertical: 20, alignItems: 'center' }}>
                            <QRCode value={qrCodeUrl} size={200} />
                        </View>
                    )}
                </View>
                <StatusBar translucent={false} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default ReceiptDetails

const styles = StyleSheet.create({})

