import React from "react";
import { View } from "react-native";
import { CustomHeader } from "../../components/CustomHeader";
import { MyServices } from "../../components/MyServices";
import { MyServicesScreenProps } from "../../navigation";

export function MyServicesScreen({ route, navigation } : MyServicesScreenProps) {
  return (
    <View>
      <CustomHeader title="Meus Serviços" />
      <MyServices route={route} navigation={navigation}/>
    </View>
  )
}