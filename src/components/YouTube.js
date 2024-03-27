import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


const useGoogleAuthentication = () => {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '412630371475-ssp3pb0atqjuec5spc6h1rkdia2e5a6p.apps.googleusercontent.com',
        webClientId: '412630371475-e732mpa5cifq07qto2vh233uhdkd8ike.apps.googleusercontent.com',
        androidClientId: '412630371475-nlffu3mac6tgfhp0p1aa39eapmnhb1vk.apps.googleusercontent.com'
    });

    return { userInfo, promptGoogleSignIn: promptAsync };
};

export default useGoogleAuthentication;