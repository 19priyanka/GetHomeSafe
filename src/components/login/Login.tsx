import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
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
  Text
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function Login() {
  const navigation = useNavigation();

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView flex={1}>
        <VStack space="md" reversed={false}>
          <Box>
            <View style={styles.safetyIcon}>
              <Image
                alt="shiedl"
                source={require("../../../assets/location.png")}
                style={{width: 50, height: 50}}
              />
            </View>
          </Box>
          <View>
            <VStack space="md" reversed={false}>
              <View style={styles.heading}>
                <Heading size="5xl">Login</Heading>
                <Heading size="xl" italic>
                  Please sign in to continue
                </Heading>
              </View>
              <View>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField placeholder="Email" />
                  </Input>
                </FormControl>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      
                      placeholder="password"
                    />
                  </Input>
                </FormControl>
              </View>
              <View style={styles.buttonContainer}>
              <Button size="lg" variant="solid" action="primary" style={styles.button}>
                <ButtonText>Log in</ButtonText>
              </Button>
              </View>
            </VStack>
            <View style={styles.bottomText}>
            <TouchableOpacity onPress={()=> {navigation.navigate('SignUp')}}>
              <Text>
                Don't have an account?{" "}
               
                <Text
                  style={{ color: "#206F3E" }}
                >
                  Sign up
                </Text>
                
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </VStack>
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
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: 10,
    marginTop: 30,
  },
  button:{
    width:"70%",
    backgroundColor:"#005253"
  },
  buttonContainer:{
    margin:20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin:10
  }
});
