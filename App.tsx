import React  from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-native-elements';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ToastProvider } from 'react-native-fast-toast'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { navigationRef } from './src/screens/RootNavigation';
import store from './src/redux/store'
import { theme } from "./src/global/theme"
import { SignIn } from './src/screens/signin';
import { SignUp } from './src/screens/signup';
import { Home } from './src/screens/home';
import { CustomDrawerContent } from './src/components/CustomDrawerContent';
import { useAppSelector } from './src/redux/hooks';
import { isLoggedIn } from './src/redux/userSlice';
import { AppNavigator, linking } from './src/components/AppNavigator';

const MyTheme = {
  dark: false,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)'
  },
};

// const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();
const persistor = persistStore(store);

export default function App() {
  // const loggedIn = useAppSelector(isLoggedIn)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>        
        <ThemeProvider theme={theme}>
          <ToastProvider 
            offset={100}
            placement="top"
          >
            <NavigationContainer theme={MyTheme} linking={linking} ref={navigationRef}>
              <AppNavigator />
            </NavigationContainer>
          </ToastProvider>        
        </ThemeProvider>
      </PersistGate>
    </Provider>    
  )
}