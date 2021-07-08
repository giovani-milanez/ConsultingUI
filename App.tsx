import React  from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-fast-toast'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

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

let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>        
        <ThemeProvider theme={theme}>
          <ToastProvider 
            offset={100}
            placement="top"
          >
            <NavigationContainer theme={MyTheme} ref={navigationRef}>
              <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                  headerStyle: {
                    // backgroundColor: Platform.OS === 'web' ? theme.mainContainer.backgroundColor : theme.mainContainer.backgroundColor,
                    backgroundColor: theme.colors.primary
                    
                  },
                  headerTintColor: theme.colors.secondary,
                  headerTitleStyle: {
                    fontWeight: 'normal',
                  },
                  // headerTitle:  (props: StackHeaderTitleProps) => { return <HeaderTitle {...props}/> }
                }}>
                <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Entrar' }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Criar conta' }} />
                <Stack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
              </Stack.Navigator>
            </NavigationContainer>
          </ToastProvider>        
        </ThemeProvider>
      </PersistGate>
    </Provider>    
  )
}