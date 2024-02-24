import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from './src/screens/Input.js';
import Title from './src/screens/Title.js'

const App = () => {
  return (
    <View style={styles.container}>
      <Title/>
      <Input/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
