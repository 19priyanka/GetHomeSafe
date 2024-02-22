import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './src/components/login/Login'; 
import ProfilePage from './src/components/profilepage/ProfilePage';
import SignUp from './src/components/signup/SignUp';
import Homepage from './src/components/parties/Homepage';
import MyParties from './src/components/parties/MyParties';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="MyParties" component={MyParties} />
      <Tab.Screen name="MyProfile" component={ProfilePage} />
    </Tab.Navigator>
  );
};


const Navigation = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
