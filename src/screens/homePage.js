import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const Home = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>RunSignUp</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to the Homepage!</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFC0CB', // Pink background for the entire safe area
    },
    header: {
        height: 60, 
        backgroundColor: '#FF69B4', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#FFF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text: {
        fontSize: 24,
        color: '#000',
    },
});

export default Home;
