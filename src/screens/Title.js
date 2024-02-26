import React from 'react-native';
import { View, Image, StyleSheet, Text} from 'react-native';

const Title = () => {
    return(
        <View style={styles.container}>
            <Image
                source={require('../../assets/runsignup.png')}
                style={styles.image}
            />
            <Text style={styles.text}>Welcome!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 100,
    },
    image: {
        resizeMode: 'cover',
        width: 250,
        marginBottom: 50,
        alignContent: 'center',
    },
    text: {
        alignContent: 'center',
        fontSize: 45,
        fontFamily: 'Apple SD Gothic Neo',
    }
});

export default Title;