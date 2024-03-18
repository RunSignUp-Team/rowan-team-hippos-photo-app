import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, LogBox } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';
import { AntDesign } from "@expo/vector-icons";



export default function RacePage({ navigation, route }) {
    const { albumData, race_id } = route.params;
    const name = albumData.album_name;
    const photosNum = albumData.num_photos;
    const event_days_id = albumData.race_event_days_id;
    const album_id = albumData.album_id;

    

    const [photosData, setPhotosData] = useState([]);
    const [gotPhotos, setGotPhotos] = useState(false);
    useEffect(() => {
        fetchPhotosData();
    }, []);
    const { APIKey, APISecret } = useContext(UserContext);

    console.log(album_id);
    console.log(event_days_id);
    console.log(APIKey);
    console.log(APISecret);

    useEffect(() => {
      console.log("Current tmpKey value:", APIKey);
      console.log("Current tmpSecret value:", APISecret);
    }, [APIKey, APISecret]);

    function failureCallback(error) {
        console.error(`Error getting race list: ${error}`);
      }
    
    const fetchPhotosData = async () => {
        setGotPhotos(false);
        let photos = [];
        let photosError = false;
        let url = 'https://test3.runsignup.com/Rest/v2/photos/get-race-photos.json?race_id=' + race_id + '&race_event_days_id=' + event_days_id + '&rsu_api_key=' + APIKey + '&page=1&num=100&include_participant_uploads=T&generic_photo_album_id=' + album_id;
        const headers = new Headers();
        headers.append("x-rsu-api-secret", APISecret);
            try {
                let response = await fetch(url, {method: "GET", headers: headers})
                let data = await response.json();
                photos = data.photos;
            } catch (error) {
                failureCallback(error);
                photosError = true;
            }

        if (photosError) {
          photosError = false;
            Alert.alert(
                'Error',
                'Sorry, the system ran into some trouble and some photos failed to load. Please try closing and reopening the app.',
                [{ text: 'OK', style: styles.failedFetchingErrorText }]
            );
            }
        setPhotosData(photos);
        setGotPhotos(true);
    };

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
            <ScrollView>
            {photosData.map((rowData) => (
            <Text>{rowData.uploaded_filename}</Text>
          ))}
            </ScrollView>
          </View>

      </View>
    </SafeAreaView>
  );
}






