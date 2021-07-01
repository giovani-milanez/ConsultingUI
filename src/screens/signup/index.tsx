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
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList,'SignUp'>;

// type Props = {
//   navigation: SignInScreenNavigationProp;
// };


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
    const emailValid = validateEmail();
    // const passwordValid = validatePassword();
    // const nameValid = validateName();
  }
  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = re.test(email);
    setEmailValid(emailCheck);
    emailCheck || emailInput.current?.focus();
    return emailCheck;
  };

  const validatePassword = () => {
    const nameCheck = name.length >= 3;
    setNameValid(nameCheck);
    nameCheck || nameInput.current?.focus();
    return nameCheck;
  };

  const validateName = () => {
    const passwordCheck = password.length >= 8;
    setPasswordValid(passwordCheck);
    passwordCheck || passwordInput.current?.focus();
    return passwordCheck;
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
            errorMessage={validName ? '' : 'Please enter a valid name'}
          />
          <Input
            ref={emailInput}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            errorMessage={validEmail ? '' : 'Please enter a valid email address'}
            onChange={() => {
              validateEmail();
            }}
          />
          <Input
            ref={passwordInput}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            placeholder="Senha"
            secureTextEntry
            returnKeyType="next"
            errorMessage={
              validPassword ? '' : 'Please enter at least 8 characters'
            }
          />
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <Button
              title="Criar conta"
              onPress={() => navigation.navigate('Details')}
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