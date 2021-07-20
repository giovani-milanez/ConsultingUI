import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { ConsultantScreenProps } from "../../navigation";
import api from '../../plugins/axios';
import { CustomHeader } from '../../components/CustomHeader';
import { Avatar, Rating } from 'react-native-elements';
import { Service, ServiceCard } from '../../components/ServiceCard';

// interface Service {
//   id: number,
//   title: string,
//   description: string,
//   pictureUrl: string,
// }

interface Consultant {
  name: string,
  public_name: string,
  shortDescription: string,
  longDescription: string,
  rateCount: number,
  rateMeanStars: number,
  profilePicUrl: string,
  createdAt: Date,
  services: Service[]
}

export function Consultant({ route, navigation } : ConsultantScreenProps) {
  const [loading, setLoading] = useState(true);
  const [consultant, setConsultant] = useState<Consultant>();
  
  const findConsultant = () => {
    setLoading(true)
    api.get(`/public/consultant/${route.params.id}`)
    .then((res) => {
      setConsultant(res.data)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      findConsultant()

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
  else
    return (
      <View>
        <CustomHeader title={consultant?.name || ''} />
        <ScrollView>
          <View style={{
            width: Platform.OS === 'web' ? '60%' : '100%', 
            paddingHorizontal: 50,
            // alignContent: 'center',
            alignSelf: 'center'
          }}>
            <View style={{flexDirection: 'row', paddingTop: 50}}>
              <Avatar 
                source={consultant?.profilePicUrl ? {uri: consultant?.profilePicUrl} : require('../../assets/empty_avatar.jpg')}
                rounded
                size={Platform.OS === 'web' ? "xlarge" : 'large'}
                />
              <View>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', marginLeft: 15, marginTop: 0}}>
                  {consultant?.rateCount && consultant?.rateCount > 0 ? (<Rating readonly imageSize={20} startingValue={consultant?.rateMeanStars} />) : (<></>)}
                  <Text style={{fontSize: 30, fontWeight: '400'}}>{consultant?.name}</Text>
                </View>
                <Text style={{fontSize: 18, fontWeight: '400', margin: 0}}>{consultant?.shortDescription}</Text>
              </View>
            </View>
            <Text style={{fontSize: 16, fontWeight: '400', margin: 15}}>{consultant?.longDescription}</Text>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: Platform.OS === 'web' ? 'row' : 'column', paddingHorizontal: Platform.OS === 'web' ? 100 : 20}}>
          {
            consultant?.services.map(service => {
              return (
                <View key={service.id}style={{width: Platform.OS === 'web' ? '25%' : '100%'}}>
                  <ServiceCard service={service} />
                </View>
            )})
            }
          </View>
        </ScrollView>
      </View>
  )
}