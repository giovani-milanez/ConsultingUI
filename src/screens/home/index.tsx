import React from 'react'
import {   
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native'
import { Tile, Button } from 'react-native-elements';
import Constants from 'expo-constants';

import { CustomHeader } from '../../components/CustomHeader';
import { useAppSelector } from '../../redux/hooks';
import { isLoggedIn } from '../../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
import { FindServicesScreenNavigationProp, MyServicesScreenNavigationProp } from '../../navigation';
import { theme } from '../../global/theme';


function ConsultantHome() {
  const navigation = useNavigation<MyServicesScreenNavigationProp>();
  const myServices = () => {
    navigation.navigate('MyServices')
  }
  return (
    <View style={{ alignItems:'center', padding: 50 }}>
      {/* <TouchableOpacity onPress={() => myServices()}> */}
        <Button
          title="Meus Serviços"
          containerStyle={{ width: '50%', backgroundColor: theme.colors.secondary }}
          buttonStyle={{backgroundColor: theme.colors.secondary}}
          onPress={() => myServices()}
        />
      {/* </TouchableOpacity> */}
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
  const finalHeight =  Dimensions.get('window').height - Constants.statusBarHeight;
  const navigation = useNavigation<FindServicesScreenNavigationProp>();
  return (
    <View style={{flex: 0, flexDirection:  Platform.OS == 'web' ? 'row'  : 'column'}}>
      <Tile
        imageSrc={require('../../assets/consultor.jpg')}
        imageProps={{resizeMode: 'cover'}}
        titleStyle={{fontSize: Platform.OS == 'web' ? 60 : 40, fontWeight: 'bold', textShadowColor: '#000000', textShadowRadius: 10}}
        captionStyle={{fontSize: Platform.OS == 'web' ? 24 : 18, fontWeight: 'bold', textShadowColor: '#000000', textShadowRadius: 10}}
        title="Consultor"
        featured
        caption="Crie seu serviço online, do pagamento ao atendimento 100% pela plataforma"
        width={ Platform.OS == 'web' ? (Dimensions.get('window').width / 2) - 8  : Dimensions.get('window').width }
        height={ Platform.OS == 'web' ? finalHeight - 60  : (finalHeight / 2) }
        onPress={() => navigation.navigate('Pricing')}
      />
      <Tile
        imageSrc={require('../../assets/cliente.jpg')}
        imageProps={{resizeMode: 'cover'}}
        titleStyle={{fontSize: Platform.OS == 'web' ? 60 : 40, fontWeight: 'bold', textShadowColor: '#000000', textShadowRadius: 10}}
        captionStyle={{fontSize: Platform.OS == 'web' ? 24 : 18, fontWeight: 'bold', textShadowColor: '#000000', textShadowRadius: 10}}
        title="Cliente"
        featured
        caption="Contrate um serviço de uma de nossas consultoras"
        width={ Platform.OS == 'web' ? (Dimensions.get('window').width / 2) - 8  : Dimensions.get('window').width }
        height={ Platform.OS == 'web' ? finalHeight - 60  : (finalHeight / 2) }
        onPress={() => navigation.navigate('FindServices')}
      />
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