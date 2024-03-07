import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const CreateAlbum = ({ raceId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [albumName, setAlbumName] = useState('');

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
        backgroundColor: 'grey',
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
        backgroundColor: 'grey', 
        padding: 10, 
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        minWidth: 100,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default CreateAlbum;
