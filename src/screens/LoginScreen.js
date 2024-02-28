import React from 'react';
import { View } from 'react-native';
import Title from '../components/Title';
import Input from '../components/Input';
import { styles } from '../../src/styles/LoginStyles';

export default function LoginScreen({ navigation }) {
    return (
    <View style={styles.loginScreen_container}>
      <Title/>
      <Input navigation={navigation} />
    </View>
    );
};
