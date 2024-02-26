import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';

const Input = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [hasPressed, setHasPressed] = useState(false);

  const handleUsernameChange = (text) => {
    setUsername(text);
    if (hasPressed) {
      setUsernameEmpty(text === '');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (hasPressed) {
      setPasswordEmpty(text === '');
    }
  };

  const handleLogin = () => {
    setHasPressed(true);
    
    console.log('Username:', username);
    console.log('Password:', password);

    if(username.trim() == '' || password.trim() == '') {
      console.log('empty');
    } else {
      //handle login
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: usernameEmpty ? 'red' : 'black' }]}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />
      <TextInput
        style={[styles.input, { borderColor: passwordEmpty ? 'red' : 'black' }]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={password}
      />
      <Pressable style={({ pressed }) => [styles.button,{backgroundColor: pressed ? 'rgb(175,16,93)' : 'rgb(239,79,157)'}]} onPress={handleLogin}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  input: {
    height: 50,
    width: 280,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    textAlign: 'center',
    borderRadius: 25,
  },
  button: {
    height: 50,
    width: 280,
    orderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});

export default Input;
