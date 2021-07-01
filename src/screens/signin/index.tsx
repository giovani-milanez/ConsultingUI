import React, { useRef, useState } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'
import { Input, Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';

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
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const dispatch = useAppDispatch()

  const signIn = async () => {
      try {
        const response = await api.post('/auth/signin', {
          email: email,
          password: password,
        });
        dispatch(login({accessToken: response.data.accessToken, refreshToken: response.data.refreshToken}))
        navigation.navigate('Home')
      } catch (_err) {
        console.log(_err);
        setError('Houve um problema com o login, verifique suas credenciais!');
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
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={validEmail ? '' : 'Please enter a valid email address'}
            />
            <Input
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              placeholder="Senha"
              secureTextEntry
              returnKeyType="next"
              errorMessage={
                validPassword ? '' : 'Please enter at least 8 characters'
              }
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