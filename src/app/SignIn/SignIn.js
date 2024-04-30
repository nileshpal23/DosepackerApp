import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleSignIn = () => {
        // Handle sign-in logic here
        console.log('Signing in with:', email, password);
        postData('http://qa-auth.dosepack.com/api/loginuser', { username: email, password: password, scope:'dp-full-scope', client_id:'dp-web-app',response_type:'token' })
        .then(data => {
            navigation.navigate('Home');
          console.log(data); // JSON data parsed by `response.json()` call
        })
        .catch(error => {
          console.error('Error:', error);
        });

        
        // navigation.navigate('Home')

        
    };

    async function postData(url = '', data = {}) {
        // Convert data object to URL-encoded string
        const formData = Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
      
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
    
      
    
      

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/logo.png')} // Replace this with your company logo
                    style={styles.logo}
                />
            </View>
            <View style={styles.welcomeContainer}>
                <Text style={styles.signInText}>Sign In</Text>
                <Text style={styles.pickUpLine}>
                    To experience the era of automation.
                </Text>
            </View>
            
            <View style={styles.formContainer}>
                <Text style={styles.label}> Username </Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. example@vb"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.label}> Password </Text>
                <TextInput
                    style={styles.input}
                    placeholder="******"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
                <View style={styles.buttonContainer}>
                <Button color={'orange'} title="Sign In" onPress={handleSignIn} />
                </View>
                <Text style={styles.callText}>Need Help? Call 1800-MyDoses</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:'#F4F4F4'
    },
    logoContainer: {
        // marginBottom: 0,
        marginTop:35
    },
    logo: {
        width: 350,
        height: 150,
        resizeMode: 'contain',
        marginLeft:-30
    },
    welcomeContainer:{
        marginTop: -15
    },
    signInText:{
        fontSize:35,
        color:'#474747',
    },
    pickUpLine:{
        color:'#8F8F8F',
        marginTop:5
    },  
    formContainer: {
        // width: '80%',
        marginTop: 40
    },
    input: {
        width: 400,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    label:{
        fontSize: 15
    },

    forgotPassText:{
        marginTop: -20
    },

    buttonContainer:{
        marginTop: 60,
    },  

    callText:{
        marginTop: 40,
        alignSelf: 'center'
    }

});
