import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/GlobalStyles';

const SignOutScreen = ({ navigation }) => {
    // Implement sign-out logic here    



    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign Out Screen</Text>
            <Pressable>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    );
};

export default SignOutScreen;