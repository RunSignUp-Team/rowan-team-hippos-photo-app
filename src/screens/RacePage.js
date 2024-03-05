import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from '../styles/GlobalStyles';
import FloatingButton from '../components/FloatingButton';

export default function Test({ navigation }) {
  return (
    <View style={styles.container}>
        <Text>Test</Text>
      <FloatingButton style={{ bottom: 0 }} />
    </View>
  );
}
