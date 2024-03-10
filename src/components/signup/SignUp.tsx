import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  GluestackUIProvider,
  SafeAreaView,
  KeyboardAvoidingView,
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
  Text,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axiosInstance from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";

export default function SignUp() {
  const navigation = useNavigation();
  const auth = getAuth(app);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const signUp = () => {
    const userSignup = {
      displayName,
      address: {
        coordinates: {
          lat: 0,
          long: 0,
        },
        street: address,
        city: "Toronto",
        province: "Ontario",
        postalCode: "M5V 2L9",
      },
      email,
      password,
    };

    axiosInstance.post("http://localhost:8080/api/signup", userSignup).then((response) => {
      const token: string = response.headers["x-auth-token"] || "";
      AsyncStorage.setItem("x-auth-token", token);
      signInWithEmailAndPassword(auth, email, password).then((c) => {
        const unsubscribe = navigation.addListener('focus', () => {
          //@ts-ignore
             navigation.navigate('MyParties');
             unsubscribe();
           });
           //@ts-ignore
           navigation.navigate('TabNavigator');
      }).catch((e) => {
        console.error(e);
      })
    }).catch((e) => {
      console.error(e);
    })
  };

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView flex={1}>
        <KeyboardAvoidingView>
        <VStack space="md" reversed={false}>
          <Box>
            <View style={styles.safetyIcon}>
              <Image
                alt="shiedl"
                source={require("../../../assets/location.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </Box>
          <View>
            <VStack space="md" reversed={false}>
              <View style={styles.heading}>
                <Heading size="4xl">Create Account</Heading>
              </View>
              <View>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Display Name</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Your Name"
                      onChangeText={(value) => setDisplayName(value)}
                      value={displayName}
                    />
                  </Input>
                </FormControl>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Email"
                      onChangeText={(e) => setEmail(e)}
                      value={email}
                    />
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
                      onChangeText={(e) => setPassword(e)}
                      value={password}
                    />
                  </Input>
                </FormControl>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Home Address</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Address"
                      onChangeText={(e) => setAddress(e)}
                      value={address}
                    />
                  </Input>
                </FormControl>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  size="lg"
                  variant="solid"
                  action="primary"
                  style={styles.button}
                  onPress={signUp}
                >
                  <ButtonText>Sign Up</ButtonText>
                </Button>
              </View>
            </VStack>
            <View style={styles.bottomText}>
              <TouchableOpacity
                onPress={() => {
                  //@ts-ignore
                  navigation.navigate("Login");
                }}
              >
                <Text>
                  Already have an account?{" "}
                  <Text style={{ color: "#206F3E" }}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </VStack>
       </KeyboardAvoidingView>
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
  button: {
    width: "70%",
    backgroundColor: "#005253",
  },
  buttonContainer: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
