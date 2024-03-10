import React, { useState, useContext, useEffect } from "react";
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
import { app, auth } from "../../firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigation = useNavigation();
  const auth = getAuth(app);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onPressLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      
        // setUserToken(user.getIdToken()); // Save the token in state
        const unsubscribe = navigation.addListener('focus', () => {
          //@ts-ignore
          navigation.navigate('MyParties');
          unsubscribe();
        });
        //@ts-ignore
        navigation.navigate('TabNavigator');
      }).catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          setPasswordError('Incorrect Password');
        } else if (error.code === 'auth/invalid-email') {
          setEmailError('Incorrect Email');
        } else {
          setEmailError('');
          setPasswordError(error.message);
        }
        console.log(error);
      });
    }

      useEffect(() => {
        setEmailError('');
        setPasswordError('');
      }, [email, password]);
  

  //console.log("User Token:", userToken);

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
                <Text>{error}</Text>
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
                    <InputField onChangeText={(v) => setEmail(v)} placeholder="Email" value={email} keyboardType="email-address" />
                  </Input>
                  <Text style={{ color: 'red' }}>{emailError}</Text>
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
                      onChangeText={(v) => setPassword(v)}
                      placeholder="password"
                      value={password}
                    />
                  </Input>
                  <Text style={{ color: 'red' }}>{passwordError}</Text>
                </FormControl>
              </View>
              <View style={styles.buttonContainer}>
              <Button size="lg" variant="solid" action="primary" style={styles.button} onPress={onPressLogin}>
                <ButtonText>Log in</ButtonText>
              </Button>
              </View>
            </VStack>
            <View style={styles.bottomText}>
            { /*@ts-ignore */ }
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
            {/* for testing!!! remove before merging start */}
            <View style={styles.buttonContainer}>
              <Button size="lg" variant="solid" action="primary" style={styles.button} onPress={onPressBypass}>
                <ButtonText>bypass</ButtonText>
              </Button>
            </View>
            {/* for testing!!! remove before merging end */}
          </View>
        </VStack>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

// export const UserTokenContext = createContext<string | null>();

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
