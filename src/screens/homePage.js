import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { styles } from '../styles/GlobalStyles';
import Header from '../navigation/Header';

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            
            <View style={styles.container}>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
