import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Card, Rating } from "react-native-elements";
import { ConsultantScreenNavigationProp } from "../../navigation";
import { theme } from "../../global/theme";

interface User {
  id: number,
  name: string,
  rateCount: number,
  rateMeanStars: number,
  profilePicUrl: string,
  shortDescription: string
}

export interface Service {
  id: number,
  title: string,
  description: string,
  pictureUrl: string,
  user?: User
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard(props: ServiceCardProps) {
  const navigation = useNavigation<ConsultantScreenNavigationProp>();
  return (
    <Card>
      <Card.Title>
        {
          props.service.user ?
          (<TouchableOpacity onPress={() => navigation.navigate('Consultant', { id: props.service.user?.id || 0 })}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={{alignSelf: 'center'}}>
              <Avatar 
                source={props.service.user.profilePicUrl ? {uri: props.service.user.profilePicUrl} : require('../../assets/empty_avatar.jpg')}
                rounded
                size='medium'
              />
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 10}}>
              {props.service.user.rateCount > 0 && <Rating readonly imageSize={20} startingValue={props.service.user.rateMeanStars} tintColor="#ffffff" />}
              <Text>{props.service.user.name}</Text>
            </View>
          </View>
        </TouchableOpacity>) :
        (<TouchableOpacity onPress={() => navigation.navigate('Service', { id: props.service.id || 0 })}>
          <Text>{props.service.title}</Text>
         </TouchableOpacity>)
        }
        
      </Card.Title>
      <Card.Divider/>
      <TouchableOpacity onPress={() => navigation.navigate('Service', { id: props.service.id || 0 })}>
        <Card.Image resizeMode='stretch' source={ props.service.pictureUrl ? { uri: props.service.pictureUrl } : require('../../assets/empty_product.jpg')} />
      </TouchableOpacity>
      {
        props.service.user ?
        (
          <TouchableOpacity onPress={() => navigation.navigate('Service', { id: props.service.id || 0 })}>            
            <Text style={{marginTop: 10, marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: theme.colors.secondary}}>
              {props.service.title}
            </Text>
          </TouchableOpacity>
          ) :
        (<></>)
      }
      
    </Card>
  )
}