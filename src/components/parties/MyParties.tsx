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
import { getAuth } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";
import axiosInstance from "../../utils/axios";

export default function MyParties() {
  const auth = getAuth(app);
  const navigation = useNavigation();
  const [myParties, setMyParties]= useState([]);
  const [oldParties, setOldParties ]= useState([]);
  useEffect(() => {
    axiosInstance.get("/api/parties",{headers:{Authorization: auth.currentUser.accessToken}})
      .then((response) => {
          console.log(response.data);
          let active = [];
          let expired = [];
          response.data.map((party)=>{
            if(party.active){
              active.push(party);
            }
            else{
              expired.push(party);
            }
          });
          setOldParties(expired);
          setMyParties(active);
      }).catch((e) => {
      console.error(e);
          console.log("error getting parties: ",e);
      })
  }, [])

    
    
  
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
          <ScrollView>
            <VStack space="md" reversed={false}>
              <Box>
                <View style={styles.heading}>
                  <Heading size="4xl">My Parties</Heading>
                </View>
                <View style={{zIndex:1}}>
                <FabMenu/>
                </View>
            
                <View style={styles.heading}>
                  <Text size="2xl" bold={true} >Active Parties</Text>
                  <ScrollView horizontal contentContainerStyle={styles.activeParties} >
                    {myParties.map((party, index) => (
                      <View key={index}>
                        <ActivePartyComponent  partyInfo={party} ></ActivePartyComponent>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View style={styles.heading}>
                  <Text size="2xl" bold={true} >Past Parties</Text>
                  <View style={styles.expiredParties} >
                    {oldParties.map((party, index) => (
                      <View key={index}>
                        <ExpiredPartyComponent  partyName={party.name} ></ExpiredPartyComponent>
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
      flexDirection: 'row',
      margin: 20,
      height: 180,
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
  