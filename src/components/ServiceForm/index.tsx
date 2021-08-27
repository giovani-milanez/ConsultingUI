import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button, Input } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { useToast } from 'react-native-fast-toast'

import { ServiceFormProps } from "../../global/interfaces";
import api from "../../plugins/axios";
import { dataURLtoFile } from "../../global/helpers";
import { theme } from "../../global/theme";


export function ServiceForm(props: ServiceFormProps) {
  var toast = useToast()
  const [title, setTitle] = useState<string>(props.service?.title || '');
  const [validTitle, setTitleValid] = useState<boolean>(true);
  const [description, setDescription] = useState<string>(props.service?.description || '');
  const [validDescription, setDescriptionValid] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState(props.service?.pictureUrl || '');
  const [imageChanged, setImageChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const descriptioninput = useRef<TextInput>(null);
  const titleInput = useRef<TextInput>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    console.log(pickerResult)
    setSelectedImage(pickerResult.uri);
    setImageChanged(true)
  }

  const save = async () => {
    setLoading(true)
    try {
      const method = props.service ? api.put : api.post
      const responseService = await method('/service', {
        id: props.service ? props.service.id : undefined,
        title: title,
        description: description,
        steps: [ { stepId: 1, order: 0, title: 'test', createData: '' } ]
      });
      if (selectedImage !== '' && imageChanged) {
        const serviceId = props.service ? props.service.id : responseService.data.id
        let fd = new FormData();
        if (!selectedImage.startsWith('file:')) {
          let file = dataURLtoFile(selectedImage, `service_${serviceId}`)          
          fd.append('file', file, file.name)
        } else {
          let localUri = selectedImage;
          let filename = localUri.split('/').pop();

          // Infer the type of the image
          let match = /\.(\w+)$/.exec(filename ?? '');
          let type = match ? `image/${match[1]}` : `image`;

          // Assume "photo" is the name of the form field the server expects
          let fb = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
          fd.append('file', fb);
          
        }
        await api.post(`/file/servicePic/${serviceId}`,fd)
        setImageChanged(false)
      }
      toast.show('Salvo!', { type: 'success', placement: 'top'})
    } catch (_err) {
      console.log(_err);
      toast.show('Erro ao salvar', { type: 'danger', placement: 'top'})
      setLoading(false)
    } finally {
      
    }
    
  };
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <View style={{alignContent: 'center' }}>
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
            numberOfLines={10}
          />
          <View>
            <Text style={{fontWeight: 'bold'}} >Foto da capa</Text>
            <Image 
              source={ selectedImage !== '' ? { uri: selectedImage } : require('../../assets/empty_product.jpg')} 
              style={{ width: 400, height: 150, resizeMode: 'stretch' }}
              />
              <TouchableOpacity onPress={openImagePickerAsync}>
              <Button
                title={selectedImage === '' ? 'Escolher foto da capa' : 'Trocar foto da capa'}
                containerStyle={{ width: '50%', backgroundColor: theme.colors.secondary }}
                buttonStyle={{backgroundColor: theme.colors.secondary}}
                onPress={openImagePickerAsync}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => save()}>
            <Button
              icon={{
                name: "save",
                size: 15,
                color: "white"
              }}
              title="Salvar"
              onPress={() => save()}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
}