import { Image, Pressable, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import ModalPopup from './Modal';

const FloatingButton = ({isOpenProp, onToggleRequest, onNewAlbumRequest, raceId, RACE_EVENT_DAYS_ID}) => {
    const navigation = useNavigation();
    const albumValue = useSharedValue(30);
    const uploadPictureValue = useSharedValue(30);
    const liveStreamValue = useSharedValue(30);
    const albumWidth = useSharedValue(60);
    const uploadPictureWidth = useSharedValue(60);
    const liveStreamWidth = useSharedValue(60);
    const isOpen = useSharedValue(isOpenProp ? 1 : 0);
    const opacity = useSharedValue(0);
    const progress = useDerivedValue(() =>
        isOpen.value ? withTiming(1) : withTiming(0),
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [albumName, setAlbumName] = useState('');
    const [hasPressed, setHasPressed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 

    // When you want to close the modal, passed to ModalPopup as onClose prop
    const onCloseModal = () => {
        setModalVisible(false);
        setErrorMessage('');
    };

    const animateButton = (shouldOpen) => {
        const config = { easing: Easing.bezier(0.68, -0.6, 0.32, 1.6), duration: 500 };

         {
            // Trigger closing animations
            if (!shouldOpen) {
                albumWidth.value = withTiming(60, { duration: 100 }, finish => {
                    if (finish) {
                        albumValue.value = withTiming(30, config);
                    }
                });
                uploadPictureWidth.value = withTiming(60, { duration: 100 }, finish => {
                    if (finish) {
                        uploadPictureValue.value = withDelay(50, withTiming(30, config));
                    }
                });
                liveStreamWidth.value = withTiming(60, { duration: 100 }, finish => {
                    if (finish) {
                        liveStreamValue.value = withDelay(100, withTiming(30, config));
                    }
                });
                opacity.value = withTiming(0, { duration: 100 });
            } 
        }
    };
    useEffect(() => {
        // This ensures FloatingButton's visual state matches isOpenProp, which is passed from the 
        //parent component (homeScreen or whatever it is linked with)
        isOpen.value = isOpenProp ? withTiming(1) : withTiming(0);
        animateButton(isOpenProp);
        
    }, [isOpenProp]);



    const handlePress = () => {
        //communicates with the parent component to create a translucent overlay on the screen
        onToggleRequest();
        const config = {
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
            duration: 100,
        };
        //if isOpen is true, which means the menu will be closed on clicking the plus icon
        if (isOpen.value) {
            albumWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    albumValue.value = withTiming(30, config);
                }
            });
            uploadPictureWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    uploadPictureValue.value = withDelay(50, withTiming(30, config));
                }
            });
            liveStreamWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    liveStreamValue.value = withDelay(100, withTiming(30, config));
                }
            });
            opacity.value = withTiming(0, { duration: 100 });

        } else {
            //if isOpen is false, which means the menu will be opened on clicking the plus icon
            albumValue.value = withDelay(200, withSpring(130));
            uploadPictureValue.value = withDelay(100, withSpring(210));
            liveStreamValue.value = withSpring(290);
            albumWidth.value = withDelay(250, withSpring(200));
            uploadPictureWidth.value = withDelay(200, withSpring(200));
            liveStreamWidth.value = withDelay(150, withSpring(200));
            opacity.value = withDelay(350, withSpring(1));
        }
        isOpen.value = !isOpen.value;
    };

    const opacityText = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const newAlbumStyle = useAnimatedStyle(() => {
        return {
            width: albumWidth.value,
        };
    });
    const uploadPictureStyle = useAnimatedStyle(() => {
        return {
            width: uploadPictureWidth.value,
        };
    });
    const liveStreamStyle = useAnimatedStyle(() => {
        return {
            width: liveStreamWidth.value,
        };
    });

    const createFolder = useAnimatedStyle(() => {
        const scale = interpolate(
            albumValue.value,
            [30, 130],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: albumValue.value,
            transform: [{ scale: scale }],
        };
    });

    const uploadPicture = useAnimatedStyle(() => {
        const scale = interpolate(
            uploadPictureValue.value,
            [30, 210],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: uploadPictureValue.value,
            transform: [{ scale: scale }],
        };
    });

    const liveStream = useAnimatedStyle(() => {
        const scale = interpolate(
            liveStreamValue.value,
            [30, 290],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: liveStreamValue.value,
            transform: [{ scale: scale }],
        };
    });

    const plusIcon = useAnimatedStyle(() => {
        return {
            // to rotate the plus icon on clicking for an effect
            transform: [{ rotate: `${progress.value * 45}deg` }],
        };
    });

    const createAlbum = async () => {
        setHasPressed(true);

        if (!albumName.trim()) {
            setErrorMessage("Please enter a name for the album.");
            return;
        }

        console.log("createAlbum function called");

        const apiUrl = 'https://test3.runsignup.com/Rest/v2/photos/create-race-photo-album.json';
        const API_KEY = "UOIPvgKli3B83uzfSuzVgYfRgk3Lzy9M";
        const X_RSU_API_SECRET = "P5f0VZidPKc9aa8r8uQa3lNB05DN3WgH";
        
        let formData = new FormData();
        formData.append('race_id', raceId);
        formData.append('race_event_days_id', RACE_EVENT_DAYS_ID);
        formData.append('rsu_api_key', API_KEY);
        formData.append('X-RSU-API-SECRET', X_RSU_API_SECRET);
        formData.append('album_name', albumName);
      
        try {
          const response = await fetch(`${apiUrl}?race_event_days_id=${RACE_EVENT_DAYS_ID}&rsu_api_key=${API_KEY}&race_id=${raceId}`, {
            method: 'POST',
            headers: {
                'x-rsu-api-secret': X_RSU_API_SECRET,
            },
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('API call failed with status ' + response.status);
          }
      
          const data = await response.json();
          console.log("Album created successfully:", data);
          setAlbumName('');
          setErrorMessage('');
          setModalVisible(false);
          // successful response
        } catch (error) {
          console.error("Error creating album:", error);
          setErrorMessage("Failed to create album. Please try again."); // Update error message to reflect the failure
          // error code
        }
      };

      return (
        <View style>
            <Pressable onPress={() => {
                handlePress(); //in place of the handlePress(), can be linked with actual functionality in the future
            }}>
            <Animated.View
                style={[styles.contentContainer, liveStream, liveStreamStyle]}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/liveStream.png')} //third icon
                        style={styles.icon}
                    />
                </View>
                <Animated.Text style={[styles.text, opacityText]}>
                    Live Stream
                </Animated.Text>
            </Animated.View>
            </Pressable>
            <Pressable onPress={() => {
                onNewAlbumRequest();
                handlePress();
            }}>            
            <Animated.View
                style={[styles.contentContainer, uploadPicture, uploadPictureStyle]}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/uploadPicture.png')} //second icon
                        style={styles.icon}
                    />
                </View>
                <Animated.Text style={[styles.text, opacityText]}>
                    Upload Pictures
                </Animated.Text>
            </Animated.View>
            </Pressable>

            <Pressable onPress={() => {
                setModalVisible(true); //make create album modal visible ; modal has its own onPress in return statement
            
            }}>
            <Animated.View
                style={[styles.contentContainer, createFolder, newAlbumStyle]}>
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../../assets/createFolder.png')} //first icon
                        style={styles.icon}
                    />
                </View>
                <Animated.Text style={[styles.text, opacityText]}>
                    New Album
                </Animated.Text>
            </Animated.View>
            </Pressable>
            <Pressable
                style={styles.contentContainer}
                onPress={() => {
                    handlePress(); // this opens/closes the menu on pressing
                }}>
                <Animated.View style={[styles.iconContainer, plusIcon]}>
                    <Image
                        source={require('../../assets/PlusIcon.png')}
                        style={styles.icon}
                    />
                </Animated.View>
            </Pressable>
            <ModalPopup visible={modalVisible}
                onClose={onCloseModal}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Album Name"
                    value={albumName}
                    onChangeText={setAlbumName}
                />
                <Button
                    title="Create"
                    onPress={createAlbum}
                />
                {errorMessage ? <Text style={styles.errorMessageStyle}>{errorMessage}</Text> : null}
            </ModalPopup>
        </View>
    );
};

export default FloatingButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        backgroundColor: "#ef4f9d",
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 26,
        height: 26,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250,
    },
    closeButton: {
        backgroundColor: '#ddd', 
        width: 25, 
        height: 25, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 12.5,
        opacity: 0.8,
    },
    createButton: {
        backgroundColor: "#007BFF", 
        width: 50,
        height: 20,
    },
    createButtonText: {
        color: "white", 
        fontSize: 15,
    },
    errorMessageStyle: {
        color: 'red',
        textAlign: 'center', // This centers the text horizontally.
        marginTop: 20, // Optional, adds some space above the error message if needed.
    },
});