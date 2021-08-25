import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text } from "react-native";
import { CustomHeader } from "../../components/CustomHeader";
import { MyServices } from "../../components/MyServices";
import { Service } from "../../components/ServiceCard";
import { MyServicesScreenProps } from "../../navigation";
import api from "../../plugins/axios";
import { ServiceForm } from "../../components/ServiceForm";

export function MyServicesScreen({ route, navigation } : MyServicesScreenProps) {
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
        <CustomHeader title="Meus Serviços" />
        <Text>Loading...</Text>
      </View>
    )
  }

  if (route.params) {
    const selectedService = services.find(x => x.id === route.params.id)
    if (selectedService || route.params.id === 0) {
      return (
        <View>
          <CustomHeader title="Meus Serviços" />
          <ServiceForm service={selectedService} />
        </View>
      )
    } else {
      return (
        <View>
          <CustomHeader title="Meus Serviços" />
          <Text> Servico nao encontrado </Text>
        </View>
      )
    }
  }

  return (
    <View>
      <CustomHeader title="Meus Serviços" />
      <MyServices navigation={navigation} services={services}/>
    </View>
  )
}