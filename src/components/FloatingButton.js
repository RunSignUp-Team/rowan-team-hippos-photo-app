import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, {useEffect} from 'react';
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

const FloatingButton = ({isOpenProp, onToggleRequest}) => {
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
                handlePress(); //in place of the handlePress(), can be linked with actual functionality in the future
            
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
});