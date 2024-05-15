/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef} from 'react';

import {View} from 'react-native';

import {WebView} from 'react-native-webview';
import {Routes} from '../../Routes/Routes';

const WebApp: React.FC<NativeStackScreenProps<Routes, 'Next'>> = ({
  route,
  navigation,
}) => {
  const {data} = route?.params || '';
  const webViewRef = useRef<WebView>(null);
  function onMessage(datasent: any) {
    console.log(
      'Data sent to React Native from Webview',
      datasent.nativeEvent.data,
    );
    if (datasent.nativeEvent.data === 'OpenCamera') {
      navigation.push('CameraPage');
    } else {
      console.log('coming back', data);
    }
  }

  // function sendDataToWebView(dataVal: string) {
  //   webViewRef?.current?.postMessage(dataVal);
  // }

  const sendDataToWebVieww = useCallback(() => {
    if (!data || data?.length <= 1) {
      return null;
    } else {
      const formatedData: {
        productId: number;
        image: string;
        caption: string;
        tag: string;
        launchDate: string;
        category: string;
        collection: string;
      } = JSON.parse(data);

      console.log(formatedData, typeof formatedData, formatedData.productId);
      webViewRef?.current?.postMessage(JSON.stringify(formatedData?.productId));
    }
  }, [data]);

  useEffect(() => {
    sendDataToWebVieww();
    // data && data?.length > 1 && sendDataToWebView(data);
  }, [data, sendDataToWebVieww]);

  return (
    <View
      style={{
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <WebView
        ref={webViewRef}
        source={{uri: 'http://10.0.2.2:3000'}}
        // source={{uri: 'https://ct-poc-web.vercel.app/'}}
        onMessage={onMessage}
        javaScriptEnabled={true}
      />
      {/* <Button
        title="Send Message to WebView"
        onPress={() => {
          sendDataToWebView('Hi');
        }}
      /> */}
    </View>
  );
};

export default WebApp;
