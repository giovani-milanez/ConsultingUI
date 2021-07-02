import React, { useRef, useState } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView
} from 'react-native'
import { Input, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-fast-toast'

// redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/userSlice'

import IllustrationImg from '../../../assets/adaptive-icon.png'
import { styles } from './styles';
import api from '../../plugins/axios'


type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList,'SignIn'>;

export function SignIn() {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setEmailValid] = useState<boolean>(true);
  const [validPassword, setPasswordValid] = useState<boolean>(true);
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const dispatch = useAppDispatch()
  const toast = useToast()

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = re.test(email);
    setEmailValid(emailCheck);
    return emailCheck;
  };

  const validatePassword = () => {
    const passwordCheck = password.length >= 6;
    setPasswordValid(passwordCheck);
    return passwordCheck;
  };

  const signIn = async () => {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();    
    if (isValidEmail && isValidPassword)
    {
      try {
        const response = await api.post('/auth/signin', {
          email: email,
          password: password,
        });
        // reset state
        setPasswordValid(true)
        setEmailValid(true)
        setEmail('')
        setPassword('')
        // update redux global state
        dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}))
        // navigate to home
        navigation.navigate('Home')
      } catch (_err) {
        console.log(_err);
        toast.show('Usuário ou senha inválidos', { type: 'danger', placement: 'top'})
      }
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView>
        <View>
          <Image 
            source={IllustrationImg} 
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.content}>
            <Text>{error}</Text>
            <Text style={styles.title}>
              Plataforma de {`\n`}
              consultoria online
            </Text>
            { Platform.OS === 'web' &&
              <Text style={styles.subtitle}>
              Contrate um consultor ou crie e define todas as etapas da sua consultoria
              </Text>
            }

            <Input
              ref={emailInput}
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={validEmail ? '' : 'Email inválido'}
              onSubmitEditing={() => {
                validateEmail();
                passwordInput.current?.focus();
              }}
              autoFocus={false}
              autoCapitalize="none"
              keyboardAppearance="dark"
              autoCorrect={false}
              blurOnSubmit={false}
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
                validatePassword();
                signIn()
              }}
              autoFocus={false}
              autoCapitalize="none"
              keyboardAppearance="dark"
              autoCorrect={false}
              blurOnSubmit={false}
            />
            <TouchableOpacity onPress={() => signIn()}>
              <Button
                title="Entrar"
                onPress={() => signIn()}
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
                title="Entrar com Facebook"
              />
            </TouchableOpacity>
            <Text style={styles.signupText}>
            Não tem uma conta? Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>      
    </KeyboardAvoidingView>      
  )
}