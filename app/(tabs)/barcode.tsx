import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/base';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Labeled } from '.';
import { addNewTray, fetchOneById } from '@/api/label';

const barcode = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState<boolean>(true);
  const [permission, requestPermission] = useCameraPermissions();

  const id = "87ddudk0nm";
  const client = useQueryClient();

  const { data, isLoading, error } = useQuery<Labeled>({
    queryKey: ['labelbarcode', id],
    queryFn: () => fetchOneById(id),
  });

  const bla = {
    id: Math.random().toString(),
    trayId: Math.random().toString(),
    size: "small",
    user: "Tina Turner",
    createdAt: new Date().toString(),
    done: false
  }
  data?.tray.push(bla)
  // console.log(JSON.stringify(data))

  const { mutate } = useMutation({
    mutationFn: () => addNewTray(data),
    onSuccess: () => {
      client.invalidateQueries();
    },
  });

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }


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

  const handleBarCodeScanned = (value: BarcodeScanningResult) => {
    setScanned(true)
    mutate()
    alert(`Bar code with type and data ${JSON.stringify(data)} has been scanned!`);
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
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
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

