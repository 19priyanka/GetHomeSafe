import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Login from "./src/components/login/Login";
import Navigation from "./Navigation";


export default function App() {
  //so we can see the splash screen for a bit
  SplashScreen.preventAutoHideAsync();
   setTimeout(SplashScreen.hideAsync, 1000);
  return (
    <>
    <Navigation>
    <Login/>
    </Navigation>
    </>
    
  );
}

