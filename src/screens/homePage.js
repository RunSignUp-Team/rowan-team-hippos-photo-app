import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { styles } from '../styles/HomeStyles';
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Text>This is a test home screen for the login page. </Text>
        </SafeAreaView>
    );
};

export default HomeScreen;
