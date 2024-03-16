import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the hamburger menu icon
import {styles} from '../styles/GlobalStyles';
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


export default function Header({title, showHamburgerMenu}) {
  const navigation = useNavigation();
  return (
      <SafeAreaView>
        <SafeAreaView style={styles.header}>
          {showHamburgerMenu ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
            <Octicons name="three-bars" size={24} color="#161924" />
          </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton}>
              <AntDesign name="arrowleft" size={24} color="#161924" />
            </TouchableOpacity>
          )
          }
          <Text style={styles.headerText}>{title}</Text>
          <SafeAreaView style={styles.gap}></SafeAreaView>
        </SafeAreaView>
        <View style={styles.headerBlackBar}></View>
      </SafeAreaView>
  );
}
