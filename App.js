import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  View, 
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Create_User from './screens/Create_User';
import Profile from './screens/Profile';
import Update from './screens/Update';

import {createStore} from 'redux';
import {reducer} from './reducers/reducer';
import { Provider } from 'react-redux';


const store = createStore(reducer);



const Stack = createStackNavigator();

const myOptions = {
  title:"Home",
  headerTintColor:"white",
  headerStyle:{
  backgroundColor:"#008b8b"
  }
}
function App (){

  return (
    
    <View style={styles.container}>
      <Stack.Navigator >
      
        <Stack.Screen name="Login" component={Login} 
           options={{...myOptions,title:"Login"}}
        />

        <Stack.Screen name="Signup" component={Signup} 
           options={{...myOptions,title:"Signup"}}
        />
        
        <Stack.Screen name="Home" component={Home} 
          options={myOptions}
        />

        <Stack.Screen name="Profile" component={Profile} 
          options={{...myOptions,title:"Profile"}}
        />

        <Stack.Screen name="Create" component={Create_User}
          options={{...myOptions,title:"Create"}}
        />

        <Stack.Screen name="Update" component={Update} 
          options={{...myOptions,title:"Update"}}
        /> 

      </Stack.Navigator>
    </View>
    
  );
}

export default ()=>{
  return(
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
  },
});
