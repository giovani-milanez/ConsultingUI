import React, { useState } from 'react'
import {   
  View,
  Text
} from 'react-native'

import { Button, Avatar } from 'react-native-elements';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { isLoggedIn, logout } from '../../redux/userSlice'

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function Home({ route, navigation }: Props) {
  const loggedIn = useAppSelector(isLoggedIn)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => { 
        
        return (
        !loggedIn ?
        <View style={{flexDirection:'row', alignItems: 'center', paddingRight: 20}}>
          <Button 
            containerStyle={{marginRight: 10, marginBottom: 0, backgroundColor: '#1F7CE9', borderRadius: 3, height: 40 }} 
            buttonStyle={{backgroundColor: '#1F7CE9' }} 
            onPress={() => navigation.navigate('SignIn')} title="Entrar" />
        </View> :
        <View style={{flexDirection:'row', alignItems: 'center', paddingRight: 20}}>
          <Avatar 
            source={{uri: user.info.profilePicUrl}}
            rounded
          />
          <Text>{user.info.name}</Text>
          <Button 
            containerStyle={{marginBottom: 0, backgroundColor: '#1F7CE9', borderRadius: 3, height: 40, width: 40 }} 
            buttonStyle={{backgroundColor: '#1F7CE9' }} 
            onPress={() => dispatch(logout())} title="Sair" />
        </View>
      )
    },
    });
  }, [navigation, loggedIn]);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    </View>
  );
}