import React from 'react-native';
import { View, Image, Text} from 'react-native';
import { styles } from '../styles/LoginStyles';


const Title = () => {
    return(
        <View style={styles.login_title_container}>
            <Image
                source={require('../../assets/runsignup.png')}  //hello text
                style={styles.login_image}
            />
            <Text style={styles.login_title_text}>Welcome!</Text>
        </View>
    );
};

export default Title;