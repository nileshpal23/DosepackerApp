import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { backendUrl } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../../utils/apis';
import { company_id, user_id } from '../../constants/constants';

export default function QRScanner({ exit }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData({ type, data });
    console.log(data);
    getData(backendUrl + `/getvalidndc?user_id=${user_id}&ndc=${data}&company_id=${company_id}&ndq_required=false`)
      .then(async data => {
        console.log('ndc data', data); // JSON data parsed by `response.json()` call
        console.log(data.data.ndc_list[0]);
        exit(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const switchCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.cameraPreview}
          type={cameraType}
          onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        />
        <View style={styles.cameraButtons}>
          <Button title="Switch Camera" onPress={switchCamera} />
        </View>
      </View>
      {scannedData && (
        <View style={styles.scanDetails}>
          <Text>Type: {scannedData.type}</Text>
          <Text>Data: {scannedData.data}</Text>
        </View>
      )}
      <View style={styles.scanButtonContainer}>
        <Button
          title="Scan QR Code"
          onPress={() => setScannedData(null)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  cameraPreview: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraButtons: {
    bottom: 20,
    left: 20,
  },
  scanDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  scanButtonContainer: {
    margin: 20,
  },
});
