import { Modal, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button as Buttons } from '@rneui/base';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewTray } from '@/api/label';
import { TrayLabel } from '.';

const barcode = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [scanValue, setScanValue] = useState<BarcodeScanningResult | undefined>();

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
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={(result) => {
          if (scanned) {
            setScanValue(result);
            setModalVisible(true);
          }
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onAccessibilityEscape={toggleCameraFacing}>
            <Buttons title="Scan" size="md" onPress={() => setScanned(true)} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setScanned(false);
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to create new label ?</Text>
              <Button
                title="NO"
                onPress={() => (setModalVisible(false), setScanned(false))}
              />
              <Button
                title={"YES"}
                onPress={() => {
                  if (scanValue) {
                    handleBarCodeScanned(scanValue);
                  }
                  setScanned(false)
                  setModalVisible(false)
                }}
              />
            </View>
          </View>
        </Modal>


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

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 4,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default barcode

