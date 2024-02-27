import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Platform } from 'react-native';
import Header from './src/navigation/Header';
import Test from './src/components/Test';
import HomeScreen from './src/screens/homePage';
import RacePage from './src/screens/RacePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignOutScreen} from './src/screens/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header title="Home" />}}/>
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen style={styles.paddingPage} name="RacePage" component={RacePage} options={{ header: () => <Header title="Race Page" />}}/>
      <Stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <HomeScreen {...props} setShowHeader={Login} />}
      </Stack.Screen>
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
          <Drawer.Screen name="Main" component={MyStackNavigator} options={{ title:'Home', headerShown: false }} />
          <Drawer.Screen name="SignOut" component={SignOutScreen} options={{ header: () => <Header title="Sign Out" />}}/>          
        </Drawer.Navigator>

      </NavigationContainer>
    </SafeAreaView>
  );

}
const CustomDrawerContent = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#ef4f9d', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}> 
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
    backgroundColor: '#ef4f9d',
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