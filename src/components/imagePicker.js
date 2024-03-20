import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';

// Image processing function
const processImage = async (uri, callback) => {
    try {
        // Compressing and converting to PNG format
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [], // No specific operations like cropping or rotation
            { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
        );
        callback(manipResult.uri);
    } catch (error) {
        console.error("Error processing image:", error);
        Alert.alert("Error processing image");
    }
};
export const openImagePickerAsync = async (callback) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        //allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
    });

    if (!result.cancelled && result.assets) {
        // Process each selected image
        result.assets.forEach(({ uri }) => {
            if (uri && typeof uri === 'string') {
                processImage(uri, callback);
            } else {
                console.error("Invalid URI:", uri);
            }
        });
    }
};
