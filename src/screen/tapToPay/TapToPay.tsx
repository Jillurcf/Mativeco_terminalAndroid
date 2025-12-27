
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  useStripeTerminal,
} from '@stripe/stripe-terminal-react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { LinearGradient, SvgXml } from 'react-native-svg';
import tw from '../../lib/tailwind';
import { IconBack, IconTapToPay } from '../../assets/icon/icon';
import InputText from '../../components/InputText';
import TButton from '../../components/TButton';
import LottieView from 'lottie-react-native';
import NormalModal from '../../components/NormalModal';
import Button from '../../components/Button';
import { useStripeTerminalService } from '../../services/stripeTerminal.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TapToPay = ({ navigation }: { navigation: any }) => {
  const isScanning = useRef(false);
  const [amount, setAmount] = useState('');
  const [readerConnected, setReaderConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState('');
  const [priceModalVisible, setPriceModalVisible] = useState('')
  const [setUpErrorModalVisible, setSetUpErrorModalVisible] = useState(false);
  const [locationId, setLocationId] = useState<string>('');
  // console.log("location Id====================", locationId, "locationId++++++++++++++");
  const [user, setUser] = useState<any>(null);
  // console.log("user+++++++= account id++++++++++++++", user?.stripe_account_id, "user+++++++= account id++++++++++++++");
  const [disconnectReaderGet, setDiscoverReaderGet] = React.useState(false)

  const {
    initialize,
    discoverReaders,
    discoveredReaders,
    connectReader,
    createPaymentIntent,
    collectPaymentMethod,
    disconnectReader,
    getConnectionStatus,
  } = useStripeTerminal({
    onUpdateDiscoveredReaders: () => { },
    onDidChangeConnectionStatus: () => { },
  });

  useEffect(() => {
    const setup = async () => {
      const permissionGranted = await requestPermissions();
      if (!permissionGranted) return;

      const locationEnabled = await checkLocationServicesEnabled();
      if (!locationEnabled) return;

      try {
        await initialize();
        console.log('Stripe Terminal initialized');
      } catch (err) {
        console.log('Initialization Error:', err);
        Alert.alert('Setup Error', err.message || 'Terminal initialization failed');
      }
      // StripeTerminalProvider already initialized the terminal
      console.log('Stripe Terminal already initialized via provider');
    };

    setup();

    return () => {
      disconnectReader().catch(err => console.log('Failed to disconnect:', err));
    };
  }, [initialize]);


  useLayoutEffect(() => {
    const setupStripeTerminal = async () => {
      await initialize();  // Initialize Stripe Terminal
    };
    setupStripeTerminal();

    const connectReader = async () => {
      await handleDiscoverAndConnectReader();
    };
    connectReader();
  }, []);



  // =================user information from async storage==================
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('AUTH_TOKEN');
        const user = await AsyncStorage.getItem('USER_INFO');
        // setUser(user);
        if (token && user) {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
          // console.log('🔐 Token:', token);
          // console.log('👤 User:', parsedUser);

          // OPTIONAL: set state if you want
          // setAuthToken(token);
          // setUser(parsedUser);

          // OPTIONAL: navigate automatically
          // navigation.navigate('Drawer', {
          //   id: parsedUser.stripe_account_id,
          // });
        } else {
          console.log('ℹ️ No user found in storage');
        }
      } catch (error) {
        console.log('❌ Failed to load user from storage', error);
      }
    };

    loadUserFromStorage();
  }, []);




  // console.log(useStripeTerminal, "useStripeTerminal++++++++++++++");
  // console.log(discoverReaders, "discoverReaders++++++++++++++");


  const requestPermissions = async () => {
    // if (Platform.OS === 'android') {
    //   const apiLevel = Platform.Version;
    //   const permissions = [
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    //     PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    //   ];
    //   console.log(permissions, "permissions++++++++++++++");
    //   const results = await PermissionsAndroid.requestMultiple(permissions);
    //   const allGranted = permissions.every(
    //     (perm) => results[perm] === PermissionsAndroid.RESULTS.GRANTED
    //   );

    //   if (!allGranted) {
    //     Alert.alert('Permission Denied', 'All permissions are required to proceed.');
    //     return false;
    //   }
    // } else 
    if (Platform.OS === 'ios') {
      // const status = await request(PERMISSIONS.IOS.BLUETOOTH);

      const locStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('Location permission:', locStatus);


      // const granted = [locStatus].every(
      //   (s) => s === RESULTS.GRANTED
      // );

      // if (!granted) {
      //   Alert.alert('Permission Denied', 'Enable Bluetooth, Location and NFC access in Settings');
      //   return false;
      // }
      const granted = locStatus === RESULTS.GRANTED;
      if (!granted) {
        Alert.alert('Permission Denied', 'Enable Bluetooth, Location and NFC access in Settings');
        return false;
      }
    }

    return true;
  };

  const { terminal, fetchLocations } = useStripeTerminalService();
  // ================= for checking the loaciton =============
  useEffect(() => {
    if (!terminal.isInitialized) return;

    const loadLocations = async () => {
      const locations = await fetchLocations();
      console.log("✅ Available Stripe Locations: in tap to pay screen", locations);
      // Alert.alert("Fetched Locations in tap to pay screen", JSON.stringify(locations[0]?.id, null, 2));
      const locationId = locations[0]?.id;
      setLocationId(locationId || ''); // Set the first location ID or empty string
    };

    loadLocations();
  }, [terminal.isInitialized]);

  // Request NFC permission
  const requestNfcPermission = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);  // Request NFC tech
      console.log('NFC Permission granted');
    } catch (error) {
      console.log('NFC Permission denied', error);
      Alert.alert('Please enable NFC in Settings');
    }
  };

  useEffect(() => {
    // requestNfcPermission();
    requestPermissions();
  }, []);


  const checkLocationServicesEnabled = async () => {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        () => resolve(true),
        (error) => {
          if (error.code === 2) {
            Alert.alert(
              'Enable Location Services',
              'Please enable GPS to use Tap to Pay.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
              ]
            );
          }
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };





  useEffect(() => {
    NfcManager.start();
    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => null);
    };
  }, []);

  // const handleDiscoverAndConnectReader = async () => {
  //   // setIsDiscovering(true);

  //   try {
  //     const { error } = await discoverReaders({
  //       discoveryMethod: 'tapToPay',
  //       simulated: false,
  //     });

  //     if (error) {
  //       // Alert.alert('Discovery Error', error.message);
  //       console.log("Discovery Error+++++++++++++++++++", error.message);
  //       return false;
  //     }

  //     if (!discoveredReaders || discoveredReaders.length === 0) {
  //       // Alert.alert('Please try again');
  //       console.log("No reader found");
  //       return false;
  //     }

  //     const reader = discoveredReaders[0];

  //     const { reader: connectedReader, error: connectError } =
  //       await connectReader(
  //         { reader, locationId },
  //         'tapToPay'
  //       );

  //     if (connectError) {
  //       Alert.alert('Connection Error', connectError.message);
  //       console.log("Connection Error+++++++++++++++++++", connectError.message);
  //       return false;
  //     }

  //     setReaderConnected(true);
  //     console.log('✅ Tap to Pay Ready', 'Reader is now online');
  //     return true;

  //   } catch (err: any) {
  //     // Alert.alert('Error ============', err.message);
  //     console.log("Error======= ", err?.message)
  //     return false;
  //   } finally {
  //     setIsDiscovering(false);
  //   }
  // };


  const handleDiscoverAndConnectReader = async () => {
    try {
      let retries = 0;
      // setIsDiscovering(true);

      while (retries < 5) {
        const { error, } = await discoverReaders({
          discoveryMethod: 'tapToPay',
          simulated: true,
        });

        if (error) {
          console.log("Discovery Error+++++++++++++++++++", error.message);
          Alert.alert("Discovery Error+++++++++++++++++++", error.message);
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retry
          continue;
        }
        const reader = discoveredReaders[0];
        setDiscoverReaderGet(reader);

        console.log(reader, "readear+++++++++++++++++++")

        if (!discoveredReaders || discoveredReaders.length === 0) {
          console.log("No reader found, retrying...");
          Alert.alert("No reader found, retrying...");

          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retry
          continue;
        }

        // const reader = discoveredReaders[0];

        const { reader: connectedReader, error: connectError } = await connectReader(
          { reader, locationId },
          'tapToPay'
        );
        Alert.alert(connectedReader, "connectReader")
        if (connectError) {
          // Alert.alert('Connection Error', connectError.message);
          console.log("Connection Error+++++++++++++++++++", connectError.message);
          return false;
        }

        setReaderConnected(true);
        console.log('✅ Tap to Pay Ready', 'Reader is now online');
        return true;
      }

      console.log("Failed to discover and connect reader after retries");
      return false;
    } catch (err) {
      console.log("Error======= ", err?.message);
      return false;
    } finally {
      setIsDiscovering(false);
    }
  };



  const handleNfcRead = async () => {
    if (isScanning.current) return;
    isScanning.current = true;

    try {
      await NfcManager.cancelTechnologyRequest().catch(() => null);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('NFC Tag:', tag);

      // await handleTapToPay();
    } catch (err) {
      console.log('NFC Error:', err);
      // Alert.alert('NFC Failed', 'Try scanning again.');
    } finally {
      await NfcManager.cancelTechnologyRequest().catch(() => null);
      isScanning.current = false;
    }
  };
  const handleAmountChange = (text: string) => {
    setAmount(text);

    // If valid numeric input, clear the modal
    if (!isNaN(Number(text)) && Number(text) > 0) {
      setPriceModalVisible('');
    }
  };



  // ===============handle tap to pay from chatgpt========================
  // const handleTapToPay = async () => {
  //   try {
  //     setIsLoading(true);
  //     await initialize();
  //     setShowAnimation(true);

  //     if (!amount || isNaN(amount)) {
  //       setPriceModalVisible("Please enter a valid amount");
  //       return;
  //     }

  //     const connected =
  //       readerConnected || (await handleDiscoverAndConnectReader());

  //     if (!connected) {
  //       // Alert.alert("Try again");
  //       // Alert.alert("Reader not connected");
  //       return;
  //     }

  //     // 1️⃣ Create PaymentIntent
  //     // const { paymentIntent, error: piError } =
  //     //   await terminal.createPaymentIntent({
  //     //     amount: parseInt(amount, 10) * 100,
  //     //     currency: 'eur',
  //     //     captureMethod: 'manual',
  //     //     paymentMethodTypes: ['card_present'],
  //     //   });

  //     // if (piError || !paymentIntent) {
  //     //   Alert.alert('PI Error', piError?.message ?? 'Failed to create PI');
  //     //   return;
  //     // }

  //     // console.log('✅ PaymentIntent:', paymentIntent.id);
  //     // Alert.alert('Tap your card', 'Ready to collect payment');

  //     // ==================Payment intent from backend logic for connect account holder ===================


  //     const response = await fetch(
  //       "http://103.186.20.114:8084/api/stripe/create_intent",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           amount: parseInt(amount),
  //           currency: "eur",
  //           connect_account_id: user?.stripe_account_id,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log(data, "payment intent data from backend++++++++++++++");
  //     // ✅ Adjusted client_secret access
  //     const clientSecret = data?.data?.client_secret;
  //     console.log(clientSecret, "client_secret from backend++++++++++++++");
  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to create PaymentIntent");
  //     }

  //     const { client_secret } = data;

  //     const {
  //       paymentIntent,
  //       error: retrieveError,
  //     } = await terminal.retrievePaymentIntent(clientSecret);

  //     if (retrieveError || !paymentIntent) {
  //       console.log(
  //         retrieveError?.message,
  //         "Retrieve PI failed++++++++++++++"
  //       );
  //       return;
  //     }

  //     console.log("✅ PaymentIntent retrieved:", paymentIntent, "paymentIntent++++++++++++++");

  //     // ==================Payment intent from backend logic end  ===================

  //     // 2️⃣ Collect card
  //     const {
  //       paymentIntent: collectedIntent,
  //       error: collectError,
  //     } = await terminal.collectPaymentMethod({
  //       paymentIntent: paymentIntent, // Pass the full paymentIntent object
  //     });

  //     if (collectError || !collectedIntent) {
  //       Alert.alert(
  //         'Card Error',
  //         collectError?.message ?? 'Card not collected'
  //       );
  //       return;
  //     }

  //     console.log('✅ Card collected', collectedIntent.id);
  //     await saveTransactionToBackend(collectedIntent);


  //     console.log('✅ PaymentIntent updated:', collectedIntent.id);

  //     // 4️⃣ Confirm payment
  //     const {
  //       paymentIntent: confirmedIntent,
  //       error: confirmError,
  //     } = await terminal.confirmPaymentIntent({
  //       paymentIntent: collectedIntent, // Pass the updated paymentIntent
  //     });

  //     if (confirmError || !confirmedIntent) {
  //       console.log("payment failed++++++++++++++", confirmError?.message);
  //       Alert.alert(
  //         'Payment Failed',
  //         confirmError?.message ?? 'Confirmation failed'
  //       );
  //       return;
  //     }

  //     console.log('🎉 Payment Success:', confirmedIntent.id);

  //     await saveTransactionToBackend({
  //       amount: parseFloat(amount),
  //       currency: 'eur',
  //       paymentIntentId: confirmedIntent.id,
  //       status: confirmedIntent.status,
  //     });

  //     setAnimationType('success');
  //     setShowAnimation(true);
  //     Alert.alert('Payment Success', 'Transaction completed 🎉');

  //   } catch (err) {
  //     console.error('Payment Error:', err);
  //     setAnimationType('failure');
  //     setShowAnimation(true);
  //     Alert.alert('Payment Error', err?.message ?? 'Something went wrong');
  //   } finally {
  //     setIsLoading(false);
  //     setTimeout(() => setShowAnimation(false), 3000);
  //   }
  // };


  const handleTapToPay = async () => {
    try {
      setIsLoading(true);
      await initialize();
      // setShowAnimation(true);

      if (!amount || isNaN(amount)) {
        setPriceModalVisible("Please enter a valid amount");
        return;
      }

      const connected =
        readerConnected || (await handleDiscoverAndConnectReader());
Alert.alert(connected, "connected================")
      if (!connected) {
        console.log("Reader not connected");
        return;
      } else if (connected) {
        setShowAnimation(true);
      }

      // ==================Payment intent from backend logic==================
      const response = await fetch("http://103.186.20.114:8084/api/stripe/create_intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: "eur",
          connect_account_id: user?.stripe_account_id,
        }),
      });

      const data = await response.json();
      console.log(data, "payment intent data from backend++++++++++++++");

      if (!response.ok) {
        throw new Error(data.error || "Failed to create PaymentIntent");
      }

      const { client_secret } = data?.data;
      console.log(client_secret, "client_secret from backend++++++++++++++");

      const { paymentIntent, error: retrieveError } = await terminal.retrievePaymentIntent(client_secret);

      if (retrieveError || !paymentIntent) {
        console.log(retrieveError?.message, "Retrieve PI failed++++++++++++++");
        return;
      }

      console.log("✅ PaymentIntent retrieved:", paymentIntent);

      // ==================Payment intent from backend logic end==================

      // 2️⃣ Collect card
      const {
        paymentIntent: collectedIntent,
        error: collectError,
      } = await terminal.collectPaymentMethod({
        paymentIntent, // Pass the full paymentIntent object
      });

      if (collectError || !collectedIntent) {
        Alert.alert('Card Error', collectError?.message ?? 'Card not collected');
        return;
      }

      console.log('✅ Card collected', collectedIntent.id);
      await saveTransactionToBackend(collectedIntent);

      // 3️⃣ Confirm payment
      const {
        paymentIntent: confirmedIntent,
        error: confirmError,
      } = await terminal.confirmPaymentIntent({
        paymentIntent: collectedIntent, // Use the updated paymentIntent
      });

      if (confirmError || !confirmedIntent) {
        console.log("payment failed++++++++++++++", confirmError?.message);
        Alert.alert('Payment Failed', confirmError?.message ?? 'Confirmation failed');
        return;
      }

      console.log('🎉 Payment Success:', confirmedIntent.id);

      await saveTransactionToBackend({
        amount: parseFloat(amount),
        currency: 'eur',
        paymentIntentId: confirmedIntent.id,
        status: confirmedIntent.status,
      });

      setAnimationType('success');
      setShowAnimation(true);
      Alert.alert('Payment Success', 'Transaction completed 🎉');

    } catch (err) {
      console.log('Payment Error:', err);
      setAnimationType('failure');
      setShowAnimation(true);
      Alert.alert('Payment Error', err?.message ?? 'Something went wrong');
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowAnimation(false), 3000);
    }
  };


  // send data to the backend===================
  const saveTransactionToBackend = async (paymentIntent: any) => {
    try {
      // Build a full payload including nested details
      const payload = {
        payment_intent_id: paymentIntent?.id,
        amount: paymentIntent?.amount / 100,
        currency: paymentIntent?.currency,
        merchant_id: user?.stripe_account_id,
      };

      console.log('Sending full payment data to backend:', payload);

      const response = await fetch('http://103.186.20.114:8084/api/payment-success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Backend save failed:', errorText);
        return;
      }

      const data = await response.json();
      console.log('Backend data sending post response==============:', data, 'Backend data sending post response==============');
    } catch (error) {
      console.log('Error saving transaction:', error);
    }
  };

  const design = useSafeAreaInsets()
  if (isDiscovering) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-secondary`}>
        <Text style={tw`text-white text-lg`}>Discovering Tap to Pay Reader...</Text>

      </SafeAreaView>
    );
  }




  return (
    <TouchableWithoutFeedback style={tw`flex-1 bg-secondary`} onPress={() => Keyboard.dismiss()}>
      <View style={[tw`flex-1 bg-secondary p-[4%]`, { paddingTop: design.top }]}>
        <TouchableOpacity style={tw``} onPress={() => navigation.goBack()}>
          <SvgXml xml={IconBack} />
        </TouchableOpacity>

        <View style={tw`flex-col justify-between h-[90%]`}>
          <View>
            <Text style={tw`text-center text-[25px] text-primary font-bold my-8`}>Payment</Text>
            <InputText

              style={tw`h-14`}
              placeholderColor="#01503B"
              placeholder="Enter amount"
              value={amount}
              onChangeText={handleAmountChange}
              // keyboardType=""
              containerStyle={tw`border border-[#01503B]`}
            />
            {priceModalVisible && (
              <Text style={tw`text-red-600 font-RobotoRegular`}>{priceModalVisible}*</Text>
            )}
          </View>

          {/* <View style={tw`items-center`}>
          {isScanning.current ? (
            <LottieView
              source={require('../../assets/images/card.json')}
              autoPlay
              loop
              style={{ width: 400, height: 400 }}
            />
          ) : (
            <SvgXml xml={IconTapToPay} />
          )}
        </View> */}
          <View style={tw`items-center`}>
            {showAnimation ? (
              <LottieView
                source={
                  animationType === 'success'
                    ? require('../../assets/images/paymentProcess1.json')
                    : require('../../assets/images/paymentProcess1.json')
                }
                autoPlay
                loop={false}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <SvgXml xml={IconTapToPay} />
            )}
          </View>


          <TButton
            disabled={!amount || isNaN(amount)} // Disable button if amount is invalid or empty
            isLoading={isLoading && disconnectReaderGet} // Handle the loading state
            onPress={handleTapToPay}
            containerStyle={tw`${!amount ? 'bg-gray-400' : 'bg-primary'} w-full my-4`} // Conditional background color
            title={isLoading && disconnectReaderGet ? 'Processing...' : 'Collect Payment'} // Title changes based on loading state
          />

        </View>
        <NormalModal
          layerContainerStyle={tw`flex-1 justify-center animate-bounce`} // Ensure modal content aligns at the bottom
          containerStyle={tw`bg-black shadow-lg rounded-t-2xl p-6`} // Styling the modal itself
          visible={setUpErrorModalVisible}
          setVisible={setSetUpErrorModalVisible}
        >
          <View>
            <Text style={tw`text-white text-lg text-center font-RobotoRegular mb-2`}>
              Tap to does not support this device
            </Text>

            <View style={tw`mt-2`}>
              <View style={tw` w-full`}>

              </View>
              <View style={tw` mt-2`}>
                <Button
                  title="Okay"
                  style={tw`text-black px-6 font-RobotoRegular`}
                  containerStyle={tw`bg-gray-400`}
                  onPress={() => {
                    setSetUpErrorModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </NormalModal>
        <NormalModal
          layerContainerStyle={tw`flex-1 justify-center animate-bounce`} // Ensure modal content aligns at the bottom
          containerStyle={tw`bg-black shadow-lg rounded-t-2xl p-6`} // Styling the modal itself
          visible={priceModalVisible}
          setVisible={setPriceModalVisible}
        >
          <View>
            <Text style={tw`text-white text-lg text-center font-RobotoRegular mb-2`}>
              Please Enter Valid amount
            </Text>

            <View style={tw`mt-2`}>
              <View style={tw` w-full`}>

              </View>
              <View style={tw` mt-2`}>
                <Button
                  title="Okay"
                  style={tw`text-black px-6 font-RobotoRegular`}
                  containerStyle={tw`bg-gray-400`}
                  onPress={() => {
                    setPriceModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </NormalModal>

        <StatusBar backgroundColor={"#D8E7BC"} translucent={false} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TapToPay;

const styles = StyleSheet.create({});







