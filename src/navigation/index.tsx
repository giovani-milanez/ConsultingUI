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

export type ServiceScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'Service'>;
export type ServiceScreenRouteProp = RouteProp<RootStackParamList, 'Service'>;
export type ServiceScreenProps = {
  route: ServiceScreenRouteProp,
  navigation: ServiceScreenNavigationProp
};

export type MyServicesScreenNavigationProp = DrawerNavigationProp<RootStackParamList,'MyServices'>;
export type MyServicesScreenRouteProp = RouteProp<RootStackParamList, 'MyServices'>;
export type MyServicesScreenProps = {
  route: MyServicesScreenRouteProp,
  navigation: MyServicesScreenNavigationProp
};