
import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInput,  Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation,route})=>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true);
    
   
    const sendCred = async ()=>{
        await fetch('http://10.0.2.2:3000/api/user/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
         
        .then( async (response) => {
            const statusCode = response.status;
            //  console.log(response)

            if (response.status == 200) {
                const token = response.headers.get('auth-token');
                await AsyncStorage.setItem('token', token);
                //  console.log(token)
                    Alert.alert('Logged in Successfully');
                    navigation.navigate('Home');
        
            } 
            else if (response.status == 400) {
                Alert.alert('No user found');
            }

            else if (response.status == 401) {
                 Alert.alert('Invalid password'); 
            } 

            else if (response.status == 403) {
                 Alert.alert('Enter valid  Email or Password ');
            }
        })
          
    }

    return(
        <KeyboardAvoidingView behavior="position">
        <View>
            <View style={styles.addView}>
                <Text style={styles.addText}>
                   welcome to Todo App
                </Text>
            </View>

                <TextInput
                    label="Email"
                    value={email}
                    theme={theme}
                    style={styles.inputStyle}
                    mode= "outlined"
                    onChangeText= {email => setEmail(email)}
                />
                <TextInput
                    label="Password"
                    value={password}
                    secureTextEntry={hidePass ? true : false} 
                    theme={theme}
                    style={styles.inputStyle}
                    mode= "outlined"
                    onChangeText= {text => setPassword(text)}
                />
                <Icon style={{marginLeft:'90%', marginTop:'-10%'}}
                    name={hidePass ? 'eye-slash' : 'eye'}
                    size={15}
                    color="grey"
                    onPress={() => setHidePass(!hidePass)}
                />
                <Button
                    onPress={() => sendCred()}
                    style={styles.addButton1}
                    icon="login"
                    mode="contained">
                    Log-in
                </Button>
                
                <Button
                    onPress={() => navigation.navigate("Signup")}
                    style={styles.addButton2}
                    icon="account-plus"
                    mode="contained">
                    Sign-up
                </Button>
        </View>
        </KeyboardAvoidingView>
    )
}

const theme= {
    colors:{
        primary:"#008b8b"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,  
    }, 
     
    inputStyle:{
        margin:5,
        padding: 0,
        color:'#ff1493'
    },

    addText:{
        color:'#2f4f4f',
        fontSize:20,
        marginBottom:20
    },

    addView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:60
    },

    addButton1:{
        width: '50%',
        marginLeft: '25%',
        marginTop:'10%',
        backgroundColor:'#008b8b',
    },

    addButton2:{
        width: '50%',
        marginLeft: '25%',
        marginTop:'7%',
        backgroundColor:'#008b8b',
    },

})

export default Login