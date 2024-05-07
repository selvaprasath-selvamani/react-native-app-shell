import React, {useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      // your code using Geolocation and asking for authorisation with

      const granted = await Geolocation.requestAuthorization('whenInUse');
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } else {
      //   check(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      //     console.log('result', result);
      //     return 'success';
      //   });

      const checkVal = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (!checkVal) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } else {
        return true;
      }
    }
  } catch (err) {
    return false;
  }
};

const Location = () => {
  const [location, setLocation] = useState<Geolocation.GeoPosition>();

  const getLocation = async () => {
    const result = requestLocationPermission();
    result.then((res: any) => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            console.log('position val', position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            // setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location?.coords?.latitude : null}</Text>
      <Text>Longitude: {location ? location?.coords?.longitude : null}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Location;
