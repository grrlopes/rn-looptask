import { Modal, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewTray } from '@/api/label';
import { Button as Buttons, CheckBox } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import { useGlobalSearchParams } from 'expo-router';
import useStoreLabel from '@/store/labeled';
import { TrayLabel } from '@/interfaces/tray';

const barcode = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [scanned, setScanned] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [scanValue, setScanValue] = useState<BarcodeScanningResult | undefined>();
  const [selectedIndex, setIndex] = useState<number>(0);
  const { id } = useGlobalSearchParams<{ id: string }>();
  const getItemById = useStoreLabel((state) => state.getItemById(id ?? ''))
  const updateItem = useStoreLabel((state) => state.updateItem)

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (scanValue: TrayLabel) => addNewTray(scanValue),
    onSuccess: () => {
      client.invalidateQueries();
      if (getItemById) {
        if (selectedIndex === 0) {
          updateItem(getItemById.id, getItemById.small + 1, getItemById.large)
        } else {
          updateItem(getItemById.id, getItemById.small, getItemById.large + 1)
        }
      }
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
    const size = selectedIndex === 0 ? 'small' : 'large';
    const labeled: TrayLabel = {
      // "id": valueScanned.data,
      id: id,
      "trayid": Math.floor(Math.random() * 90000909090900).toString(),
      "size": size,
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
          <View>
            <CheckBox
              title={"Small"}
              checked={selectedIndex === 0}
              onPress={() => setIndex(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </View>
          <View style={{ width: 150 }}>
            <TouchableOpacity onAccessibilityEscape={toggleCameraFacing}>
              <Buttons title="Scan" size={"lg"} onPress={() => setScanned(true)} />
            </TouchableOpacity>
          </View>
          <View>
            <CheckBox
              title={"Large"}
              checked={selectedIndex === 1}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </View>
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
              <View style={styles.modalWarn}>
                <FontAwesome name='warning' size={20} />
                <Text style={styles.modalText}>Are you sure you want to create new label ?</Text>
              </View>
              <View style={styles.modalButton}>
                <View style={styles.buttons}>
                  <Button
                    title='NO'
                    onPress={() => (setModalVisible(false), setScanned(false))}
                  />
                </View>
                <View style={styles.buttons}>
                  <Button
                    title='YES'
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
            </View>
          </View>
        </Modal>

      </CameraView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalWarn: {
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    gap: 50,
  },
  buttons: {
    width: 90,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default barcode

