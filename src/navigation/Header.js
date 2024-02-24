import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the hamburger menu icon
import {styles} from '../styles/GlobalStyles';


export default function Header() {
  return (
      <SafeAreaView style={[styles.header, styles.headerWithBottomBar]}>
        <TouchableOpacity onPress={() => alert('home')} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>RunSignUp RaceDay Assistant</Text>
        <SafeAreaView style={styles.gap}></SafeAreaView>
      </SafeAreaView>
  );
}
