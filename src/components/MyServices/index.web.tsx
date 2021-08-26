import React from "react";
import { View, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { MyServicesProps } from "../../global/interfaces";

import { theme } from "../../global/theme";

export function MyServices(props : MyServicesProps) {

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <ListItem key='new' bottomDivider 
          onPress={() => { props.navigation.navigate('MyServices', { id: 0 }) }}
          containerStyle={
            {
              borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
              borderRightWidth: Platform.OS === 'web' ? 1 : 0,
              borderBottomColor: theme.colors.primary,
              borderBottomWidth: 2, 
              width: Platform.OS === 'web' ? '33%' : '100%',
              alignSelf: 'center'
            }}>
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: 'bold' }}>Criar Serviço</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron name='add-circle' color={theme.colors.blue} />
        </ListItem>
        {
          props.services.map(service => 
            <ListItem key={service.id} bottomDivider
            onPress={() => { props.navigation.navigate('MyServices', { id: service.id }) }}
            containerStyle={
              {
                borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
                borderRightWidth: Platform.OS === 'web' ? 1 : 0,
                width: Platform.OS === 'web' ? '33%' : '100%',
                alignSelf: 'center'
              }}>
              <ListItem.Content>
                <ListItem.Title>{service.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          )
       }
      </View>
    </View>
  )
}