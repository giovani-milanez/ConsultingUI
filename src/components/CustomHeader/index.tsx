import React from "react";
import {   
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { 
  Header, 
  Icon, 
  Button, 
  Avatar  
} from "react-native-elements";
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppSelector } from '../../redux/hooks'
import { isLoggedIn, firstName } from '../../redux/userSlice'
import { HomeScreenNavigationProp } from "../../navigation";
import { theme } from "../../global/theme";

function LeftComponent(props : CustomHeaderProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  return (
    <TouchableOpacity onPress={() => {navigation.toggleDrawer()}}>
      <Icon onPress={() => {navigation.toggleDrawer()}} name="menu" color='#fff' style={{color: '#fff'}} />
    </TouchableOpacity>
  )
}

function CenterComponent(props : CustomHeaderProps) {
  return (
    <Text style={{color: theme.colors.secondary, fontSize: 18}}>{props.title}</Text>
  )
}

function RightComponent(props : CustomHeaderProps) {
  const loggedIn = useAppSelector(isLoggedIn)
  const user = useAppSelector(state => state.user)
  const name = user ? useAppSelector(firstName) : ''
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const route = useRoute();
  
  if (route.name === 'SignIn' || route.name === 'SignUp')
  {
    return (<View />)
  }
  return (
    !loggedIn ?
    <View style={{flexDirection:'row', alignItems: 'center', paddingRight: 10}}>
      <Button 
        containerStyle={{marginRight: 10, marginBottom: 0, backgroundColor: '#1F7CE9', borderRadius: 3, height: 40}} 
        buttonStyle={{backgroundColor: '#1F7CE9' }} 
        onPress={() => navigation.navigate('SignIn')} title="Entrar" />
    </View> :
    <View>
      <TouchableOpacity onPress={() => {navigation.toggleDrawer()}} style={{flexDirection:'row', alignItems: 'center', paddingRight: 20}}>
        <Avatar 
          source={{uri: user.info.profilePicUrl}}
          rounded
        />
        <Text style={{fontSize: 14, fontWeight: '400', margin: 5}}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

interface CustomHeaderProps {
  title: string  
}

export function CustomHeader(props : CustomHeaderProps) {  
  return (
    <Header
      leftComponent={<LeftComponent {...props} />}
      leftContainerStyle={{justifyContent: 'center'}}
      centerComponent={<CenterComponent {...props} />}
      centerContainerStyle={{justifyContent: 'center'}}
      rightComponent={<RightComponent {...props} />}
    />
  )
}