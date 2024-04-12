import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/components/login/Login'; 
import ProfilePage from './src/components/profilepage/ProfilePage';

import SignUp from './src/components/signup/SignUp';

import MyParties from './src/components/parties/MyParties';
import {Image } from "@gluestack-ui/themed";
import SingleParty from './src/components/parties/singleParty'
import { TurboModuleRegistry } from 'react-native';
import * as Location from 'expo-location';
import axiosInstance from "./src/utils/axios";
import { getAuth } from "firebase/auth";
import { app } from "./src/firebase/firebaseConfig";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
  const auth = getAuth(app);

  useEffect(() => {
    
    const fetchLocationAndSendUpdate = async () => {
      // console.log("every 30 seconds...");
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      try {
        // Get the device's current location
        const { coords } = await Location.getCurrentPositionAsync({});

        // Send location data to the server using Axios
        axiosInstance.post('/api/locationUpdate', {
          currentLat: coords.latitude,
          currentLong: coords.longitude,
        }, {
          headers: { Authorization: auth.currentUser.accessToken }
        }).then((response) => {
          console.log("Location update sent successfully ", response.data);
        }).catch((error) => {
          console.error('Error sending location update:', error);
        });
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    };

    // Call the function immediately and then every 30 seconds
    fetchLocationAndSendUpdate();
    const intervalId = setInterval(fetchLocationAndSendUpdate, 30000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        
        let iconComponent;
        if (route.name === 'MyParties') {
          iconComponent = <Image alt='MyParties icon' source={require("./assets/people.png")} style={{marginTop:5, width: 40, height: 40 }} />;
        } else if (route.name === 'MyProfile') {
          iconComponent = <Image alt='MyProfile icon' source={require("./assets/user.png")} style={{  marginTop:9, width: 40, height: 40 }} />;
        }
       
        return iconComponent;
      },
      tabBarLabelStyle: {
        fontSize: 14, 
      },
      tabBarShowLabel: false,
      keyboardHidesTabBar: true, 
        })}    
      >
      <Tab.Screen name="MyParties" component={MyParties} options={{title: "Parties"}} />
     
      <Tab.Screen name="MyProfile" component={ProfilePage} options={{title: "My Account"}}/>
    
    </Tab.Navigator>
  );
};


const Navigation = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false, title: "Back"}} />
      <Stack.Screen name="SingleParty" component={SingleParty} options={{ headerShown: true, title: "My Party" }} /> 
     

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
