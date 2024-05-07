import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, SafeAreaViewComponent, StyleSheet, Text, View, ViewBase } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';

export default function ModalScreen() {
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Modal++</Text>
        <View style={styles.separator} />
        <EditScreenInfo path="app/modal.tsxxx" />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: "#ffffff",
    overflow: "scroll",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '80%',
  },
});
