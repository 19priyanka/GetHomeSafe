import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <Button title="Login" onPress={() => navigation.navigate('ProfilePage' as never)} />
    </View>
  );
}