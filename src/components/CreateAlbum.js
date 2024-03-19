import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

const CreateAlbum = ({ raceId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [albumName, setAlbumName] = useState('');

    const createAlbum = async () => {
        const apiUrl = 'https://test3.runsignup.com/Rest/v2/photos/create-race-photo-album.json';
        const API_KEY = "UOIPvgKli3B83uzfSuzVgYfRgk3Lzy9M";
        const API_SECRET = "P5f0VZidPKc9aa8r8uQa3lNB05DN3WgH";
        const RACE_EVENT_DAYS_ID = "34168";
        
        let formData = new FormData();
        formData.append('race_id', raceId);
        formData.append('race_event_days_id', RACE_EVENT_DAYS_ID); //hardcoded values for most of these ; has to be changed
        formData.append('rsu_api_key', API_KEY);
        formData.append('X-RSU-API-SECRET', API_SECRET);
        formData.append('album_name', albumName);
      
        try {
          const response = await fetch(`${apiUrl}?race_event_days_id=${RACE_EVENT_DAYS_ID}&rsu_api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'x-rsu-api-secret': API_SECRET,
            },
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('API call failed with status ' + response.status);
          }
      
          const data = await response.json();
          console.log("Album created successfully:", data);
          setModalVisible(false);
          // successful response
        } catch (error) {
          console.error("Error creating album:", error);
          // error code
        }
      };

    return (
        <View style={styles.centeredView}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonStyle}>
                <Text style={styles.buttonText}>Create New Album</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Enter New Album Name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setAlbumName}
                            value={albumName}
                            placeholder="Album Name"
                            placeholderTextColor='lightgrey'
                        />
                        <Pressable onPress={createAlbum} style={styles.createButton}>
                            <Text style={styles.textStyle}>Create</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgb(176,176,176)',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    closeButton: {
        position: 'absolute', 
        top: 10, 
        right: 10, 
        backgroundColor: 'transparent',
        padding: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        color: 'black',
        
    },
    buttonStyle: {
        backgroundColor: 'rgb(105,105,105)', 
        padding: 10, 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 55,
        minWidth: 110,
        borderColor: 'black',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    createButton: {
        backgroundColor: 'rgb(105,105,105)', 
        padding: 5, 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        minWidth: 100,
        marginTop: 15,
        marginBottom: 0,
    }
});

export default CreateAlbum;
