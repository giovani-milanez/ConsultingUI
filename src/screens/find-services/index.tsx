import React from 'react'
import {   
  View,
  Text,
} from 'react-native'
import { CustomHeader } from '../../components/CustomHeader'

export function FindServices() {
  return (
    <View>
      <CustomHeader title="Serviços" />
      <Text>Pesquise um serviço</Text>
    </View>
  )
}