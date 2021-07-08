import React from "react";
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomDrawerContent } from "../CustomDrawerContent";

import { useAppSelector } from "../../redux/hooks";
import { isLoggedIn } from "../../redux/userSlice";

import { SignIn } from "../../screens/signin";
import { Home } from "../../screens/home";
import { SignUp } from "../../screens/signup";

const Drawer = createDrawerNavigator<RootStackParamList>();

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
            <Drawer.Screen name="SignIn" component={SignIn} options={{ title: 'Entrar' }} />
            <Drawer.Screen name="SignUp" component={SignUp} options={{ title: 'Criar conta' }} />
          </>
        )
      }            
    </Drawer.Navigator>
  )
}