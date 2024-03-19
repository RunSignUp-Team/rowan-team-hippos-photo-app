import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    login_container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginBottom: 100,
    },
    login_input: {
      height: 50,
      width: 280,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      textAlign: 'center',
      borderRadius: 25,
    },
    login_button: {
      height: 50,
      width: 280,
      orderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    login_text: {
      fontSize: 20,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    login_title_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 100,
    },
    login_image: {
        resizeMode: 'cover',
        width: 250,
        marginBottom: 50,
        alignContent: 'center',
    },
    login_title_text: {
        alignContent: 'center',
        marginBottom: 80,
        fontSize: 45,
        fontFamily: Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : '',
    },
    loginScreen_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 4,
      paddingHorizontal: 0,
      },
  });