/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MiSnapManager from 'react-native-misnap';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [captureType, setCaptureType] = useState('');

  useEffect(() => {
    const config = {
      captureType: captureType,
      autocapture: true,
      livenessLicenseKey: 'MISNAP_LIVENESS_LICENSE_KEY',
      glare: 0.5,
      imageQuality: 1.0,
      contrast: 0.5,
    };

    MiSnapManager.capture(config)
      .then(result => {
        const capturedImage = result.base64encodedImage;
        console.log('result', capturedImage);
        const {metadata = {}} = result;
        console.log(metadata);
        // Do something with base64 encoded image string and optional metaData
      })
      .catch(error => {
        console.log('error', error);
        // Do something with error
      });
  }, [captureType]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Capture Types</Text>
        {['idFront', 'idBack', 'face'].map((type, i) => (
          <View key={i} style={{marginVertical: 15, width: 100}}>
            <Button onPress={() => setCaptureType(type)} title={type} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default App;
