import * as React from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import {
   Card, FAB, Button
} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({navigation})=>{

    const dispatch = useDispatch()
    const {data,loading} = useSelector((state)=>{
        return state
    })
    
    const logout = ()=>{
        AsyncStorage.removeItem("token")
        .then(()=>{
            navigation.replace("Login") 
        })
    }

    let [responseData, setResponseData] = React.useState('')

    const verifyTok = async ()=>{
        const token = await AsyncStorage.getItem('token')
        // console.log(token)
            await  fetch("http://10.0.2.2:3000/api/get",{
                method: "GET",
                headers:{
                    'Content-Type': "application/json",
                    'auth-token': token
                },
            })
                .then(res=>res.text())
                .then(data=>{
                    setResponseData(data)    
                })                
    }

    const fetchData = async ()=>{
        await fetch("http://10.0.2.2:3000/get")
            .then(res=>res.json())
            .then(results=>{
                dispatch({type:"ADD_DATA",payload:results})
                dispatch({type:"SET_LOADING",payload:false})
            })
                .catch(err=>{
                    Alert.alert("Something went wrong")
                })
    }

    useEffect(()=>{
        verifyTok()
        fetchData()
    },[])

    const renderList = ((item)=>{

        return(
           
            <Card style={ styles.myCard}
                onPress={() => navigation.navigate("Profile",{item})}>
                <View style={ styles.cardView}>
                    <Image
                        style={{ height:70, width: 70}}
                        source={require('../assets/person.jpg')}
                    />
                    <View styles={{marginLeft:10}}>
                        <Text style={styles.text1}>{item.name}</Text> 
                        <Text style={styles.text2}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })     
        return(

            <View style={{flex:1}}>
                <FlatList
                    data={data}
                        renderItem={ ({item})=> {
                            return renderList(item)
                        }}
                        keyExtractor={item=>item._id}
                        onRefresh={()=>fetchData()}
                        refreshing={loading}
                />
                    <FAB
                        style={styles.fab3}
                        small={false}
                        label= {responseData}
                    />
                    <FAB 
                        onPress={() => navigation.navigate("Create")}
                        style={styles.fab2}
                        icon="plus"
                        small={false}
                    />  
                    <FAB
                        onPress={() => logout()}
                        style={styles.fab1}
                        small={false}
                        icon="logout"
                        label="Log out">
                    </FAB>    
            </View>           
        )     
}

const styles = StyleSheet.create({

    myCard:{
        margin:5,
        flexDirection:"row",
    },
    cardView:{
        padding:7,
        flexDirection:"row",
    },
    text1:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:5,
        marginLeft:5,
        color:"#2f4f4f"
    },
    text2:{
        fontSize:17,
        marginTop:5,
        marginLeft:5,
        fontStyle:"italic",
        color:"#2f4f4f",
    },
    fab1:{
        position:'absolute',
        margin: 5,
        right: 0,
        bottom: 1,
        backgroundColor:"#008b8b"
    },
    fab2:{
        
        position:'absolute',
        margin: 17,
        right:17,
        bottom:'8%',
        backgroundColor:"#008b8b"
    },
    fab3:{
        
        position:'absolute',
        right:8,
        bottom:'101%',
        backgroundColor:"#008b8b"
    },
})

export default Home;