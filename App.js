import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Login from "./src/components/login/Login";
import Navigation from "./Navigation";
import { Platform } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

export default function App() {
  useEffect(() => {
    // Configure background geolocation
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 30000, // Set interval to 30 seconds
      fastestInterval: 30000,
      activitiesInterval: 30000,
      stopOnStillActivity: false,
    });

    // Start background geolocation
    BackgroundGeolocation.start();
    
    const onLocationUpdate = (location) => {
      console.log('[DEBUG] BackgroundGeolocation location', location);
      // Make Axios request to your server
      axiosInstance.get(url,{headers:{Authorization: auth.currentUser.accessToken}})
      axios.post('/api/locationUpdate', {
        currentLat: location.latitude,
        currentLong: location.longitude,
      }, {headers:{Authorization: auth.currentUser.accessToken}})
      .then(response => {
        console.log('Location update sent successfully: ', response);
      })
      .catch(error => {
        console.error('Error sending location update:', error);
      });
    };

    BackgroundGeolocation.onLocation(onLocationUpdate);

    return () => {
      // Stop background geolocation when component unmounts
      BackgroundGeolocation.stop();
    };
  }, []);

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

