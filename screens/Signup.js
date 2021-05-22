import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Alert,
  KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import {TextInput,  Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Signup= ({navigation,route})=>{

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true);

    const sendCred = async()=>{
        await fetch("http://10.0.2.2:3000/api/user/register",{
            method:"post",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password,
            })
        })

        .then(res=>res.text())
        .then(text=>{
            Alert.alert(text)
        })
    }

    return(
        <KeyboardAvoidingView behavior="position">
        <View>
            <View style={styles.addView}>
                <Text style={styles.addText}>
                    Welcome to Todo App
                </Text>
            </View>
            
            <TextInput
                label="Name"
                value={name}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                onChangeText= {text => setName(text)}
            />

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

            <View  style={{flexDirection:'row', marginLeft: 17, fontSize:17, marginTop:10}}>
                <Text style={{color:'#2f4f4f', fontSize:17, marginTop:15}}>
                    Have an account? 
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{color:'blue', marginLeft: '8%', fontSize:17, marginTop:14}}>
                        Login Here
                    </Text>
                </TouchableOpacity>
            </View>

            <Button
                onPress={() => sendCred()}
                style={styles.addButton}
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
    
    addButton:{
        width: '40%',
        marginLeft: '30%',
        marginTop:'7%',
        backgroundColor:'#008b8b',
    },
})

export default Signup