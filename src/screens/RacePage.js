import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { styles } from '../styles/GlobalStyles';
import { Table, Row } from 'react-native-table-component';


export default function Test({ navigation, route }) {
  const { raceData, date } = route.params;
  const location = getLocation(raceData);
  const name = raceData.name;
  return (
    <View>
        <View style={styles.container}>
        <Text style={localStyles.name}>{name}</Text>
        <Text style={localStyles.info}>{date}</Text>
        <Text style={localStyles.info}>{location}</Text>
        </View>
        <View style={localStyles.linePadding}>
          <View style={localStyles.line}></View>
        </View>
        <ScrollView>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row>
              <Text>Test</Text>
            </Row>
            <Row>
              <Text>Test</Text>
            </Row>

          </Table>
        </ScrollView>
    </View>
  );
}

/*
            {raceData.map((rowData, index) => (
              <Row
                key={index}
                data={[renderRaceInfo(navigation, rowData)]} // Passing as an array
                //style={localStyles.row}
                //textStyle={localStyles.text}
                flexArr={[1, 1]} // Adjust column width
              />
            ))}

*/

const renderRaceInfo = (navigation, rowData) => {
  const { raceName, date, race } = rowData;
  return (
      <TouchableOpacity onPress={() => navigation.navigate("RacePage", { raceData: race, date: date })} style={localStyles.touchable}>
          <View style={localStyles.cellContainer}>
              <Text style={[localStyles.text, localStyles.raceName]}>{raceName}</Text>
              <Text style={[localStyles.text, localStyles.date]}>{date}</Text>
          </View>
      </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30},
  row: { backgroundColor: '#f1f8ff' },
  cellContainer: { flex: 1, alignItems: 'left', justifyContent: 'space-between' , paddingLeft: 10, },
  text: { margin: 6, fontSize: 20 },
  raceName: { fontSize: 20, fontWeight: 'bold', paddingTop: 0 },
  date: { fontSize: 18, paddingBottom: 10 },
  touchable: { flex: 1 },
  noRacesErrorText: { margin: 6, fontSize: 20, textAlign:'center' },
  failedFetchingErrorText: { margin: 6, fontSize: 20, textAlign:'center', color:'red'},
  centerAlign: {alignItems: 'center', justifyContent: 'center', flexDirection:'row', flex: 1},
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  info: {
    fontSize: 18,
  },
  line: {
    height: 5,
    backgroundColor: '#ddd',
  },
  linePadding: {
    paddingVertical: 20
  }
});

const getLocation = (raceData) => {
  return (raceData.address.street + ", " + raceData.address.city + ", " + raceData.address.state + " " + raceData.address.zipcode);
};



