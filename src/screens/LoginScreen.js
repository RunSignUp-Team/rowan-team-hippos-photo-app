import React from 'react';
import { View } from 'react-native';
import Input from "../../components/Input";
import Title from "../../components/Title";
import { styles } from '../../src/styles/LoginStyles';

export default function LoginScreen() {
    return (
    <View style={styles.loginScreen_container}>
      <Title/>
      <Input/>
    </View>
    );
};
