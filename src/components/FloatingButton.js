import React from "react";
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

export default class FloatingButton extends React.Component {
    animation = new Animated.Value(0);

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.toggleMenu();
        }
    }

    toggleMenu = () => {
        const toValue = this.props.isOpen ? 1 : 0;
        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: false,
        }).start();
    }

    render() {
        const buttonStyle = { zIndex: 10 }; // Ensure buttons are always above the overlay
        const pinStyle = this.createButtonAnimationStyle(-60, buttonStyle);
        const imageStyle = this.createButtonAnimationStyle(-120, buttonStyle);
        const liveStreamStyle = this.createButtonAnimationStyle(-180, buttonStyle);
        const rotation = this.createRotationStyle();
        const overlayStyle = this.createOverlayStyle();

        return (
            <View style={styles.container}>
                {this.renderButton("live-tv", liveStreamStyle, MaterialIcons)}
                {this.renderButton("image", imageStyle, Entypo)}
                {this.renderButton("folder-images", pinStyle, Entypo)}
                <TouchableWithoutFeedback onPress={this.props.onToggleRequest}>
                    <Animated.View style={[styles.menu, styles.button, rotation, buttonStyle]}>
                        <AntDesign name="plus" size={36} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.props.onToggleRequest}>
                    <Animated.View style={[styles.overlay, overlayStyle]} />
                </TouchableWithoutFeedback>
            </View>
        );
    }

    createButtonAnimationStyle(translateY, additionalStyle = {}) {
        return {
            ...additionalStyle,
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, translateY],
                    }),
                },
            ],
        };
    }

    createRotationStyle() {
        return {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "45deg"],
                    }),
                },
            ],
        };
    }

    createOverlayStyle() {
        return {
            opacity: this.animation,
            zIndex: this.animation.interpolate({
                inputRange: [0, 0.01],
                outputRange: [-1, 2],
                extrapolate: "clamp",
            }),
        };
    }

    renderButton(iconName, style, IconComponent) {
        return (
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.button, styles.secondary, style]}>
                    <IconComponent name={iconName} size={24} color="#FFF" />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute",
        top: 700,
        right: 50,
    },
    button: {
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        zIndex: 10,
    },
    menu: {
        backgroundColor: "#ef4f9d",
    },
    secondary: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#41444B",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        width: "100%",
        height: "100%",
    },
});
