import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { styles } from '../styles/LoginStyles';
import { useAuth } from './AuthContext'; //importing the useAuth from the AuthContext.js file

const Input = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasPressed, setHasPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const { setTmpKey, setTmpSecret, setUsersName, usersName } = useAuth();

  const handleUsernameChange = (text) => {
    setUsername(text); //changes the username when the input field is changed
  };

  const handlePasswordChange = (text) => {
    setPassword(text); //changes the password when the input field is changed
  };

  async function loginUser(username, password) {

    setHasPressed(true); //set true when pressed for first time to indicate the input fields to turn red

    // Construct FormData
    let formData = new FormData();
    formData.append('email', username);
    formData.append('password', password);
    //formData.append('format', 'json');
    //formData.append('supports_nb', 'F');
    console.log(formData);
  
    try {
      let response = await fetch('https://test3.runsignup.com/Rest/login?format=json&supports_nb=F', {
        method: 'POST',
        body: formData
      });
      let json = await response.json();

      if (json.error) { // Handle the error case
        console.error(json.error.error_msg); // error message
        setErrorMessage('Login failed. Please try again.'); //setting the error message below the submit button
      } else { // Assume success if no error occurs
        setErrorMessage('');  //resetting the error message when successful login
        setTmpSecret(json.tmp_secret)
        setTmpKey(json.tmp_key); //setting the tmpKey to the returned tmp_key from the JSON object
        setUsersName(json.user.user.first_name + " " + json.user.user.last_name);
        // if tmpKey is needed in another file ; import { useAuth } from AuthContext and then const { tmpKey } = useAuth();
        console.log(json);
        navigation.navigate('Home'); // Navigate to the Home screen
      }

    } catch (error) {
      console.error(error); // Catch and log any errors during the fetch operation
    }
}

return (
    <View style={styles.login_container}>
      <TextInput
        style={[styles.login_input, { borderColor: (username=='' && hasPressed==true) ? 'red' : 'black' }]}
        placeholder="Email"
        onChangeText={handleUsernameChange}
        value={username}
      />
      <TextInput
        style={[styles.login_input, { borderColor: (password=='' && hasPressed==true) ? 'red' : 'black' }]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={password}
      />
      <Pressable style={({ pressed }) => [styles.login_button,{backgroundColor: pressed ? 'rgb(175,16,93)' : 'rgb(239,79,157)'}]} onPress={() => loginUser(username, password)}>
        <Text style={styles.login_text}>Submit</Text>
      </Pressable>
      {hasPressed && errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : <Text style={styles.errorMessage}></Text>} 
    </View>
  );
};

export default Input;
