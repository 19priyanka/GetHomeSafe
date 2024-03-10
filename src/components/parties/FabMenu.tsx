import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import {  useNavigation } from "@react-navigation/native";
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

} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const FabMenu = () => {
    const navigation = useNavigation();
    const [menuVisible, setVisible] = useState(false);
    const [joinModal, setJoinModal] = useState(false);
    const [newModal, setNewModal] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [partyName, setPartyName] = useState("");
    const [expiry, setExpiry] = useState("");
    const handleMenuItemPress = (item) => {
        if(item == "NEW"){
            setNewModal(true);
        }
        else if(item == "JOIN"){
            setJoinModal(true);
        }
        setVisible(false);
      };
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
                      onChangeText={(value) => setJoinCode(value)}
                      value={joinCode}
                    />
                  </Input>
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
                    onPress={() => {
                        {joinCode!=""? (
                            setJoinModal(false),
                            console.log(joinCode),
                            navigation.navigate('singleParty')
                            ):(console.log("missing code"))
                        }
                    }}
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
                      onChangeText={(value) => setPartyName(value)}
                      value={partyName}
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
                <Select>
                <SelectTrigger>
                    <SelectInput placeholder="Party Expiry" onSelectionChange={(value) => setExpiry(value)}/>
                    <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                    <SelectItem label="1 Hour" value='1' />
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
                        setPartyName("")
                    }}
                >
                    <ButtonText>Cancel</ButtonText>
                </Button>
                <Button
                    size="sm"
                    action="positive"
                    borderWidth="$0"
                    onPress={() => {
                        {partyName!="" ? (
                            setNewModal(false),
                            console.log(partyName),
                            console.log(expiry),
                            navigation.navigate('singleParty')
                            ):(console.log("missing info"))
                        }
                    }}
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

