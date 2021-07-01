import React, { useRef, useState } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'

import IllustrationImg from '../../../assets/adaptive-icon.png'
import { styles } from './styles';
import { Input, Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList,'SignIn'>;

// type Props = {
//   navigation: SignInScreenNavigationProp;
// };


export function SignIn() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validEmail, setEmailValid] = useState<boolean>(true);
  const [validPassword, setPasswordValid] = useState<boolean>(true);

  return (
      <View style={styles.container}>
        <Image 
          source={IllustrationImg} 
          style={styles.image}
          resizeMode="contain"
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
          <TouchableOpacity onPress={() => navigation.navigate('Details')}>
            <Button
              title="Entrar"
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
              title="Entrar com Facebook"
            />
          </TouchableOpacity>
          <Text style={styles.signupText}>
           Não tem uma conta? Cadastre-se
          </Text>
        </View>
      </View>
  )
}