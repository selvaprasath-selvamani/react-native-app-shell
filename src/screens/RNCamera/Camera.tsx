/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  // useEffect,
  useState,
} from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {Routes} from '../../Routes/Routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const AppCamera: React.FC<NativeStackScreenProps<Routes, 'CameraPage'>> = ({
  navigation,
}) => {
  const [codeDetected, setCodeDetected] = useState<boolean>(false);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log('Scanned  codes' + codes[0].value);
      setCodeDetected(true);
      navigation.navigate('Next', {data: codes[0].value});
    },
  });
  // useEffect(() => {
  //   navigation.navigate('Next', {data: 'Cpp'});
  // }, [navigation]);

  const cameraPermission = Camera.getCameraPermissionStatus();

  const device = useCameraDevice('back');
  if (device == null) {
    return <Text>No Camera Detected</Text>;
  }
  return (
    <View style={{flex: 1}}>
      {cameraPermission === 'granted' && !codeDetected ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      ) : (
        <Text> Permission awaited</Text>
      )}
    </View>
  );
};

export default AppCamera;
