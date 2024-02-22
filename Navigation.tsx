import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/components/login/Login'; 
import ProfilePage from './src/components/profilepage/ProfilePage';

import SignUp from './src/components/signup/SignUp';

import MyParties from './src/components/parties/MyParties';
import {Image } from "@gluestack-ui/themed";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
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
      <Tab.Screen name="MyParties" component={MyParties} options={{title: "My Parties"}} />
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
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
