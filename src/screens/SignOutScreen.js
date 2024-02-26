import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/GlobalStyles';

const SignOutScreen = ({ navigation }) => {
    // Implement sign-out logic here    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sign Out Screen</Text>
            <Button title="Sign Out" />
        </View>
    );
};

export default SignOutScreen;