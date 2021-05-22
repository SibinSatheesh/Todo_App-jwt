import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Alert,
  KeyboardAvoidingView

} from 'react-native';
import {TextInput,  Button} from 'react-native-paper';

const Update = ({navigation,route})=>{
    const getDetails = (type) =>{
        if (route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "position":   
                    return route.params.position  
                case "email":   
                    return route.params.email    
                case "phone":   
                    return route.params.phone
            }
        }
        return ""
    }
    if(route.params){
        console.log(route.params)
    }

    const [name,setName] = useState(getDetails("name"))
    const [position,setPosition] = useState(getDetails("position"))
    const [email,setEmail] = useState(getDetails("email"))
    const [phone,setPhone] = useState(getDetails("phone"))
   
    const updatedData = ()=>{
        fetch("http://10.0.2.2:3000/update",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: route.params._id,
                name,
                position,
                email,
                phone,
            })
        })
        .then(res=>res.json())
        .then(data =>{
            Alert.alert(`${data.name} is updated successfully`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    return (
        <View>
            <KeyboardAvoidingView behavior="position">

            <View style={styles.addView}>
                <Text style={styles.addText}>
                    EDIT DETAILS
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
                label="Position"
                value={position}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                onChangeText= {text => setPosition(text)}
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
                label="Phone"
                value={phone}
                theme={theme}
                style={styles.inputStyle}
                mode= "outlined"
                onChangeText= {text => setPhone(text)}
            />

            <Button
                onPress={() => updatedData()}
                style={styles.addButton}
                icon="account-edit"
                mode="contained">
                    Update
            </Button>
            </KeyboardAvoidingView>
        </View>
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
        marginTop:'10%',
        backgroundColor:'#008b8b',
    },
})

export default Update