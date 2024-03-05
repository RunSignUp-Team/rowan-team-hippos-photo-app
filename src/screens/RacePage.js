import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, LogBox } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';



export default function RacePage({ navigation, route }) {
    const { raceData, date } = route.params;
    const location = getLocation(raceData);
    const name = raceData.name;
    const race_id = raceData.race_id;
    const event_days_id = raceData.events[0].race_event_days_id;
    const [photoAlbumData, setPhotoAlbumData] = useState([]);
    const [gotPhotoAlbums, setGotPhotoAlbums] = useState(false);
    useEffect(() => {
        fetchAlbumData();
    }, []);
    const { APIKey, APISecret } = useContext(UserContext);
    useEffect(() => {
      console.log("Current tmpKey value:", APIKey);
      console.log("Current tmpSecret value:", APISecret);
    }, [APIKey, APISecret]);

    function failureCallback(error) {
        console.error(`Error getting race list: ${error}`);
      }
    
    const fetchAlbumData = async () => {
        setGotPhotoAlbums(false);
        let albums = [];
        let albumError = false;
        let url = 'https://test3.runsignup.com/Rest/v2/photos/get-race-photo-albums.json?race_id=' + race_id + '&race_event_days_id=' + event_days_id + '&rsu_api_key=' + APIKey;
        const headers = new Headers();
        headers.append("x-rsu-api-secret", APISecret);
            try {
                let response = await fetch(url, {method: "GET", headers: headers})
                let data = await response.json();
                console.log(data);
                albums = data.albums;
            } catch (error) {
                failureCallback(error);
                albumError = true;
            }

        if (albumError) {
          albumError = false;
            Alert.alert(
                'Error',
                'Sorry, the system ran into some trouble and some photo albums failed to load. Please try closing and reopening the app.',
                [{ text: 'OK', style: styles.failedFetchingErrorText }]
            );
            }
        setPhotoAlbumData(albums);
        setGotPhotoAlbums(true);
    };

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
        { photoAlbumData ? (
        photoAlbumData.length == 0 ? (
          gotPhotoAlbums == true ? ( 
            <View style={localStyles.centerAlign}>
                <Text style={localStyles.noRacesErrorText}>No races found for this user, if you believe this to be an issue with the app, contact help@runsignup.com.</Text>
            </View>
          ) : (
            <View style={localStyles.centerAlign}>
                <Text style={localStyles.noRacesErrorText}>Loading...</Text>
            </View>
        )
        ) : (
          <ScrollView>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          {photoAlbumData.map((rowData, index) => (
            <Row
              key={index}
              data={[renderAlbumInfo(navigation, rowData)]} // Passing as an array
              //style={localStyles.row}
              //textStyle={localStyles.text}
              flexArr={[1, 1]} // Adjust column width
            />
          ))}
          </Table>
          </ScrollView>
        )
        ) : (
          <Text>Error Loading Albums</Text>
        )}
    </View>
  );
}


const renderAlbumInfo = (navigation, album) => {
  return (
      <TouchableOpacity onPress={() => navigation.navigate("Test")} style={localStyles.touchable}>
          <View style={localStyles.cellContainer}>
              <Text style={[localStyles.text, localStyles.raceName]}>{album.album_name}</Text>
              <Text style={[localStyles.text, localStyles.raceName]}>{album.num_photos}</Text>
              {album.last_modified_ts ? 
                <Text style={[localStyles.text, localStyles.raceName]}>{album.last_modified_ts}</Text> 
              : 
                <Text style={[localStyles.text, localStyles.raceName]}>N/A</Text>
              }
              
              
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



