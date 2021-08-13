import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { Service } from "../ServiceCard";
import api from "../../plugins/axios";
import { MyServicesScreenProps } from "../../navigation";
import { useFocusEffect } from "@react-navigation/native";

export function MyServices({ route, navigation } : MyServicesScreenProps) {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  
  const findServices = () => {
    setLoading(true)
    api.get(`/service`)
    .then((res) => {
      setServices(res.data)
    })
    .finally(() => {
      setLoading(false)
    })
  }
 
  useFocusEffect(
    React.useCallback(() => {
      findServices()

      return () => {
        // navigation.setParams({id: undefined});
      };
    }, [route])
  ); 

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  if (!services.length) {
    return (
      <View>
        <Text>Nenhum servico registrado</Text>
        <Text>Crie um servico</Text>
      </View>
    )
  }

  if (route.params) {
    const foundService = services.find(x => x.id === route.params.id)
    return (
      <View>
        {
          foundService ? (
          <>
            <Text>Selecionado: { foundService?.title } </Text>
          </>) : (
          <>
            <Text>Servico nao encontrado</Text>
          </>)
        }        
      </View>
    )
  }

  return (
    <View>
       {services.map(service => 
        <View key={service.id}>
          <Text>{service.title}</Text>
        </View>
       )}
    </View>
  )
}