import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  useNavigation, NavigationContainer } from "@react-navigation/native";
import {
  GluestackUIProvider,
  SafeAreaView,
  VStack,
  Box,
  Image,
  Heading,
  Button,
  ButtonText,
  Text
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import MyParties from "../parties/MyParties";
import ProfilePage from "../profilepage/ProfilePage";
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

function Parties(){
  return (
   <MyParties />
  );
}

function Profile(){
  return (
   <ProfilePage/>
  );
}


export default function Homepage() {


  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="MyParties" component={Parties} />
      <Tab.Screen name="MyProfile" component={Profile} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safetyIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
