import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStackNavigator() {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName='Login'  screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false, headerBackVisible: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, headerBackVisible: false }} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen style={styles.paddingPage} name="RacePage" component={RacePage} />
      </Stack.Navigator>
    </AuthProvider>
  );
}

export default function App() {
  const [showHeader, setShowHeader] = useState(true);
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Main" component={MyStackNavigator} options={{ title: 'Home' }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );

}
const CustomDrawerContent = (props) => {

// IMPORTANT:  add a way to clear the email and password fields when returning to the login screen

const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#ef4f9d' }}> 
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


