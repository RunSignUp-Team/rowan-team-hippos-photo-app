import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';

// Image processing function
const processImage = async (uri) => {
    try {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [], // No specific operations like cropping or rotation
            { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
        );
        return manipResult.uri;
    } catch (error) {
        console.error("Error processing image:", error);
        Alert.alert("Error processing image");
        return uri; // Fallback URI
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
        // Process each selected image and return URIs
        const processedUris = await Promise.all(result.assets.map(async ({ uri }) => {
            if (uri && typeof uri === 'string') {
                const processedUri = await processImage(uri);
                return processedUri;
            }
            console.error("Invalid URI:", uri);
            return uri; // Fallback in case of an error
        }));
        return processedUris;
    }
    return [];
};

export const handleSelectImage = async (uri) => {
    try {
        const editedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ crop: { originX: 0, originY: 0, width: 100, height: 100 } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        return editedImage.uri; // Assuming you want to use the edited image URI elsewhere
    } catch (error) {
        console.error("Error in handleSelectImage:", error);
        Alert.alert("Error cropping image");
        return uri; // Optionally return the original URI in case of error
    }
};
