import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Platform } from 'react-native';
import Header from './src/navigation/Header';
import Test from './src/components/Test';
import HomeScreen from './src/screens/homePage';
import RacePage from './src/screens/RacePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/components/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from './src/components/AuthContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function MyStackNavigator() {
  
  return (
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header title="Home" />}}/>
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen style={styles.paddingPage} name="RacePage" component={RacePage} options={{ header: () => <Header title="Race Page" />}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Main" component={MyStackNavigator} options={{ title:'Home', headerShown: false }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </AuthProvider>
  );

}
const CustomDrawerContent = (props) => {

  const { usersName } = useContext(UserContext);

  const navigation = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: '#ef4f9d', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}> 
          <Text style={{ paddingLeft: 15, fontSize: 20, paddingBottom: 10 }}>{usersName}</Text>
          <DrawerItemList {...props}/>
          <DrawerItem
            label="Sign Out"    // custom DrawerItem that gets added into the Drawer Navigator ; this way allows for custom colors and onPress functions
            onPress={() => { navigation.navigate('Login') }}   // when pressed, it moves users to the Login Screen
            style={{ backgroundColor: 'red' }} // Customize the background color
            labelStyle={{ color: 'white' }}    // Customize the label color
          />
        </ScrollView>
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


