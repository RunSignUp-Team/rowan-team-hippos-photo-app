import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Alert, Image, Dimensions, Modal, Pressable, FlatList } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { styles } from '../styles/GlobalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from '../components/AuthContext';
import { Feather } from "@expo/vector-icons";



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
    const [pageNumber, setPageNumber] = useState(1);
    const photosPerPage = 20;

    useEffect(() => {
        fetchPhotosData();
    }, [pageNumber]);
    const { APIKey, APISecret } = useContext(UserContext);

    console.log(album_id);
    console.log(event_days_id);
    console.log(APIKey);
    console.log(APISecret);
    console.log(race_id);

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
        let url = 'https://test3.runsignup.com/Rest/v2/photos/get-race-photos.json?race_id=' + race_id + '&race_event_days_id=' + event_days_id + '&rsu_api_key=' + APIKey + '&include_participant_uploads=T&generic_photo_album_id=' + album_id;
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

    photosData.sort(function(a, b) {
      return b.uploaded_ts - a.uploaded_ts;
    });


    const [modalVisible, setModalVisible] = useState(false);
    const [imageURL, setImageURL] = useState();
    const [imageSize, setImageSize] = useState();

    let buttonData;
    let pagesTotal = Math.floor(photosNum / photosPerPage) + 1;
    if (Math.floor(photosNum / photosPerPage) + 1 > 7) {
      buttonData = Array.from({ length: 7 });
      buttonData[0] = 1;
      buttonData[6] = pagesTotal;
      if (pageNumber <= 4) {
        buttonData[1] = 2;
        buttonData[2] = 3;
        buttonData[3] = 4;
        buttonData[4] = 5;
        buttonData[5] = "...";
      }
      else if (pageNumber >= pagesTotal - 3) {
        buttonData[1] = "...";
        buttonData[2] = pagesTotal - 4;
        buttonData[3] = pagesTotal - 3;
        buttonData[4] = pagesTotal - 2;
        buttonData[5] = pagesTotal - 1;
      }
      else {
        buttonData[1] = "...";
        buttonData[2] = pageNumber - 1;
        buttonData[3] = pageNumber;
        buttonData[4] = pageNumber + 1;
        buttonData[5] = "...";
      }
    }
    else {
      buttonData = Array.from({ length: Math.floor(photosNum / photosPerPage) + 1 }, (_, index) => index + 1);
    }
    
    const renderItem = ({ item }) => {
      if (typeof item === 'number') {
        return (
          <View style={{minWidth: 35}}>
            <TouchableOpacity onPress={() => setPageNumber(item)} style={[localStyles.pageButton, item === pageNumber && { backgroundColor: '#aabbff'}]}>
              <Text style={{fontSize:16}}>{item}</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={{minWidth: 35}}>
            <View style={localStyles.pageButton}>
              <Text style={{fontSize:12}}>{item}</Text>
            </View>
          </View>
        );
      }
      
    };

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
        <Photos photosData={photosData} setModalVisible={setModalVisible} setImageURL={setImageURL} setImageSize={setImageSize} pageNumber={pageNumber} photosPerPage={photosPerPage}></Photos>
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setPageNumber(pageNumber - 1 >= 1 ? pageNumber - 1 : pageNumber)} style={{paddingVertical: 10}}>
          <Text style={{fontSize: 16, color: pageNumber === 1 ? '#ccccff' : "#0000ff", marginHorizontal: 7 }}>{"< Previous"}</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'column'}}>
          <FlatList
            horizontal
            data={buttonData}
            renderItem={renderItem}
            //keyExtractor={(item) => item.toString()}
          />
        </View>
        <TouchableOpacity onPress={() => setPageNumber(pageNumber + 1 <= pagesTotal ? pageNumber + 1 : pageNumber)} style={{paddingVertical: 10}}>
          <Text style={{fontSize: 16, color: pageNumber === pagesTotal ? '#ccccff' : "#0000ff", marginHorizontal: 7 }}>{"Next >"}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        //animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(false)}}>
        <View style={localStyles.overlay}>
          <View style={localStyles.centeredView}>
            <View style={localStyles.modalView}>
              <Pressable
                style={[localStyles.button]}
                onPress={() => setModalVisible(false)}>
                <Feather style={localStyles.textStyle} name="x" />
              </Pressable>
              <Image
                style={{ ...imageSize }}
                source={{ uri: imageURL }}
              />
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

function Photos({ photosData, setModalVisible, setImageSize, setImageURL, pageNumber, photosPerPage }) {
    let leftColumn = [];
    let rightColumn = [];
    let leftHeight = 0;
    let rightHeight = 0;
    let startIndex =  (pageNumber - 1) * photosPerPage;
    console.log(startIndex + " start");
    for (let i = startIndex; i < startIndex + photosPerPage && i < photosData.length; i++) {
      let rowData = photosData[i];
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
    };

    
  return (
    <View style={{ flex: 1,
      flexDirection: 'row',
      justifyContent: 'center', // Horizontally center the columns
      }}>
      <Column column={leftColumn} setModalVisible={setModalVisible} setImageURL={setImageURL} setImageSize={setImageSize}></Column>
      {rightColumn.length > 0 &&
      <Column column={rightColumn} setModalVisible={setModalVisible} setImageURL={setImageURL} setImageSize={setImageSize}></Column>
      }
  </View>
  );
}

function Column({ column, setModalVisible, setImageSize, setImageURL }) {

return (
  <View style={{ paddingHorizontal: 20}}>
      {column.map((rowData, id) => {
        const imageSize = {
          width: Dimensions.get('window').width * .4,
          height: rowData.thumbnail.height * Dimensions.get('window').width * .4 / rowData.thumbnail.width
        };
        return (
          <View key={id} style={{ marginBottom: 10}}>
            <TouchableWithoutFeedback onPress={() => {
              setModalVisible(true);
              setImageURL(rowData.large.image_url);
              if (rowData.large.height / Dimensions.get('window').height > rowData.large.width / Dimensions.get('window').width) {
                setImageSize({
                  width: rowData.thumbnail.width * Dimensions.get('window').height * 0.8 / rowData.thumbnail.height,
                  height: Dimensions.get('window').height * 0.8
                });
              }
              else {
                setImageSize({
                  width: Dimensions.get('window').width * 0.9,
                  height: rowData.thumbnail.height * Dimensions.get('window').width * 0.9 / rowData.thumbnail.width
                });
              }
              
            }} style={styles.touchable}>
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
    paddingHorizontal: 15,
    paddingBottom: 35,
    paddingTop: 45,
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
    position: 'absolute',
    top: 0,
    padding: 10,
    right: 5,
    zIndex: 1
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  pageButton: {
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    marginVertical: 5,
    marginHorizontal: 3, 
    borderRadius: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1
  },
});




