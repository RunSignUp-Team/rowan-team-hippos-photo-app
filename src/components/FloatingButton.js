import React from "react";
import {View, Text, StyleSheet,} from "react-native";
import {Animated, TouchableWithoutFeedback, Dimensions} from "react-native";
import {AntDesign, Entypo, MaterialIcons} from "@expo/vector-icons";

export default class FloatingButton extends React.Component {
    animation = new Animated.Value(0);
    open = false;
    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.toggleMenu();
        }
    }
    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;
        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();
        this.open = !this.open;


    }
    render() {
        const pinStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -60]
                    })
                }
            ]
        }
        const imageStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -120]
                    })
                }
            ]
        }
        const liveStreamStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -180]
                    })
                }
            ]
        }
        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '45deg']
                    })
                }
            ]
        }
        const opacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        })
        

        const backgroundColor = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)'] 
        });
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, liveStreamStyle]}>
                        <MaterialIcons name="live-tv" size={36} color="#FFF" />
                        
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, imageStyle]}>
                        <Entypo name="image" size={36} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button,styles.secondary, pinStyle]}>
                        <Entypo name="folder-images" size={36} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    this.toggleMenu();
                    this.props.toggleMenu?.(!this.open);
                }}>
                    <Animated.View style={[styles.menu, styles.button, rotation]}>
                        <AntDesign name="plus" size={36} color="#FFF" />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() =>{
                    if(this.opne){
                        this.toggleMenu();
                        this.props.toggleMenu?.(!this.open);
                    }
                }}>
                    <Animated.View style={[styles.overlay, { opacity: this.animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }]} />

                </TouchableWithoutFeedback>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        position: 'absolute',
        top: 700,
        right: 50
    },
    button:{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#F02A4B',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    menu:{
        backgroundColor: '#ef4f9d'
    },  
    secondary:{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#41444B'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)', 
        width: '100%',
        height: '100%',
        
    }

});