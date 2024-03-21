// ModalPopup.js
import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    TouchableOpacity
} from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const ModalPopup = ({ visible, children, onClose }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose} // Use the onClose function when the close icon is pressed
                    >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
        paddingBottom: 150,
        paddingTop: 40,
        height: 250,
    },
    closeButton: {
        position: 'absolute',
        top: 10, 
        right: 10,
    },
});

export default ModalPopup;
