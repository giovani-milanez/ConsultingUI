import React, { useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";
import { ServiceFormProps } from "../../global/interfaces";


export function ServiceForm(props: ServiceFormProps) {
  const [title, setTitle] = useState<string>(props.service?.title || '');
  const [validTitle, setTitleValid] = useState<boolean>(true);
  const titleInput = useRef<TextInput>(null);
  const [description, setDescription] = useState<string>(props.service?.description || '');
  const [validDescription, setDescriptionValid] = useState<boolean>(true);
  const descriptioninput = useRef<TextInput>(null);

    return (
      <View style={{ paddingHorizontal: 50, alignContent: 'center' }}>
        <Input
          ref={titleInput}
          value={title}
          onChangeText={(text: string) => setTitle(text)}
          label="Titulo"
          placeholder="Coloracao Pessoal"
          returnKeyType="next"
          errorMessage={validTitle ? '' : 'Titulo inválido'}
          onSubmitEditing={() => {
            descriptioninput.current?.focus();
          }}
          autoFocus={false}
          autoCapitalize="none"
          keyboardAppearance="dark"
          autoCorrect={false}
          blurOnSubmit={false}
        />
        <Input
          ref={descriptioninput}
          value={description}
          onChangeText={(text: string) => setDescription(text)}
          label="Descricao"
          placeholder="Neste servico iremos..."
          returnKeyType="next"
          errorMessage={validDescription ? '' : 'Descricao inválido'}
          onSubmitEditing={() => {
            descriptioninput.current?.focus();
          }}
          autoFocus={false}
          autoCapitalize="none"
          keyboardAppearance="dark"
          autoCorrect={false}
          blurOnSubmit={false}
          multiline
          numberOfLines={15}
        />
      </View>)     
}