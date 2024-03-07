import React, { useEffect, useState } from "react";
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
  ButtonIcon,
  ButtonGroup,
  Text,
  HStack
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { auth } from "../../firebase/firebaseConfig";

export default function MyParties() {

  useEffect(() => {
    console.log(auth.currentUser)
  }, [])

    const navigation = useNavigation();
  
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
          <VStack space="md" reversed={false}>
            <Box>
              {/* <View style={styles.safetyIcon}>
                <Image
                  alt="shiedl"
                  source={require("../../../assets/location.png")}
                  style={{width: 50, height: 50}}
                />
              </View> */}
              <View style={styles.heading}>
                <Heading size="4xl">My Parties</Heading>
              </View>
              <View style={styles.heading}>
                <Text size="2xl" bold={true} >Active Parties</Text>
                <Box
                    bg="#0891b2"
                    py="$4"
                    px="$3"
                    rounded="$md"
                    maxWidth="50%"
                  >
                  <HStack justifyContent="space-between" height="50%">

                  </HStack>

                </Box>
              </View>
              <View style={styles.heading}>
                <Text size="2xl" bold={true} >Past Parties</Text>
                
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
      justifyContent: "flex-start",
    },
  });
  