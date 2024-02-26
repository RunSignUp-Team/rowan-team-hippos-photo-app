import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { styles } from '../src/styles/LoginStyles';

const Input = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasPressed, setHasPressed] = useState(false);

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
    formData.append('format', 'json');
    formData.append('supports_nb', 'F');
  
    try {
      let response = await fetch('https://runsignup.com/Rest/login?format=json&supports_nb=F', {
        method: 'POST',
        body: formData,
      });
  
      let json = await response.json();
      console.log(json);
      return json; // This will be the JSON object returned by the API ; check if the object contains a user to then move them to home screen
    } catch (error) {
      console.error(error);
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
    </View>
  );
};

export default Input;
