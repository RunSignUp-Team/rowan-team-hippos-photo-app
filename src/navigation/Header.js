import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the hamburger menu icon
import {styles} from '../styles/GlobalStyles';
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


export default function Header({title}) {
  const navigation = useNavigation();
  return (
      <SafeAreaView style={[styles.header, styles.headerWithBottomBar]}>
      
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <FontAwesome5 name="bars" size={24} color="#161924" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <SafeAreaView style={styles.gap}></SafeAreaView>
      </SafeAreaView>
  );
}
