import { View, Button, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TouchableWithoutFeedback , Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect, useContext } from 'react';
//import { styles } from '../styles/GlobalStyles';
import { useIsFocused } from '@react-navigation/native';

const Imagepicker = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const isFocused = useIsFocused(); 

    useEffect(() => {
        (async () => {
            if (isFocused) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permissions to make this work!');
                    return;
                }
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                if (!result.cancelled) {
                    setSelectedImage({ uri: result.uri });
                }
            }
        })();
    }, [isFocused]); 

    return (
        <SafeAreaView style={styles.container}>
            {selectedImage && (
                <Image source={{ uri: selectedImage.uri }} style={styles.image} />
            )}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
});
export default Imagepicker;
