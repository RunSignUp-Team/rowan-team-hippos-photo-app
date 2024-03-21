import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Alert, Image, Dimensions, Modal, Pressable } from 'react-native';
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

    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    useEffect(() => {
      const subscription = Dimensions.addEventListener(
        'change',
        ({window, screen}) => {
          setDimensions({window, screen});
        },
      );
      return () => subscription?.remove();
    });
    

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
        let url = 'https://test3.runsignup.com/Rest/v2/photos/get-race-photos.json?race_id=' + race_id + '&race_event_days_id=' + event_days_id + '&rsu_api_key=' + APIKey + '&page=1&num=1000&include_participant_uploads=T&generic_photo_album_id=' + album_id;
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

    const [modalVisible, setModalVisible] = useState(false);


    return (
    <SafeAreaView style={{flex: 1}}>
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
      <ScrollView style={{paddingBottom: 100}}>
        <Photos photosData={photosData} setModalVisible={setModalVisible}></Photos>
      </ScrollView>
      <View styl>

      </View>

      <Modal
        //animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={localStyles.centeredView}>
          <View style={localStyles.modalView}>
            <Text style={localStyles.modalText}>Hello World!</Text>
            <Pressable
              style={[localStyles.button, localStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={localStyles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

function Photos({ photosData, setModalVisible }) {
    let leftColumn = [];
    let rightColumn = [];
    let leftHeight = 0;
    let rightHeight = 0;
    photosData.forEach(rowData => {

      const imageSize = {
          width: 100,
          height: rowData.thumbnail.height / 4 * 100 / (rowData.thumbnail.width / 4)
      };
      if (leftHeight <= rightHeight) {
          leftHeight += imageSize.height + 10;
          leftColumn.push(rowData);
      } else {
          rightHeight += imageSize.height + 10;
          rightColumn.push(rowData);
      }
    });

    
  return (
    <View style={{ flex: 1,
      flexDirection: 'row',
      justifyContent: 'center', // Horizontally center the columns
      }}>
      <Column column={leftColumn} setModalVisible={setModalVisible}></Column>
      <Column column={rightColumn} setModalVisible={setModalVisible}></Column>
  </View>
  );
}

function Column({ column, setModalVisible }) {

return (
  <View style={{ paddingHorizontal: 20}}>
      {column.map((rowData, id) => {
        const imageSize = {
          width: Dimensions.get('window').width * .4,
          height: rowData.thumbnail.height / 4 * Dimensions.get('window').width * .4 / (rowData.thumbnail.width / 4)
        };
        return (
          <View key={id} style={{ marginBottom: 10}}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)} style={styles.touchable}>
              <Image
                style={{ ...imageSize, marginBottom: 10 }}
                source={{ uri: rowData.thumbnail.image_url }}
              />
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
);
}

const localStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});




