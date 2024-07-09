import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/base';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewTray } from '@/api/label';
import { TrayLabel } from '.';

const barcode = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState<boolean>(true);
  const [permission, requestPermission] = useCameraPermissions();

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (scanValue: TrayLabel) => addNewTray(scanValue),
    onSuccess: () => {
      client.invalidateQueries();
    },
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = (valueScanned: BarcodeScanningResult) => {
    setScanned(true)
    const labeled: TrayLabel = {
      "id": valueScanned.data,
      "trayid": Math.floor(Math.random() * 90000909090900).toString(),
      "size": "small",
      "done": true,
    }
    mutate(labeled)
    alert(`Bar code with type and data ${JSON.stringify(valueScanned.data)} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={(result) => scanned ? undefined : handleBarCodeScanned(result)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onAccessibilityEscape={toggleCameraFacing}>
            <Button title={"Scan"} size='md' onPress={() => scanned ? setScanned(false) : setScanned(true)} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default barcode

