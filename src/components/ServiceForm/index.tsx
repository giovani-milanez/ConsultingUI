import React from "react";
import { View, Text } from "react-native";
import { Service } from "../ServiceCard";

interface ServiceFormProps {
  service: Service | undefined
}

export function ServiceForm(props: ServiceFormProps) {
  if (!props.service) {
    return (<View><Text>Novo servico</Text></View>)
  }
  return (
      <View>
        <Text>Servico: {props.service?.title}</Text>
      </View>
    )
}