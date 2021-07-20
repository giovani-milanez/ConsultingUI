import React, { useState } from 'react'
import { ScrollView, View, Text, Platform, TouchableOpacity } from 'react-native';
import { Button, Icon, Image, Divider, Avatar, Rating } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import { ServiceScreenProps } from "../../navigation";
import api from '../../plugins/axios';
import { Service } from '../../components/ServiceCard';
import { CustomHeader } from '../../components/CustomHeader';

export function ServiceScreen({ route, navigation } : ServiceScreenProps) {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<Service>();
  
  
  const findService = () => {
    setLoading(true)
    api.get(`/public/service/${route.params.id}`)
    .then((res) => {
      setService(res.data)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      findService()

      return () => {
        // navigation.setParams({id: undefined});
      };
    }, [route])
  ); 


  if (loading)
    return (
      <View>
        <CustomHeader title="Serviços" />
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      </View>
    )
  
    return (
      <View>
        <CustomHeader title={service?.title || ''}/>
        <ScrollView>
          <View style={{
            width: Platform.OS === 'web' ? '60%' : '100%', 
            paddingHorizontal: 50,
            paddingTop: 30,
            // alignContent: 'center',
            alignSelf: 'center'
          }}>
            <Text style={{fontSize: Platform.OS === 'web' ? 38 : 24}}>{service?.title}</Text>
            <View style={{paddingTop: 5, flexDirection: Platform.OS == 'web' ? 'row' : 'column'}}>
              <Image 
                source={ service?.pictureUrl ? { uri: service?.pictureUrl } : require('../../assets/empty_product.jpg')} 
                style={{ width: 400, height: 200}}
                resizeMode='stretch'/>
              <Text style={{fontSize: 18}}>{service?.description} </Text>
            </View>
            <View style={{ paddingTop: 10, width: Platform.OS === 'web' ? '25%' : '100%'}}>
              <Text style={{fontSize: 30, color: 'green'}}>
                R$ 300,00
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Button
                 icon={
                  <Icon
                    name="shopping-cart"
                    type='font-awesome'
                    // size={15}
                    color="white"
                  />
                  }
                  title="  Comprar"
                  onPress={() => {}}
                />
              </TouchableOpacity>
            </View>
            <Divider style={{paddingTop: 20}} />
            <Text>Conheça esta consultora</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Consultant', { id: service?.user?.id || 0 }) }}>
              <View style={{flexDirection: 'row', paddingTop: 10}}>
                <Avatar 
                  source={service?.user?.profilePicUrl ? {uri: service?.user?.profilePicUrl} : require('../../assets/empty_avatar.jpg')}
                  rounded
                  size={Platform.OS === 'web' ? "large" : 'medium'}
                  />
                <View>                
                  <View style={{flexDirection: 'column', alignItems: 'flex-start', marginLeft: 15, marginTop: 0}}>
                    {service?.user?.rateCount && service?.user?.rateCount > 0 ? (<Rating readonly imageSize={20} startingValue={service?.user?.rateMeanStars} />) : (<></>)}
                    <Text style={{fontSize: 24, fontWeight: '400'}}>{service?.user?.name}</Text>
                  </View>
                  <Text style={{fontSize: 14, fontWeight: '400', margin: 0}}>{service?.user?.shortDescription}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
}