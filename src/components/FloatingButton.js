import { Image, Pressable, StyleSheet, View, Modal, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
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

const FloatingButton = ({isOpenProp, onToggleRequest, raceId, RACE_EVENT_DAYS_ID}) => {
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
            duration: 500,
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
            albumWidth.value = withDelay(1200, withSpring(200));
            uploadPictureWidth.value = withDelay(1100, withSpring(200));
            liveStreamWidth.value = withDelay(1000, withSpring(200));
            opacity.value = withDelay(1200, withSpring(1));
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
        console.log("createAlbum function called");

        const apiUrl = 'https://test3.runsignup.com/Rest/v2/photos/create-race-photo-album.json';
        const API_KEY = "UOIPvgKli3B83uzfSuzVgYfRgk3Lzy9M";
        const X_RSU_API_SECRET = "P5f0VZidPKc9aa8r8uQa3lNB05DN3WgH";
        
        let formData = new FormData();
        formData.append('race_id', raceId);
        formData.append('race_event_days_id', RACE_EVENT_DAYS_ID); //hardcoded values for most of these ; has to be changed
        formData.append('rsu_api_key', API_KEY);
        formData.append('X-RSU-API-SECRET', X_RSU_API_SECRET);
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
                handlePress(); //in place of the handlePress(), can be linked with actual functionality in the future
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Album Name"
                            value={albumName}
                            onChangeText={setAlbumName}
                        />
                        <Button
                            title="Create"
                            onPress={() => {
                                createAlbum();
                                setModalVisible(!modalVisible);
                            }}
                        />
                    </View>
                </View>
            </Modal>
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
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
    },
});