import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
import {
  GluestackUIProvider,
  SafeAreaView,
  Box,
  Image,
  Heading,
  Text,
  Fab,
  FabIcon,
  MenuIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const FabMenu = () => {
    return (

        <Fab
            size="lg"
            placement="top right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            bgColor="#14543D"
        >
            <FabIcon as={MenuIcon} mr="$0" />
        </Fab>
    )
};
export default FabMenu;



