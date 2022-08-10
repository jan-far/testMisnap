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
  StyleSheet,
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
      <View style={styles.container}>
        <Text style={styles.header}>Capture Types</Text>
        {['idFront', 'idBack', 'face'].map((type, i) => (
          <View key={i} style={styles.buttonWrapper}>
            <Button onPress={() => setCaptureType(type)} title={type} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', flex: 1},
  header: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
  buttonWrapper: {marginVertical: 15, width: 100},
});
