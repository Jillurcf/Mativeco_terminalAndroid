// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { Terminal } from '@stripe/stripe-terminal-react-native';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, StatusBar, Text, TouchableOpacity, View, } from "react-native";
import { WebView } from 'react-native-webview';
import tw from "../../lib/tailwind";
import TButton from "../../components/TButton";
import CheckBox from '@react-native-community/checkbox';
import { useStripeTerminalService } from '../../services/stripeTerminal.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// export default StripeAuthScreen;
// fetchTokenProvider from your AppRoute
const fetchTokenProvider = async () => {
    try {
        const response = await fetch('http://103.186.20.114:8084/api/stripe/terminal/connection_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch secret key');

        const { secret } = await response.json();
        return secret;
    } catch (error) {
        console.log('Stripe terminal token fetch error:', error);
        return '';
    }
};

const StripeAuthScreen = () => {
    const [redirectUri, setRedirectUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showWebView, setShowWebView] = useState(false);
    const [code, setCode] = useState<string>('');
    const [isSelected, setSelection] = useState(false);
    // console.log(code, "code+++++++=")
    const navigation = useNavigation();




    // ✅ Initialize Stripe Terminal & check Apple T&C
    const terminal = useStripeTerminal();

    //  useEffect(() => {
    //         // Example: Initialize the terminal
    //         const initializeTerminal = async () => {
    //             try {
    //                 await terminal.initialize();  // Initialize the terminal (this is an example, check documentation)
    //                 console.log("Stripe Terminal initialized successfully");
    //             } catch (error) {
    //                 console.error("Error initializing Stripe Terminal:", error);
    //             }
    //         };

    //         initializeTerminal();
    //     }, [terminal]); // Re-run if `terminal` changes


    useEffect(() => {
        const initTerminalAndCheckTerms = async () => {
            if (Platform.OS !== 'ios') {
                console.log("ℹ️ Tap to Pay T&C check skipped (not iOS).");
                return;
            }

            // Ensure the terminal is initialized and ready
            if (!terminal) {
                console.log("⚠️ Terminal is not initialized yet.");
                return;
            }

            // Log the terminal object to see its methods and properties
            console.log("terminal++++++++++", terminal, "terminal++++++++++");

            // Check if the checkTermsAcceptanceStatus method is available
            // if (!terminal.checkTermsAcceptanceStatus) {
            //     console.warn("⚠️ checkTermsAcceptanceStatus not available in this SDK version.");
            //     return;
            // }

            // try {
            //     const status = await terminal.checkTermsAcceptanceStatus();
            //     if (!status.accepted) {
            //         console.log("⚠️ Tap to Pay terms not accepted, presenting terms...");
            //         await terminal.presentTermsAndConditions();
            //     } else {
            //         console.log("✅ Ready for transactions");
            //     }
            // } catch (err) {
            //     console.error("Error checking terms:", err);
            // }
        };

        initTerminalAndCheckTerms();
    }, [terminal]);


    const handleAuthenticate = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://103.186.20.114:8084/api/stripe/auth-url');
            console.log(res, "onboarding url response")
            const contentType = res.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();
                console.log('✅ Fetched Stripe URL:', data);
                setRedirectUri(data.auth_url);
                setShowWebView(true);
            } else {
                const errorText = await res.text();
                console.log('❌ Unexpected response:', errorText);
            }

        } catch (err) {
            console.log('❌ Failed to fetch redirect URI:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleExchangeCode = async (code: string) => {
        try {
            console.log('🔁 Sending code to backend:', code);
            const res = await fetch('http://103.186.20.114:8084/api/stripe/exchange-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();
            console.log(data, "data++++++++++++")
            console.log('🎉 Full backend response:', data?.user?.stripe_account_id);

            if (data?.token) {
                await AsyncStorage.setItem('AUTH_TOKEN', data.token);
                await AsyncStorage.setItem(
                    'USER_INFO',
                    JSON.stringify(data.user)
                );

                console.log('✅ User & token saved to AsyncStorage');
                const token = await AsyncStorage.getItem('AUTH_TOKEN');
                const user = await AsyncStorage.getItem('USER_INFO');
                console.log('🔐 Token from storage:', token);
                console.log('🔐 User from storage:', user);

                setCode(data.token);
                setShowWebView(false);
                navigation.navigate('Drawer', { id: data?.user?.stripe_account_id });
            } else {
                console.log('❌ Token not found in response');
            }
        } catch (err) {
            console.log('❌ Error exchanging code:', err);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }

    if (showWebView && redirectUri) {
        console.log(redirectUri, "redirectUri+++++++=")
        const design = useSafeAreaInsets()
        return (
            <WebView
                source={{ uri: redirectUri }}
                style={{ flex: 1, paddingTop: design.top }}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
                onNavigationStateChange={(navState) => {
                    console.log('🌐 Navigated to:', navState.url);

                    if (navState.url.includes('/api/stripe/callback')) {
                        const queryString = navState.url.split('?')[1];
                        // const urlParams = new URLSearchParams(queryString);
                        // const returnedCode = urlParams.get('code');
                        const match = queryString.match(/code=([^&]+)/);
                        const returnedCode = match ? decodeURIComponent(match[1]) : null;

                        if (returnedCode) {
                            console.log('✅ Stripe returned code:', returnedCode);
                            handleExchangeCode(returnedCode);
                        } else {
                            console.log('⚠️ Code not found in callback URL');
                        }
                    }
                }}
            />
        );
    }







    return (
        <View style={tw`bg-secondary flex-1 items-center justify-center`}>

            <View>
                <View style={tw` items-center`}>
                    <Image
                        resizeMethod="resize"
                        resizeMode="cover"
                        source={require('../../assets/images/logo.png')}
                        style={{ width: 250, height: 250, alignItems: 'center' }}
                    />
                </View>
                <Text style={tw`text-[38px] text-center text-[#01503B] font-RobotoBold`}>Terminal</Text>
            </View>
            <View>
                {code ? (
                    <View style={tw` items-center my-6`}>
                        <TButton
                            onPress={handleAuthenticate}
                            containerStyle={tw`w-[100%] bg-black`} title='Next' />

                    </View>

                ) :
                    (
                        <View style={tw` items-center mt-6`}>
                            <TButton
                                onPress={handleAuthenticate}
                                containerStyle={tw`w-[100%] font-RobotoRegular bg-primary`} title='Get Authenticate' />

                        </View>

                    )}
            </View>
            <View style={tw``}>


            </View>
            <StatusBar translucent={false} />
        </View>
    );
};

export default StripeAuthScreen;

