import React, { useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GluestackUIProvider,
  SafeAreaView,
  VStack,
  Box,
  Image,
  Heading,
  FormControlLabel,
  FormControl,
  Input,
  FormControlLabelText,
  InputField,
  Button,
  ButtonText,
  HStack,
  AvatarBadge,
  Badge,
  BadgeText,
  BadgeIcon,
  CloseCircleIcon,
  Text,
  Avatar,
  CheckCircleIcon,
  AvatarFallbackText,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";

export default function ProfilePage() {
  const navigation = useNavigation();

  const auth = getAuth(app);

  const [userFullName, setUserFullName] = useState("John Doe");
  const [userAddress, setUserAddress] = useState(
    "1234 Main St, City, State, 12345"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const saveInfo = () => {
    // Save user info
    setIsEditing(false);
    //@ts-ignore
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        //@ts-ignore
        navigation.navigate("Login");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView flex={1}>
        <ScrollView>
          <VStack space="md" reversed={false}>
            <Box>
              <View style={styles.safetyIcon}>
                <Heading size="2xl">My Account</Heading>
                <Image
                  alt="shield"
                  source={require("../../../assets/location.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            </Box>
            <View>
              <VStack space="md" reversed={false}>
                <HStack space="lg">
                  <Box style={{ marginLeft: 10 }}>
                    <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                      <AvatarFallbackText>{userFullName}</AvatarFallbackText>
                     {isHome? ( <AvatarBadge></AvatarBadge>) : (<AvatarBadge bgColor="$red500"></AvatarBadge>)}
                    </Avatar>
                  </Box>
                  <Box>
                    <Heading
                      style={{
                        maxWidth: "80%",
                        marginVertical: 10,
                        textAlign: "center",
                      }}
                      size="2xl"
                    >
                      {userFullName}
                    </Heading>
                    <Box>
                    
                        {isHome ? (
                     
                            <Badge size="lg" variant="solid" action="success" ml="$1">
                          <BadgeText>Home</BadgeText>
                          <BadgeIcon as={CheckCircleIcon} ml="$1" />
                          </Badge>
                   
                        )
                          :(
                         
                              <Badge size="lg" variant="solid" action="error" ml="$1">
                          <BadgeText>Not Home</BadgeText>
                          <BadgeIcon as={CloseCircleIcon} ml="$1" />
                          </Badge>
                      
                        )}
                        
                 
                    </Box>
                  </Box>
                </HStack>
                <View>
                  <FormControl size="md" style={styles.formControl}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Display Name</FormControlLabelText>
                    </FormControlLabel>
                    {isEditing ? (
                      <Input>
                        <InputField
                          onChangeText={(value) => setUserFullName(value)}
                          value={userFullName}
                        />
                      </Input>
                    ) : (
                      <Text>{userFullName}</Text>
                    )}
                  </FormControl>
                  <FormControl size="md" style={styles.formControl}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Email</FormControlLabelText>
                    </FormControlLabel>
                    {isEditing ? (
                      <Input>
                        <InputField
                          readOnly={true}
                          value={auth.currentUser.email}
                        />
                      </Input>
                    ) : (
                      <Text>{auth.currentUser.email}</Text>
                    )}
                  </FormControl>
                  <FormControl
                    size="md"
                    isReadOnly={true}
                    style={styles.formControl}
                  >
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Password</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                      <InputField
                        type="password"
                        defaultValue="password"
                        placeholder="password"
                      />
                    </Input>
                  </FormControl>
                  <FormControl size="md" style={styles.formControl}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText>Home Address</FormControlLabelText>
                    </FormControlLabel>
                    {isEditing ? (
                      <Input>
                        <InputField
                          onChangeText={(value) => setUserAddress(value)}
                          value={userAddress}
                        />
                      </Input>
                    ) : (
                      <Text>{userAddress}</Text>
                    )}
                  </FormControl>
                </View>
                <View style={styles.buttonContainer}>
                  {isEditing ? (
                    <Button
                      size="lg"
                      variant="solid"
                      action="primary"
                      style={styles.button}
                      onPress={saveInfo}
                    >
                      <ButtonText>Save Info</ButtonText>
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="solid"
                      action="primary"
                      style={styles.button}
                      onPress={() => setIsEditing(true)}
                    >
                      <ButtonText>Edit Info</ButtonText>
                    </Button>
                  )}
                     </View>
                     <View style={styles.signout_button}>
                     <Button
                    size="md"
                    variant="link"
                    action="primary"
                    style={{width:'30%'}}
                    onPress={signOut}> 
                    <ButtonText>Sign Out</ButtonText></Button>
             
                     </View>
                  
              </VStack>
            </View>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  avatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  safetyIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: 10,
    marginTop: 20,
  },
  button: {
    width: "70%",
    backgroundColor: "#005253",
  },
  signout_button:{
    marginTop:15,
   display: "flex",
   flexDirection: "row",
  justifyContent: "flex-end",
  },
  
  buttonContainer: {

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
