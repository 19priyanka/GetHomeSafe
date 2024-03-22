import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {  useNavigation, useRoute } from "@react-navigation/native";
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
import MemberComponent from './memberComponent';

interface singlePartyProps{ navigation: any;}

export default function SingleParty(singlePartyProps) {

    const navigation = useNavigation();
    
    const route = useRoute();
    const { partyInfo } = route.params as { partyInfo: object };
    console.log("single party props: ", partyInfo);
    console.log(partyInfo.name);
    console.log(partyInfo.inviteCode);
  
    
    return (
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
        <ScrollView>
          <VStack space="md" reversed={false}>
            <Box>
              <View style={styles.heading}>
                <Heading size="4xl">{partyInfo.name}</Heading>
              </View>
              <View style={styles.heading}>
                <Text size="2xl" bold={true} >Join code: {partyInfo.inviteCode}</Text>
                <ScrollView contentContainerStyle={styles.memberList} 
                            scrollEnabled={true}
                            >
                {partyInfo.members.map((item, index) => (
                  <View key={index}>
                    <MemberComponent  memberData={item} ></MemberComponent>
                  </View>
                ))}
                </ScrollView>
              </View>
            </Box>
            <View style={styles.safetyIcon}>
                <Image
                  alt="shiedl"
                  source={require("../../../assets/location.png")}
                  style={{width: 50, height: 50}}
                />
            </View>
              
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
      justifyContent: "center",
      margin: 10,
    },
    heading: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    memberList: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      margin: 20,
      justifyContent: "flex-start",
      flexWrap: "wrap",
    },
  });