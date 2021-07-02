import React, { useRef, useState } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'

import IllustrationImg from '../../../assets/adaptive-icon.png'
import { styles } from './styles';
import { Input, Button, InputProps } from 'react-native-elements';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import api from '../../plugins/axios'

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList,'SignUp'>;


export function SignUp() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setEmailValid] = useState<boolean>(true);
  const [validPassword, setPasswordValid] = useState<boolean>(true);
  const [validName, setNameValid] = useState<boolean>(true);

  let emailInput = useRef<TextInput>(null);
  let passwordInput = useRef<TextInput>(null);
  let nameInput = useRef<TextInput>(null);

  const signup = () => {
  }
  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = re.test(email);
    setEmailValid(emailCheck);
    emailCheck || emailInput.current?.focus();
    return emailCheck;
  };

  const validatePassword = () => {
    const passwordCheck = password.length >= 6;
    setPasswordValid(passwordCheck);
    passwordCheck || passwordInput.current?.focus();
    return passwordCheck;
  };

  const validateName = () => {
    const nameCheck = name.length >= 3;
    setNameValid(nameCheck);
    nameCheck || nameInput.current?.focus();
    return nameCheck;
  };

  return (
      <View style={styles.container}>
        <Image 
          source={IllustrationImg} 
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <Input
            ref={nameInput}
            value={name}
            onChangeText={(text: string) => setName(text)}
            placeholder="Nome"
            returnKeyType="next"
            errorMessage={validName ? '' : 'Nome muito curto'}
            onSubmitEditing={() => {
              const isValid = validateName();
              if (isValid)
                emailInput.current?.focus();
            }}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            autoCorrect={false}
            blurOnSubmit={false}
          />
          <Input
            ref={emailInput}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            errorMessage={validEmail ? '' : 'Email inválido'}
            onSubmitEditing={() => {
              const isValid = validateEmail();
              if (isValid)
                passwordInput.current?.focus();
            }}
          />
          <Input
            ref={passwordInput}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            placeholder="Senha"
            secureTextEntry
            returnKeyType="go"
            errorMessage={
              validPassword ? '' : 'Mínimo de 6 caracteres'
            }
            onSubmitEditing={() => {
              const isValid = validatePassword();
              if (isValid)
                signup()
            }}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            autoCorrect={false}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={() => signup()}>
            <Button
              title="Criar conta"
              onPress={() => signup()}
            />
          </TouchableOpacity>
          <Text style={styles.subtitle}>
           ou
          </Text>
          <TouchableOpacity>
            <Button
            icon={{
              name: "facebook",
              size: 32,
              color: "white"
            }}
              title="Criar conta com Facebook"
            />
          </TouchableOpacity>
        </View>
      </View>
  )
}