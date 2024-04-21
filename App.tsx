/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';

import {Button, View} from 'react-native';

import {WebView} from 'react-native-webview';

//Refer only App.tsx for the communication between React native and Next js

function App(): React.JSX.Element {
  const webViewRef = useRef(null);
  function onMessage(data: any) {
    console.log('Data sent to React Native from Webview', data);
  }

  function sendDataToWebView() {
    webViewRef?.current?.postMessage('Hi');
  }

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webViewRef}
        source={{uri: 'http://10.0.2.2:3000'}}
        onMessage={onMessage}
        javaScriptEnabled={true}
      />
      <Button
        title="Send Message to WebView"
        onPress={() => {
          sendDataToWebView();
        }}
      />
    </View>
  );
}

export default App;
