import React, { useState } from 'react'
import {   
  View,
  Text,
  TouchableOpacity
} from 'react-native'
// import Modal from 'modal-react-native-web';

import { Button, Avatar } from 'react-native-elements';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { isLoggedIn, logout, firstName } from '../../redux/userSlice'
import { CustomHeader } from '../../components/CustomHeader';


export function Home() {
  const [visible, setVisible] = useState(false);
  const loggedIn = useAppSelector(isLoggedIn)
  const user = useAppSelector(state => state.user)

  return (
    <View>
      <CustomHeader title="Início" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button title="menu" onPress={() => navigation.toggleDrawer()} /> */}
      </View>
    </View>
  );
}