import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
import {
  VStack,
  Text,
  Fab,
  FabIcon,
  MenuIcon,
  Heading,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const FabMenu = () => {
    const [menuVisible, setVisible] = useState(false);
    const handleMenuItemPress = (item) => {
        // Handle menu item press here
        console.log("Pressed:", item);
        // Close menu after item is pressed
        setVisible(false);
      };
    return (
    <View>
        <Fab
            size="lg"
            placement="top right"
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            bgColor="#14543D"
            style={styles.fab}
        >
            <Pressable onPress={()=>{setVisible(!menuVisible)}}>
                <FabIcon as={MenuIcon} mr="$0" />
            </Pressable>
            
        </Fab>
        {menuVisible && (
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => handleMenuItemPress("Item 1")} style={styles.menuItem}>
                    <Text>o   Create New Party</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMenuItemPress("Item 2")} style={styles.menuItem}>
                    <Text>o   Join A Party</Text>
                </TouchableOpacity>
                {/* Add more menu items as needed */}
            </View>
        )} 
        {menuVisible && (
            <TouchableOpacity style={styles.overlay} onPress={()=>{setVisible(false)}} />
        )}
    </View>
    )
};
export default FabMenu;

const styles = StyleSheet.create({ 
    fab: {
        top: -40,
    },
    background:{
        position:"absolute",
        backgroundColor: "red",
        width: 800,
        height: 1500,
    },
    menu: {
        position: 'absolute',
        bottom: -150,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        zIndex: 100,
      },
      menuItem: {
        padding: 15,
        zIndex: 101,
      },
      overlay: {
        zIndex: 5,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
      },
})

