import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {  useNavigation } from "@react-navigation/native";
import {
  Box,
  Image,
  Text,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const ExpiredPartyComponent = ({partyName= "My Party"}) => {
    return (
        <Box
            bg="#DDDDDD"
            py="$4"
            px="$3"
            // height="$200"
            width="$40"
            maxWidth="100%"
            rounded="$md"
            borderColor="#878080"
            borderWidth={0.5}
            style={styles.badge}
            marginBottom="$3"
            >
            <View style={styles.safetyIcon} >
                <Image
                alt="shiedl"
                source={require("../../../assets/location.png")}
                style={{width: 50, height: 50}}
                opacity={0.6}
                />
            </View>
            <View style ={styles.textContent}>
                <Text bold={true}>My Party</Text>
                <Text fontSize="$xs" >expired</Text>
            </View>
    </Box>
    )
};
export default ExpiredPartyComponent;

const styles = StyleSheet.create({
    safetyIcon: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: 10,
    },
    badge: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.15,
        shadowRadius: 7,
      },
    textContent: {
        justifyContent: "center", 
        alignItems: "center", 
        opacity: 0.6,
    }
})