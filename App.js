import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import Header from './src/navigation/Header';
import Test from './src/components/Test';
import HomeScreen from './src/screens/homePage';
import RacePage from './src/screens/RacePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.paddingFlex}>
        <View style={styles.padding}></View>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen style={styles.paddingPage} name="Home" component={HomeScreen} />
          <Stack.Screen style={styles.paddingPage} name="Test" component={Test} />
          <Stack.Screen style={styles.paddingPage} name="RacePage" component={RacePage} />
        </Stack.Navigator>
      </NavigationContainer>
      <View style={styles.padding}></View>
      </SafeAreaView>
    </SafeAreaView>
  );

}

const Error = () => {
  return (
    <SafeAreaView style={styles.content}>
      <Text> You shouldn't be seeing this page </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ffa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingFlex: {
    flex: 1,
    flexDirection: "row",
  },
  padding: {
    width: "2%",
  },
});