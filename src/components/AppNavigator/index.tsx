import React from "react";
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomDrawerContent } from "../CustomDrawerContent";

import { useAppSelector } from "../../redux/hooks";
import { isLoggedIn } from "../../redux/userSlice";

import { SignIn } from "../../screens/signin";
import { Home } from "../../screens/home";
import { SignUp } from "../../screens/signup";
import { FindServices } from "../../screens/find-services";
import { Pricing } from "../../screens/pricing";

const Drawer = createDrawerNavigator<RootStackParamList>();

export const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    screens: {
      Home: '',
      SignIn: 'entrar',
      SignUp: 'cadastrar',
      FindServices: 'servicos',
      Pricing: 'seja-consultor'
    }
  },
};

export function AppNavigator() {
  const loggedIn = useAppSelector(isLoggedIn)
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      // openByDefault
      // drawerType={isLargeScreen ? 'permanent' : }
      // drawerStyle={isLargeScreen ? null : { width: '100%' }}
      backBehavior='history'
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {
        loggedIn ? (
          <>
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
            <Drawer.Screen name="FindServices" component={FindServices} options={{ title: 'Serviços' }} />
            <Drawer.Screen name="Pricing" component={Pricing} options={{ title: 'Seja um consultor' }} />
            <Drawer.Screen name="SignIn" component={SignIn} options={{ title: 'Entrar' }} />
            <Drawer.Screen name="SignUp" component={SignUp} options={{ title: 'Criar conta' }} />
          </>
        )
      }            
    </Drawer.Navigator>
  )
}