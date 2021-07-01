import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: 360
  },
  content: {
    width: Platform.OS === 'web' ? '40%' : '100%', 
    marginTop: Platform.OS === 'web' ? -80 : -100,
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
  signupText: {
    color: theme.colors.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8
  } 
});