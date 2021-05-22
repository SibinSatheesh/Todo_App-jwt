
import React from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Image,
  Alert
  
} from 'react-native';
import { Title,Card, Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const Profile = (props)=>{
   
    const {_id,name,position,email,phone} = props.route.params.item;
    console.log(_id)

    const deleteUser = ()=>{
        fetch("http://10.0.2.2:3000/delete",{
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deletedUser =>{
            Alert.alert(`${deletedUser.name} deleted successfully`)
            props.navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    return(
       
        <View style={styles.root}>
            <LinearGradient
                colors={['#e0ffff', '#008b8b' ]}
                style={{height:"20%"}}
            />

            <View style={{alignItems:"center"}}>
                <Image
                    style={{ height:140, width: 140, borderRadius:140/2, marginTop:-50}}
                    source={require('../assets/person.jpg')}
                />
            </View> 

            <View style={{alignItems:"center",margin:15}}>
                <Title style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                    {name}
                </Title>

                <Text style={{fontSize:15,color:"#008b8b"}}>
                    {position}
                </Text>
            </View>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <Feather
                        name="mail"
                        size={32}
                        color="#008b8b"
                        style={{marginLeft:17}}
                    />

                    <Text style={{marginLeft:10, fontSize:17,marginTop:3}}>
                        {email}
                    </Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <Feather
                        name="phone"
                        size={32}
                        color="#008b8b"
                        style={{marginLeft:17}}
                    />

                    <Text style={{marginLeft:10, fontSize:17,marginTop:3}}>
                        {phone}
                    </Text>
                </View>
            </Card>

            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Button 
                    onPress={() => {
                        props.navigation.navigate("Update",
                            {_id,name,position,email,phone}
                        )
                    }} 
                    style={styles.addButton}
                    icon="account-edit"
                    mode="contained">
                        Edit
                </Button>

                <Button 
                    onPress={() => deleteUser()} 
                    style={styles.addButton}
                    icon="delete"
                    mode="contained">
                        Delete
                </Button>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    root:{
        flex:1,
    },  
    
    myCard:{
        margin:8,
    }, 

    cardContent:{
       flexDirection:"row",
    },  
    
    addButton:{
        backgroundColor:"#008b8b",
        marginTop:25,
        width: '35%',
    },
})

export default Profile