
import React, { useState } from "react";
import {   
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableNativeFeedback,
  ScrollViewProps
} from 'react-native'
import { Icon, Avatar, Divider } from "react-native-elements";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';

import { useToast } from 'react-native-fast-toast'

import { styles } from "./styles";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isLoggedIn, logout } from "../../redux/userSlice";
import api from "../../plugins/axios";


export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const user = useAppSelector(state => state.user.info)
  const loggedIn = useAppSelector(isLoggedIn)
  const dispatch = useAppDispatch()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false);

  const onLogout = async () => {
    setLoading(true)
    try {
      await api.get('/auth/revoke');
      props.navigation.closeDrawer(); 
      setLoading(false)
      dispatch(logout());
      props.navigation.navigate('Home')
    } catch (_err) {
      toast.show('Falha ao sair', { type: 'danger', placement: 'top'})
      setLoading(false)
    } finally {      
    }
  }
  return (
    <View>
        <ScrollView>
          <SafeAreaView
            style={styles.container}
          >
            {
              loggedIn &&
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 50}}>

                <Avatar 
                  source={{uri: user.profilePicUrl}}
                  rounded
                  size="large"
                />
                <Text style={{fontSize: 14, fontWeight: '400', margin: 5}}>{user.name}</Text>
              </View>

            }
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              {
                loggedIn && (
                <View style={{paddingTop: 10}}>
                  <Divider style={{width: '95%', alignSelf: 'center'}} orientation="horizontal" />
                  <DrawerItem
                    label="Sair"
                    onPress={onLogout}
                  />
                </View>
                )
              }
            </DrawerContentScrollView>
          </SafeAreaView>
        </ScrollView>   

      </View>
  )
}