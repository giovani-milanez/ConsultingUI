// react
import React, { useRef, useState } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Image
} from 'react-native'
import { Input, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-fast-toast'

// redux
import { useAppDispatch } from '../../redux/hooks'
import { login } from '../../redux/userSlice'

// local
import IllustrationImg from '../../../assets/adaptive-icon.png'
import { styles } from './styles';
import api from '../../plugins/axios'
import { GoogleButton } from '../../components/GoogleButton'
import { FacebookButton } from '../../components/FacebookButton'
import { CustomHeader } from '../../components/CustomHeader';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList,'SignIn'>;

export function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setEmailValid] = useState<boolean>(true);
  const [validPassword, setPasswordValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
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

  const signInExternal = async (token: string, provider: string) => {
    setLoading(true)
    try {
      const response = provider === 'google' ? 
        await api.post(`/auth/signin/${provider}`, { jwtIdToken: token }) :
        await api.post(`/auth/signin/${provider}`, { accessToken: token });
      // reset state
      setPasswordValid(true)
      setEmailValid(true)
      setEmail('')
      setPassword('')
      // update redux global state
      dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken, expiration: response.data.expiration, info: response.data.user}))
      // navigate to home
      navigation.navigate('Home')
    } catch (_err) {
      if (_err.response) {
        if (_err.response.status === 401) {
          toast.show(`Não foi possível entrar com ${provider}`, { type: 'danger', placement: 'top', duration: 10000 })
        }
        else {
          toast.show(_err.response.data.message, { type: 'danger', placement: 'top', duration: 10000 })
        }
      } else {
        toast.show(`Não foi possível entrar com ${provider}`, { type: 'danger', placement: 'top', duration: 10000 })
      }
      setLoading(false)
    } finally {
      
    }
  }

  const signIn = async () => {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();    
    if (isValidEmail && isValidPassword)
    {
      setLoading(true)
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
        dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken, expiration: response.data.expiration, info: response.data.user}))
        // navigate to home
        navigation.navigate('Home')
      } catch (_err) {
        console.log(_err);
        toast.show('Usuário ou senha inválidos', { type: 'danger', placement: 'top'})
        setLoading(false)
      } finally {
        
      }
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <CustomHeader title="Entrar" />
        <View style={styles.container}>
          <Image 
            source={IllustrationImg}
            style={styles.image}
            resizeMode="cover"
            // PlaceholderContent={<ActivityIndicator />}
          />
          <View style={styles.content}>
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
                loading={loading}
                disabled={loading}
              />
            </TouchableOpacity>
            <Text style={styles.subtitle}>
            ou
            </Text>
            <GoogleButton
              title="Entrar com Google"
              loading={loading}
              onSucess={(token: string) => signInExternal(token, 'google')}
              onError={() => { toast.show('Não foi possível entrar com Google', { type: 'danger', placement: 'top', duration: 5000 }) }}
              onStart={() => setLoading(true)}
              onEnd={() => {}}
            />
            <FacebookButton
              title="Entrar com Facebook"
              loading={loading}
              onSucess={(token: string) => signInExternal(token, 'facebook')}
              onError={() => toast.show('Não foi possível entrar com Facebook', { type: 'danger', placement: 'top', duration: 5000 })}
              onStart={() => setLoading(true)}
              onEnd={() => setLoading(false)}
            />
            <View style={styles.signupTextContainer}>
              <Text style={styles.signupText}> Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')} ><Text style={styles.signupTextBtn}> Cadastre-se </Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>      
     </KeyboardAvoidingView>      
  )
}