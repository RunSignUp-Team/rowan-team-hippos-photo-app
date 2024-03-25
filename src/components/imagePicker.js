import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';
import axios from 'axios';

// Image processing function
const processImage = async (uri) => {
    try {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: {width:1000}}], // No specific operations like cropping or rotation
            { compress: 0.6, format: ImageManipulator.SaveFormat.PNG }
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
        return editedImage.uri; 
    } catch (error) {
        console.error("Error in handleSelectImage:", error);
        Alert.alert("Error cropping image");
        return uri; // Optionally return the original URI in case of error
    }
};

export const getUploadCredentials = async (API_KEY, API_SECRET, race_id, race_event_days_id, album_id) => {
    const apiURL = 'https://test3.runsignup.com/Rest/v2/photos/get-race-photo-upload-credentials.json';
    //const API_KEY = "5LQODl7dxN1nyDqwTTra3rlbgslaV83a";
    //const API_SECRET = "PnCFhbfsaQlBmTWlOenhlL0D1cvciyBB";
    try {
        const response = await fetch(`${apiURL}?race_id=${race_id}&race_event_days_id=${race_event_days_id}&rsu_api_key=${API_KEY}&album_id=${album_id}&`, {
            method: 'GET',
            headers: {
                'x-rsu-api-secret': API_SECRET,
            },
        });
        const json = await response.json();
        
        return json;

    } catch (error) {
        console.error("Error in getUploadCredentials:", error);
        Alert.alert("Error getting upload credentials");
    }
};

export const uploadImage = async (imageUri, credentials) => {
    if (!credentials) {
        console.log("Error getting upload credentials");
        return;
    }
    const { action, method, metaKeys, acl, key, 'X-Amz-Credential': xAmzCredential, 'X-Amz-Algorithm': xAmzAlgorithm, 'X-Amz-Date': xAmzDate, Policy, 'X-Amz-Signature': xAmzSignature } = credentials;
    const fileType = 'image/png'; 
    const fileExtension = '.png'; 
    const fileName = `${credentials.filePrefix}${new Date().getTime()}${fileExtension}`;
    console.log("fileName is:", fileName);
    console.log("action is:", action);
    let formData = new FormData();
    Object.keys(metaKeys).forEach(key => {
        console.log("Key:", key, "Value:", metaKeys[key]);
        formData.append(key, metaKeys[key]);
    });
    formData.append('acl', acl);
    formData.append('key', key);
    //formData.append('key', key.replace('${filename}', fileName));
    formData.append('x-amz-meta-filename', key.replace('${filename}', fileName));
    formData.append('X-Amz-Credential', xAmzCredential);
    formData.append('X-Amz-Algorithm', xAmzAlgorithm); 
    formData.append('X-Amz-Date', xAmzDate);
    formData.append('Policy', Policy);
    formData.append('X-Amz-Signature', xAmzSignature);
    formData.append('file', { uri: imageUri, type: fileType, name: fileName });


    for (const key in formData) {
        console.log("Key:", key, "Value:", formData[key]);
    }

    try {
        const uploadResponse = await axios({
            method: method.toLowerCase(), 
            url: action,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });

        Alert.alert("Image uploaded successfully");
        console.log("Image uploaded successfully");
    } catch (error) {
        console.error("Error in uploadImage:", error);
        // Check for response existence in error object to get HTTP status code and response data
        if (error.response) {
            console.log("Error uploading image", error.response.status, error.response.data);
            Alert.alert("Error uploading image", `Status: ${error.response.status}`);
        } else {
            Alert.alert("Error uploading image", error.message);
        }
    }
};

