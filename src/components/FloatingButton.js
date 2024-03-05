import React from "react";
import {View, Text, StyleSheet,} from "react-native";
import {Animated, TouchableWithoutFeedback} from "react-native";
import {AntDesign, Entypo} from "@expo/vector-icons";

export default class FloatingButton extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.menu, styles.button]}>
                        <AntDesign name="plus" size={36} color="#FFF" />
                    </Animated.View>
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
    }
});