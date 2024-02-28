import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Header from './src/navigation/Header';
import Test from './src/components/Test';
import HomeScreen from './src/screens/homePage';
import RacePage from './src/screens/RacePage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/components/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import { SignOutScreen} from './src/screens/index';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStackNavigator() {
  return (
    <AuthProvider>
      <Stack.Navigator initialRouteName='Login'  screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' component={LoginScreen} />
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
      <ScrollView style={{ backgroundColor: '#ef4f9d' }}> 
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


