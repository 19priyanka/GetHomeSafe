import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  VStack,
  Text,
  Fab,
  FabIcon,
  AddIcon,
  Heading,
  Button,
  ButtonText,
  Modal, 
  ModalFooter,
  ModalContent,
  ModalBackdrop,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Icon,
  CloseIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  Select,
  SelectInput,
  SelectTrigger,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  ChevronDownIcon,
  SelectItem,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  AlertCircleIcon,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import axiosInstance from "../../utils/axios";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";

type RootStackParamList = {
    singleParty: { partyInfo: object }
  }

const FabMenu = () => {
    const navigation = useNavigation();
    const [menuVisible, setVisible] = useState(false);
    const [joinModal, setJoinModal] = useState(false);
    const [newModal, setNewModal] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [partyName, setPartyName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [codeMissing, setCodeMissing] = useState(false);
    const [nameMissing, setNameMissing] = useState(false);
    const [userName, setUserName] = useState("");
    const auth = getAuth(app);
    const handleMenuItemPress = (item) => {
        // retrieveUserName();
        if(item == "NEW"){
            setPartyName("");
            setNewModal(true);
        }
        else if(item == "JOIN"){
            setJoinCode("");
            setJoinModal(true);
        }
        setVisible(false);
      };

    const joinParty= ()=>{
        if(joinCode!="") {
            const joinPartyInfo = {
                inviteCode: joinCode,
                userDisplayName: "Nicole",
            };
            console.log("join party with this info: ", joinPartyInfo);
            axiosInstance.post("/api/join-party", joinPartyInfo,{headers:{Authorization: auth.currentUser.accessToken}})
            .then((response) => {
                console.log(response);
                const partyInfo = response.data;
                setJoinModal(false);
                navigation.navigate('SingleParty', {partyInfo});
            }).catch((e) => {
            console.error(e);
                setCodeMissing(true);
            })
        }else{
            setCodeMissing(true);
        }    
    };
    const createParty= ()=>{
        if(partyName!="" && expiry != "") {
            let dt = new Date();
            dt.setHours(dt.getHours() + Number(expiry));
            
            const createPartyInfo = {
                partyName: partyName,
                endTime: dt,
                hostDisplayName: "Nicole",
            };
            console.log("create party with this info: ", createPartyInfo);
            axiosInstance.post("/api/create-party", createPartyInfo, {headers:{Authorization: auth.currentUser.accessToken}}).then((response) => {
                console.log(response.data);
                const partyInfo = response.data;
                setNewModal(false);
                navigation.navigate('SingleParty', {partyInfo});
            }).catch((e) => {
            console.error(e);
                setNameMissing(true);
            })
        }else{
            setNameMissing(true);
        }    
    };
    const retrieveUserName =()=>{
        console.log("getting user info");
        axiosInstance.get("/api/getUserInfo", {headers:{Authorization: auth.currentUser.accessToken}})
            .then((response) => {
                setUserName(response.data.displayName);
                console.log(response.data);
                return userName;
            })
            .catch((error) => {
                console.log("Error:", error);
                return "";
            });
    }
    return (
    <View>
        <Fab
            size="lg"
            placement="top right"
            isHovered={false}
            isDisabled={false}
            onPress={()=>{setVisible(!menuVisible)}}
            bgColor="#14543D"
            style={styles.fab}
        >
            <FabIcon as={AddIcon} mr="$0" />            
        </Fab>            
        {menuVisible && (
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => handleMenuItemPress("NEW")} style={styles.menuItem}>
                    <Text>o   Create New Party</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMenuItemPress("JOIN")} style={styles.menuItem}>
                    <Text>o   Join A Party</Text>
                </TouchableOpacity>
            </View>
        )} 
        <Modal
            isOpen={joinModal}
            onClose={() => {
            setJoinModal(false)
            }}
            // finalFocusRef={ref}
        >
            <ModalBackdrop />
            <ModalContent>
            <ModalHeader>
                <Heading size="lg">Join A Party</Heading>
                <ModalCloseButton>
                <Icon as={CloseIcon} />
                </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Party Join Code</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Join code"
                      onChangeText={(value) => {setJoinCode(value), setCodeMissing(false)}}
                      value={joinCode}
                    //   isInvalid = {codeMissing}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Must include a valid, numeric join code.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                        setJoinModal(false),
                        setJoinCode("")
                    }}
                >
                    <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                    size="sm"
                    action="positive"
                    borderWidth="$0"
                    onPress={ ()=> {joinParty()} }
                >
                    <ButtonText>Join</ButtonText>
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
            isOpen={newModal}
            onClose={() => {
            setNewModal(false)
            }}
            // finalFocusRef={ref}
        >
            <ModalBackdrop />
            <ModalContent>
            <ModalHeader>
                <Heading size="lg">Create A New Party</Heading>
                <ModalCloseButton>
                <Icon as={CloseIcon} />
                </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
                <FormControl
                  size="md"
                  isRequired={true}
                  style={styles.formControl}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText>Party Name</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Party Name"
                      onChangeText={(value) => {setPartyName(value), setNameMissing(false)}}
                      value={partyName}
                    //   isInvalid={nameMissing}
                    />
                  </Input>
                </FormControl>
                <FormControl
                    size="md"
                    isRequired={true}
                    style={styles.formControl}>
                <FormControlLabel mb="$1">
                    <FormControlLabelText>Party Expiry</FormControlLabelText>
                </FormControlLabel>
                <Select selectedValue={expiry}
                        onValueChange={(itemValue) => setExpiry(itemValue)}>
                    <SelectTrigger>
                        <SelectInput placeholder="Party Expiry"  />
                        <SelectIcon mr="$3">
                        <Icon as={ChevronDownIcon} />
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectItem label="1 Hour" value="1" />
                            <SelectItem label="3 Hours" value="3" />
                            <SelectItem label="8 Hours" value="8" />
                            <SelectItem label="12 Hours" value="12" />
                            <SelectItem label="24 Hours" value="24" />
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="outline"
                    size="sm"
                    action="secondary"
                    mr="$3"
                    onPress={() => {
                        setNewModal(false),
                        setPartyName(""),
                        setExpiry("")
                    }}
                >
                    <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                    size="sm"
                    action="positive"
                    borderWidth="$0"
                    onPress={() => { createParty() }}
                >
                    <ButtonText>Create</ButtonText>
                </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
        
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
      },
      menuItem: {
        padding: 15,
      },
      formControl: {
        margin: 10,
        marginTop: 30,
      },
})

