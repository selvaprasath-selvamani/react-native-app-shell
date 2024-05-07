/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useCallback, useEffect, useState} from 'react';
import {Linking, SafeAreaView} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppCamera from '@src/screens/RNCamera/Camera';
import WebApp from '@src/screens/WebView/WebApp';
import Location from '@src/screens/Location/Location';
import {Routes} from '@src/Routes/Routes';

const Stack = createNativeStackNavigator<Routes>();

function App(): React.JSX.Element {
  const cameraPermission = Camera.getCameraPermissionStatus();

  const requestCameraPermission = useCallback(async () => {
    console.log('Requesting camera permission...');
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera permission status: ${permission}`);

    if (permission === 'denied') {
      await Linking.openSettings();
    }
  }, []);
  const AppContext = createContext<{
    action: string;
    setAction: React.Dispatch<React.SetStateAction<string>>;
  }>({
    action: '',
    setAction: () => {},
  });
  const [action, setAction] = useState<string>('');
  useEffect(() => {
    if (cameraPermission !== 'not-determined') {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <AppContext.Provider value={{action, setAction}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
              animationTypeForReplace: 'push',
            }}
            initialRouteName={'Location'}>
            <Stack.Screen name="CameraPage" component={AppCamera} />
            <Stack.Screen name="Next" component={WebApp} />
            <Stack.Screen name="Location" component={Location} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </SafeAreaView>
  );
}

export default App;
