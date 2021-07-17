import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    height: 120,
    width: 360,
    marginTop: 20
  },
  content: {
    // marginTop: -100,
    width: Platform.OS === 'web' ? '40%' : '100%', 
    paddingHorizontal: 50
  },
  title: {
    color: theme.colors.secondary,
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 16
  },
  subtitle: {
    color: theme.colors.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 8
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  signupText: {
    color: theme.colors.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8
  },
  signupTextBtn: {
    color: theme.colors.secondary,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 8,
    backgroundColor: theme.colors.blue,
    borderRadius: 8
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
});