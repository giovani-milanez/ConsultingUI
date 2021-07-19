import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

export type SignInScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'SignIn'>;
export type SignUpScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'SignUp'>;
export type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'Home'>;
export type FindServicesScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'FindServices'>;

export type ConsultantScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'Consultant'>;
export type ConsultantScreenRouteProp = RouteProp<RootStackParamList, 'Consultant'>;

export type ConsultantScreenProps = {
  route: ConsultantScreenRouteProp,
  navigation: ConsultantScreenNavigationProp
};