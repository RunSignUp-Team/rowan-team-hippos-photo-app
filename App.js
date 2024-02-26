import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Header from './src/navigation/Header';
import Test from './src/components/Test';
import HomeScreen from './src/screens/homePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignOutScreen} from './src/screens/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Main" component={MyStackNavigator} options={{ title: 'Home' }} />
          <Drawer.Screen name="SignOut" component={SignOutScreen} />
          
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );

}
const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'lightpink' }}> 
        <DrawerItemList {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

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
    backgroundColor: 'lightpink',
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