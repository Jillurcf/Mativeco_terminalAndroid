// import 'react-native-url-polyfill/auto'; // ✅ Polyfill URL and URLSearchParams early
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '../context/ThemeContext';
import Routes from './Routs';
import { StripeTerminalProvider } from '@stripe/stripe-terminal-react-native';
import { LogBox } from 'react-native';
// import { Provider } from 'react-redux';
// import store from '../redux/store';
LogBox.ignoreAllLogs()
const AppRoutes = () => {
  const fetchTokenProvider = async () => {
    try {
      const response = await fetch('http://103.186.20.114:8084/api/stripe/terminal/connection_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch secret key');
      }

      const { secret} = await response.json();
      console.log("Secret++++++++++++++++++++++", secret, "secret++++++++++++++++++++")
      return secret;
    } catch (error) {
      console.error('Stripe terminal token fetch error:', error);
      return ''; // return empty string to prevent crashes
    }
  };

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeTerminalProvider logLevel='verbose' 
      tokenProvider={fetchTokenProvider}
      // tokenProvider={fetchTokenProvider}
      
      >
        <ThemeProvider>
          {/* Uncomment if you use Redux */}
          {/* <Provider store={store}> */}
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          {/* </Provider> */}
        </ThemeProvider>
      </StripeTerminalProvider>
    </GestureHandlerRootView>
  </SafeAreaView>
);
}

export default AppRoutes;
