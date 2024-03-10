import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
  HStack,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { auth } from "../../firebase/firebaseConfig";
import ActivePartyComponent from './ActivePartyComponent';
import ExpiredPartyComponent from './ExpiredPartyComponent';
import FabMenu from '../parties/FabMenu';

export default function MyParties() {

  useEffect(() => {
    console.log(auth.currentUser)
  }, [])

    const navigation = useNavigation();
    const myParties = ['1','2'];
    const oldParties = ['1','2', '3','4','5','6'];
  
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
          <ScrollView>
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
                <View style={{zIndex:1}}>
                <FabMenu/>
                </View>
            
                <View style={styles.heading}>
                  <Text size="2xl" bold={true} >Active Parties</Text>
                  <ScrollView contentContainerStyle={styles.activeParties} 
                              scrollEnabled={true}
                              alwaysBounceHorizontal ={true}
                              alwaysBounceVertical ={false}
                              >
                    {myParties.map((item, index) => (
                      <View key={index}>
                        <ActivePartyComponent  partyName={"My Party"} ></ActivePartyComponent>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.heading}>
                  <Text size="2xl" bold={true} >Past Parties</Text>
                  <View style={styles.expiredParties} >
                    {oldParties.map((item, index) => (
                      <View key={index}>
                        <ExpiredPartyComponent  partyName={"My Party"} ></ExpiredPartyComponent>
                      </View>
                    ))}
                  </View>
                </View>
              </Box>
              {/*Rest of the code goes here @nicole*/}
                
            </VStack>
          </ScrollView>
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
    activeParties: {
      display: "flex",
      flexDirection: "row",
      margin: 20,
      justifyContent: "space-between",
      alignItems: 'flex-start',
      width: '200%'
    },
    expiredParties: {
      display: "flex",
      flex: 2,
      flexDirection: "row",
      margin: 20,
      justifyContent: "space-evenly",
      flexWrap: "wrap",
    },
  });
  