// export const theme = {
//   colors: {
//     background: '#0D133D',
//     heading: '#DDE3F0',
//     primary: '#E51C44',
//     line: '#991F36'
//   }
// }
const primary = '#F87E0E';
const secondary = '#01122e';
const backgroundColor = '#f7faff';
const blue = '#1F7CE9'

export const theme = {
  dark: false,
  colors: {
    primary: primary,
    secondary: secondary,
    blue: blue,
    background: backgroundColor
  },
  // mainContainer: {
  //   backgroundColor: backgroundColor,
  //   flexGrow: 1,
  //   paddingBottom: 20,
  //   paddingTop: 20,    
  //   width: '100%'
  // },
  Rating: {
    tintColor: backgroundColor
  },
  Button: {
    loadingProps: {
      color: blue,
      size: 'large'
    },
    loadingStyle: {
      backgroundColor: primary,
    },
    disabledStyle: {
      backgroundColor: primary,
    },
    // titleStyle: {
    //   flex: 1,
    //   fontSize: 18,
    //   color: backgroundColor
    // },
    titleProps: {
      style: {
        fontSize: 15,
        fontWeight: 'normal',
        color: backgroundColor
      }
    },
    containerStyle: {
      width: '100%',
      height: 50,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: primary,
      marginTop: 0,
      marginBottom: 0,
      marginRight: 0,
      marginLeft: 0
    },
    buttonStyle: {
      backgroundColor: primary      
    }
    // type: 'solid'
  },
  ButtonGroup: {
    containerStyle: {
      height: 50, 
      width: '100%',
      marginTop: 0,
      marginBottom: 10,
      marginRight: 0,
      marginLeft: 0
    },
    selectedButtonStyle: {
      backgroundColor: blue
    },
    textStyle: {
      // color: secondary
    }
  },
  Input: {
    inputContainerStyle: {
      width: '100%',
      alignItems: 'center'
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