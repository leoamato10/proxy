
import React, { useContext, useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Text, TextInput, View, TouchableOpacity } from 'react-native'
import UserContext from '../../Context/UserProvider'
import { styles } from './LoginScreenStyles'


const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/490px-Marvel_Logo.svg.png"

const LoginScreen: React.FC = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleLogin = () => {
    const userCredentials = { email, password }

    if (email === "test@gmail.com" && password === "12345678") {
      login(userCredentials)
    } else {
      Alert.alert(
        "Credentials:",
        "email: test@gmail.com & password: 12345678"
      );
    }

  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          autoCapitalize={"none"}
          textContentType={"emailAddress"}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
