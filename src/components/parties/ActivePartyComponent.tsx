import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

type RootStackParamList = {
    singleParty: { partyInfo: object }
  }


const ActivePartyComponent = ({partyInfo}) => {
    const navigation = useNavigation();
    const [minutesLeft, setMinutesLeft] = useState<Number>(0);
    const [hoursLeft, setHoursLeft] = useState<Number>(0);
    const [home, setHome] = useState<Number>(0);
    const [notHome, setNotHome] = useState<Number>(0);
    useEffect(()=>{
        const now = new Date();
        const expiry = new Date(partyInfo.endTime);
        const differenceInMilliseconds = Math.abs(expiry.getTime() - now.getTime());
    
        setHoursLeft( Math.floor(differenceInMilliseconds / (1000 * 60 * 60)));
        setMinutesLeft(Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)));
    
        let homeCount = 0;
        let notHomeCount = 0;
        partyInfo.members.map((member)=>{
            if(member.isHome){
              homeCount++;
            }
            else{
              notHomeCount++;
            }
          });
        setHome(homeCount);
        setNotHome(notHomeCount);
        // const intervalId = setInterval(() => {
        // setMinutesLeft(prevMinutesLeft => prevMinutesLeft - 1);
        // if(minutesLeft == -1){
        //     setMinutesLeft(59);
        //     setHoursLeft(prevHoursLeft => prevHoursLeft - 1);
        // }
        // }, 60000);
        // return () => clearInterval(intervalId);
    })
    return (
        <TouchableOpacity onPress={()=> { navigation.navigate('SingleParty', {partyInfo})}}>
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
                    <Text bold={true} >{partyInfo.name}</Text>
                    <Text fontSize="$xs">expires in: {hoursLeft} hr {minutesLeft} min</Text>
                </View>
                </HStack>
                <HStack justifyContent="space-evenly" margin="$2" >
                <Badge size="lg" variant="outline" borderRadius="$md" action="success">
                    <BadgeText>Is Home {home}</BadgeText>
                </Badge>
                <Badge size="lg" variant="outline" borderRadius="$md" action="error">
                    <BadgeText>Not Home {notHome}</BadgeText>
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