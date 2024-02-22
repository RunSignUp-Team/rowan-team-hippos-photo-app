import React from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/HomeStyles';
const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            
            
        </SafeAreaView>
    );
};

const Stack = createNativeStackNavigator();
const Home = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};







export default Home;
