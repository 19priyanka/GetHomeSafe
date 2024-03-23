import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
import {
  Heading,
  Text,
  HStack,
  Avatar,
  AvatarFallbackText,
  Badge,
  BadgeText,
  BadgeIcon,
  CheckCircleIcon,
  CloseCircleIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const MemberComponent = ({memberData}) => {
    return (
        <HStack space="sm" borderBottomWidth={"$1"} style={styles.banner}>
            <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                <AvatarFallbackText>{memberData.displayName}</AvatarFallbackText>
            </Avatar>
            <HStack style={styles.bannerText}>
                <Heading size="sm">{memberData.displayName}</Heading>
                {memberData.isHome ? (                
                    <Badge size="lg" variant="outline" action="success" ml="$1" >
                    <BadgeText>Home</BadgeText>
                    <BadgeIcon as={CheckCircleIcon} ml="$1" />
                    </Badge>
                    ):(
                    <Badge size="lg" variant="outline" action="error" ml="$1" >
                    <BadgeText>Not Home</BadgeText>
                    <BadgeIcon as={CloseCircleIcon} ml="$1" />
                    </Badge>
                 )}
            </HStack>
        </HStack>
    )
};
export default MemberComponent;

const styles = StyleSheet.create({ 
    banner: {
        padding: 5,
        alignItems: "center",
    },
    bannerText:{
        justifyContent: "space-between",
        width: "83%",
    }
})