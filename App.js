import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Platform } from 'react-native';
import Header from './src/navigation/Header';
import Test from './src/components/Test';
import HomeScreen from './src/screens/homePage';
import RacePage from './src/screens/RacePage';
import AlbumPage from './src/screens/AlbumPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/components/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from './src/components/AuthContext';
import FloatingButton from './src/components/FloatingButton';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const ConditionalFloatingButton = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const shouldshowFloatingButton = navigation.getState().routeNames[navigation.getState().index] !== 'Login';
  return shouldshowFloatingButton ? <FloatingButton style={{ bottom: 0 }} /> : null;
};

export function MyStackNavigator() {
  
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header title="Home" showHamburgerMenu={true}/>}}/>
      <Stack.Screen name="Test" component={Test} options={{ header: () => <Header title="Test" />}}/>
      <Stack.Screen name="AlbumPage" component={AlbumPage} options={{ header: () => <Header title="Album Page" />}}/>
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
          <Drawer.Screen name="Main" component={MyStackNavigator} options={{ title:'Home', headerShown: false}} />
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
        <Text style={{ paddingLeft: 15, fontSize: 20, paddingBottom: 10, color: 'black', fontWeight: 'bold'}}>{usersName}</Text>
        <DrawerItem
          label="Home"
          onPress={() => navigation.navigate('Home')} 
          labelStyle={{ color: 'black'}}
          style={{
            backgroundColor: 'lightgrey',
            marginHorizontal: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'grey',
            marginBottom: 10,
          }}
        />
        <DrawerItem
          label="Sign Out"
          onPress={() => navigation.navigate('Login')}
          style={{ borderColor: 'black', backgroundColor: 'grey' }}
          labelStyle={{ color: 'white' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ef4f9d',
      color: 'white',
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


