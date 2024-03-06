import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from '../styles/GlobalStyles';
import CreateAlbum from '../components/CreateAlbum';

export default function RacePage({ route, navigation }) {

  const { raceId } = route.params;

  return (
    <View style={styles.container}>
        <Text>Race Details</Text>
        <CreateAlbum navigation={navigation} raceId={raceId}/>
    </View>
  );
}
