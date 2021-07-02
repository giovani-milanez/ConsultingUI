// export const theme = {
//   colors: {
//     background: '#0D133D',
//     heading: '#DDE3F0',
//     primary: '#E51C44',
//     line: '#991F36'
//   }
// }
const primary = '#F87E0E';
const secondary = '#DDE3F0';
const backgroundColor = '#293046';

export const theme = {
  dark: false,
  colors: {
    primary: primary,
    secondary: secondary
  },
  mainContainer: {
    backgroundColor: backgroundColor,
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,    
    width: '100%'
  },
  Button: {
    titleStyle: {
      flex: 1,
      fontSize: 15,
      // textAlign: 'center',
      // alignItems: 'center',
      color: secondary,
      marginBottom: 0
    },
    containerStyle: {
      width: '100%',
      height: 50,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: primary
    },
    buttonStyle: {
      backgroundColor: primary
    }
    // type: 'solid'
  },
  Input: {
    inputContainerStyle: {
      width: '100%',
      lignItems: 'center'
    },
    inputStyle: {
      color: secondary
      // borderWidth: 1,
      // borderColor: secondary      
    },
    errorStyle: {
      textAlign: 'center',
      color: '#F44336'
    },
    placeholderTextColor: secondary
  }
}