import React  from 'react';
import { ThemeProvider } from 'react-native-elements';
import { 
  StatusBar,
  ScrollView,
  View,
  Text
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { theme } from "./src/global/theme"
import { SignIn } from './src/screens/signin';
import { SignUp } from './src/screens/signup';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

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
    <ThemeProvider theme={theme}>
      {/* <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={theme.mainContainer}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />         */}
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator 
              initialRouteName="SignUp"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.secondary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
              <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Entrar' }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Criar conta' }} />
              <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        {/* </ScrollView> */}
    </ThemeProvider>
  )
}