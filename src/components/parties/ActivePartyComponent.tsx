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
  HStack,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const ActivePartyComponent = ({partyName= "My Party"}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={()=> {navigation.navigate('singleParty')}}>
            <Box
                bg="#DDDDDD"
                py="$4"
                px="$3"
                // height="$200"
                width={375}
                maxWidth="93%"
                rounded="$md"
                borderColor="#878080"
                borderWidth={0.5}
                style={styles.badge}
                >
                <HStack justifyContent="center" height="50%" margin="$2">
                <View style={styles.safetyIcon}>
                    <Image
                    alt="shiedl"
                    source={require("../../../assets/location.png")}
                    style={{width: 50, height: 50}}
                    />
                </View>
                <View>
                    <Text bold={true} >My Party</Text>
                    <Text fontSize="$xs">expires in: 3 hours</Text>
                </View>
                </HStack>
                <HStack justifyContent="space-evenly" margin="$2" >
                <Badge size="lg" variant="outline" borderRadius="$md" action="success">
                    <BadgeText>Is Home 2</BadgeText>
                </Badge>
                <Badge size="lg" variant="outline" borderRadius="$md" action="error">
                    <BadgeText>Not Home 2</BadgeText>
                </Badge>
            </HStack>
        </Box>
    </TouchableOpacity>
    )
};
export default ActivePartyComponent;

const styles = StyleSheet.create({
    safetyIcon: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      margin: 10,
    },
    badge: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.15,
        shadowRadius: 7,
      },
})