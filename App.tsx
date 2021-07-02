import React  from 'react';
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-fast-toast'

import { navigationRef } from './src/screens/RootNavigation';
import store from './src/redux/store'
import { theme } from "./src/global/theme"
import { SignIn } from './src/screens/signin';
import { SignUp } from './src/screens/signup';
import { Home } from './src/screens/home';

const Stack = createStackNavigator<RootStackParamList>();

const MyTheme = {
  dark: false,
  colors: {
    primary: theme.colors.primary,
    background: theme.mainContainer.backgroundColor,
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)'
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider 
          offset={100}
          placement="top"
        >
          <NavigationContainer theme={MyTheme} ref={navigationRef}>
            <Stack.Navigator 
              initialRouteName="SignUp"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.secondary,
                headerTitleStyle: {
                  fontWeight: 'normal',
                },
              }}>
              <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Entrar' }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Criar conta' }} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </ToastProvider>        
      </ThemeProvider>
    </Provider>    
  )
}