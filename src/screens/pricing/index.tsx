import React from 'react'
import { useNavigation } from '@react-navigation/native'

import {   
  Platform,
  View,
  ScrollView
} from 'react-native'
import { 
  PricingCard 
} from 'react-native-elements'

import { CustomHeader } from '../../components/CustomHeader'
import { theme } from '../../global/theme'
import { SignUpScreenNavigationProp } from '../../navigation'

export function Pricing() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  return (
    <View>
      <CustomHeader title="Seja um Consultor" />
      <ScrollView style={{width: Platform.OS === 'web' ? '50%' : '100%', alignSelf: 'center'}}>
        <PricingCard
          color={theme.colors.primary}
          title="Você só paga se vender"
          price="9.99%"
          info={['Crie serviços completos e customizados', 'Workflow único', 'Histórico de atendimentos', 'Receba pela plataforma', 'vídeos, chat, formulários, agenda, testes e muito mais!']}
          button={{ title: 'Criar conta'}}
          onButtonPress={() => { navigation.navigate('SignUp') }}
        />
      </ScrollView>
    </View>
  )
}