import React from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { ServiceFormProps } from "../../global/interfaces";
import { Input, Button, Divider } from 'react-native-elements';

export function ServiceForm(props: ServiceFormProps) {
  if (!props.service) {
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView>
          <View>
            <Text>Novo servico Android</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      )
  }
  return (
      <View>
        <Text>Servico: {props.service?.title}</Text>
      </View>
    )
}