import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, LogBox } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';
import { AntDesign } from "@expo/vector-icons";



export default function RacePage({ navigation, route }) {
    const { albumData } = route.params;
    const name = albumData.album_name;
    const photosNum = albumData.num_photos;

    /*const location = getLocation(raceData);
    
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
                console.log(race_id);
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
    };*/

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.paddedContainer}>
          <Text style={styles.title2}>{name}</Text>
          <Text style={styles.titleInfo}>{photosNum} Photo{photosNum == 1 ? '' : 's'}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.paddedContainer}>
          <View style={{paddingBottom: 16}}>
            <Text style={styles.title2}>Photos</Text>
          </View>

      </View>
    </SafeAreaView>
  );
}






