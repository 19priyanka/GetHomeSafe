import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
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


export default function MyParties() {
    const navigation = useNavigation();
  
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
          <VStack space="md" reversed={false}>
            <Box>
              <View style={styles.safetyIcon}>
                <Image
                  alt="shiedl"
                  source={require("../../../assets/location.png")}
                  style={{width: 50, height: 50}}
                />
              </View>
              <View style={styles.heading}>
                  <Heading size="4xl">My Parties</Heading>
                </View>
            </Box>
             {/*Rest of the code goes here @nicole*/}
              
          </VStack>
   
        </SafeAreaView>
      </GluestackUIProvider>
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
  