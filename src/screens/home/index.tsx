import React, { useState } from 'react'
import {   
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { Button } from 'react-native-elements';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/userSlice'

import api from '../../plugins/axios'

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Home'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function Home({ route, navigation }: Props) {
  const [service, setService] = useState<string>('');
  const accessToken = useAppSelector(state => state.user.accessToken)
  const refreshToken = useAppSelector(state => state.user.refreshToken)

  const getServices = async () => {
    try {
      const response = await api.get('/service');
      setService(response.data[0].title);
    } catch (_err) {
      if (_err.response) {
        // Request made and server responded
        console.log(_err.response.data);
        console.log(_err.response.status);
        console.log(_err.response.headers);
      } else if (_err.request) {
        // The request was made but no response was received
        console.log(_err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', _err.message);
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Access Token:</Text>
      <Text>{accessToken}</Text>
      <Text> </Text>
      <Text>Refresh Token:</Text>
      <Text>{refreshToken}</Text>
      <TouchableOpacity onPress={() => getServices()}>
        <Button
          title="Serviços"
          onPress={() => getServices()}
        />
      </TouchableOpacity>
      <Text>Serviço: {service}</Text>
    </View>
  );
}