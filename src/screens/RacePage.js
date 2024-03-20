import React, { useState, useEffect, useContext } from 'react';
import { View, Text,FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import FloatingButton from '../components/FloatingButton';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';
import { AntDesign } from "@expo/vector-icons";
import ModalPopup from '../components/Modal';
import { openImagePickerAsync } from '../components/imagePicker';



export default function RacePage({ navigation, route }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggleMenu called in HomeScreen", !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };
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
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.paddedContainer}>
        <ModalPopup visible={isModalVisible} onClose={toggleModal}>
          <Text style={styles.modalHeader}>Add to Album</Text>

    {/* Create New Album Option */}
    <TouchableOpacity
      onPress={() => {
        console.log("Create New Album");
        toggleModal(); //For now closes the modal
      }}
      style={styles.albumOption}
    >
      <Text style={styles.albumOptionText}>Create New Album</Text>
    </TouchableOpacity>

    {/* Scrollable Album List */}
    <View style={styles.albumListContainer}>
      <FlatList
        data={photoAlbumData}
        keyExtractor={item => item.album_id.toString()}
        renderItem={({ item }) => {
          const lastModified = new Date(item.last_modified_ts * 1000); 
          const formattedDate = lastModified.toLocaleDateString(); 
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("Selected album:", item.album_name);
                 

                // Use the imported function to open the image picker
                openImagePickerAsync((uris) => {
                  toggleModal();
                  console.log('Selected image URI:', uris);
                  setSelectedImages(uris);
                  // To handle the upload process based on the selected album
                  // Use item.album_id along with uri to upload
                });
            }}
              style={styles.albumOption}
            >
              <Text style={styles.albumOptionText}>{item.album_name}</Text>
              <Text style={styles.albumDetailText}>{item.num_photos} Photos</Text>
              <Text style={styles.albumDetailText}>Last Modified: {formattedDate}</Text>
            </TouchableOpacity>
          );
        }}
      />
          </View>
        </ModalPopup>

          <Text style={styles.title2}>{name}</Text>
          <Text style={styles.titleInfo}>{date}</Text>
          <Text style={styles.titleInfo}>{location}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.paddedContainer}>
          <View style={{paddingBottom: 16}}>
            <Text style={styles.title2}>Albums</Text>
          </View>
        { photoAlbumData ? (
        photoAlbumData.length == 0 ? (
          gotPhotoAlbums == true ? ( 
            <View style={styles.centerAlign}>
              <Text style={styles.errorText}>Failed to load any albums. Make sure your internet connection is stable then close and reopen the app.</Text>
            </View>
          ) : (
            <View style={{paddingTop: 200}}>
              <ActivityIndicator size="large" color="#0088ff"/>
            </View>
        )
        ) : (
          <ScrollView>
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
          {photoAlbumData.map((rowData, index) => (
            <Row
              key={index}
              data={[renderAlbumInfo(navigation, rowData, race_id)]} // Passing as an array
              style={styles.row}
              //textStyle={localStyles.text}
              flexArr={[1, 1]} // Adjust column width
            />
          ))}
          </Table>
          </ScrollView>
        )
        ) : (
          <Text>Failed to load any albums. Make sure your internet connection is stable then close and reopen the app.</Text>
        )}
      </View>
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          <View style={styles.fullScreen}>
            {// if isMenuOpen is ture, then the overlay will be visible
              isMenuOpen && (
                <View style={[styles.overlay, StyleSheet.absoluteFillObject]} />

              )}
          </View>
        </TouchableWithoutFeedback>
      )}
      <View style={{position: "absolute", bottom:0, left:0, right:0}}>
      
        {// to display the floating button and also to pass the toggleMenu function to the floating 
          //button
        }
        <FloatingButton isOpenProp={isMenuOpen} onToggleRequest={toggleMenu} onNewAlbumRequest={toggleModal} />
      </View>

    </SafeAreaView>
  );
}


const renderAlbumInfo = (navigation, album, race_id) => {
  const lastModified = new Date(1000 * album.last_modified_ts);
  const localDate = lastModified.toLocaleDateString(); 
  return (
      <TouchableOpacity onPress={() => navigation.navigate("AlbumPage", { albumData: album, race_id: race_id })} style={styles.touchable}>
          <View style={styles.cellContainer}>
            <View style={styles.textContainer}>
                <Text style={[styles.rowTextMargin, styles.rowTextBold]}>{album.album_name}</Text>
                <Text style={[styles.rowTextMargin, styles.rowText]}>{album.num_photos} Photo{album.num_photos == 1 ? '' : 's'}</Text>
              {album.last_modified_ts &&
                <Text style={[styles.rowTextMargin, styles.rowText]}>Last Modified: {localDate}</Text> 
              //: 
                //<Text style={[localStyles.text, localStyles.raceName]}>Last Modified: N/A</Text>
              }
            </View>  
            <AntDesign style={[styles.rowTextMargin, styles.arrow]} name="doubleright" />
          </View>
      </TouchableOpacity>
  );
};

const getLocation = (raceData) => {
  return (raceData.address.street + ", " + raceData.address.city + ", " + raceData.address.state + " " + raceData.address.zipcode);
};



