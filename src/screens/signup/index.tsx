import React, { useRef, useState } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native'

// import IllustrationImg from '../../assets/girha_220.png'
import IllustrationImg from '../../../assets/adaptive-icon.png'
import { styles } from './styles';
import { Input, Button, ButtonGroup } from 'react-native-elements';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-fast-toast'

import api from '../../plugins/axios'
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/userSlice'
import { GoogleButton } from '../../components/GoogleButton'
import { FacebookButton } from '../../components/FacebookButton'
import { CustomHeader } from '../../components/CustomHeader';


type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList,'SignUp'>;


export function SignUp() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setEmailValid] = useState<boolean>(true);
  const [validPassword, setPasswordValid] = useState<boolean>(true);
  const [validName, setNameValid] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  let emailInput = useRef<TextInput>(null);
  let passwordInput = useRef<TextInput>(null);
  let nameInput = useRef<TextInput>(null);
  const dispatch = useAppDispatch()
  const toast = useToast()
  const buttons = ['Contratar Serviços', 'Prestar Serviços']


  const signup = async () => {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isNamePassword = validateName();
    if (isValidEmail && isValidPassword && isNamePassword)
    {
      setLoading(true)
      try {
        const response = await api.post('/auth/signup', {
          name: name,
          email: email,
          password: password,
          isConsultant: index === 1
        });
        // reset state
        setNameValid(true)
        setPasswordValid(true)
        setEmailValid(true)
        setName('')
        setEmail('')
        setPassword('')
        setIndex(0)
        // update redux global state
        dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken, expiration: response.data.expiration, info: response.data.user}))
        // navigate to home
        navigation.navigate('Home')
      } catch (_err) {
        console.log(_err.response.data);
        toast.show(_err.response.data.message, { type: 'danger', placement: 'top', duration: 5000 })
      } finally {
        setLoading(false)
      }
    }
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

  const signUpExternal = async (token: string, provider: string) => {
    try {
      const response = provider === 'google' ? 
        await api.post(`/auth/signup/${provider}`, {jwtIdToken: token,isConsultant: index === 1}) :
        await api.post(`/auth/signup/${provider}`, {accessToken: token,isConsultant: index === 1})
      // reset state
      setNameValid(true)
      setPasswordValid(true)
      setEmailValid(true)
      setName('')
      setEmail('')
      setPassword('')
      setIndex(0)
      // update redux global state
      dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken, expiration: response.data.expiration, info: response.data.user}))
      // navigate to home
      navigation.navigate('Home')
    } catch (_err) {
      console.log(_err.response.data);
      if (_err.response.status === 401) {
        toast.show(`Não foi possível criar a conta com ${provider}`, { type: 'danger', placement: 'top', duration: 5000 })
      }
      else {
        toast.show(_err.response.data.message, { type: 'danger', placement: 'top', duration: 5000 })
      }
    }
  }

  const onError = (provider: string) => {
    toast.show(`Não foi possível criar a conta com ${provider}`, { type: 'danger', placement: 'top', duration: 5000 })
  }

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <CustomHeader title="Criar Conta" />
        <View style={styles.container}>
          <Image 
            source={IllustrationImg} 
            style={styles.image}
            resizeMode="cover"
          />
          <Text>{token}</Text>
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
            <Text style={styles.subtitle}>
            O que você busca ?
            </Text>
            <ButtonGroup
              onPress={setIndex}
              selectedIndex={index}
              buttons={buttons}
            />
            <TouchableOpacity onPress={() => signup()}>
              <Button
                title="Criar conta"
                onPress={() => signup()}
                loading={loading}
                disabled={loading}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 15, textAlign: 'center',}}>
            ou
            </Text>
            <GoogleButton
              title="Criar conta com Google"
              loading={loading}
              onSucess={(token: string) => { signUpExternal(token, 'google') }}
              onError={() => onError('google')}
              onStart={() => setLoading(true)}
              onEnd={() => {}}
            />
            <FacebookButton
              title="Criar conta com Facebook"
              loading={loading}
              onSucess={(token: string) => { signUpExternal(token, 'facebook') }}
              onError={() => onError('facebook')}
              onStart={() => setLoading(true)}
              onEnd={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}