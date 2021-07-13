import React from 'react'
import {   
  View,
  StyleSheet,
  Text
} from 'react-native'

import Constants from 'expo-constants';

import { CustomHeader } from '../../components/CustomHeader';
import { useAppSelector } from '../../redux/hooks';
import { isLoggedIn } from '../../redux/userSlice';


function ConsultantHome() {
  return (
    <View>
      <Text>Bem vindo, você é um consultor</Text>
    </View>
  )
}

function ClientHome() {
  return (
    <View>
      <Text>Bem vindo, você é um cliente</Text>
    </View>
  )
}

function LoggedOutHome() {
  return (
    <View>
      <Text>Você nao está logado</Text>
    </View>
  )
}

export function Home() {
  const user = useAppSelector(state => state.user.info)
  const loggedIn = useAppSelector(isLoggedIn)
  return (
    <View>
      <CustomHeader title="Início" />
      { loggedIn && user.isConsultant ? (<ConsultantHome />) :
        loggedIn && !user.isConsultant ? (<ClientHome />) :
        (<LoggedOutHome/>)
      }
    </View>
  );
}