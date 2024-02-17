import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ProfilePage() {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Profile Page</Text>
    </View>
  );
}