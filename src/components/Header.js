import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the hamburger menu icon


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

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'lightblue',
    paddingTop: StatusBar.currentHeight + 20,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    width: '50%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    left: 20,
    zIndex: 1,
    width: '25%',
  },
  gap: {
    width: '25%',
  },
  headerWithBottomBar: {
    paddingBottom: 20, // Adjust this value as needed
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
});