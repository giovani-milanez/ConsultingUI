import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';

import { ConsultantScreenProps } from "../../navigation";
import api from '../../plugins/axios';

interface Service {
  id: number,
  title: string,
  description: string,
  pictureUrl: string,
}

interface Consultant {
  name: string,
  public_name: string,
  short_description: string,
  long_description: string,
  rateCount: number,
  rateMeanStars: number,
  profilePicUrl: string,
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

  useEffect(() => {
    findConsultant()
  }, []);

  if (loading)
    return (<View><Text>Loading...</Text></View>)
  else
    return (
    <View>
      <Text>{consultant?.name}</Text>
      <Text>{consultant?.short_description}</Text>
      <Text>{consultant?.long_description}</Text>
      {
        consultant?.services.map(service => {
          return (
          <View key={service.id}>
            <Text>Servico:</Text>
            <Text>{service.title}</Text>
            <Text>{service.description}</Text>
          </View>)
        })
      }
    </View>
  )
}