import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Input } from '@rneui/themed';

const StackTray = () => {
  const [small, setSmall] = useState<string>("");
  const [large, setLarge] = useState<string>("");

  const handleStackTray = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.register}>Register</Text>
      <Text style={styles.detail}>Enter your daily stack tray row</Text>
      <Input
        placeholder="Small"
        leftIcon={{ type: 'font-awesome', name: 'angle-right' }}
        autoCapitalize="none"
        keyboardType="numeric"
        value={small}
        onChangeText={setSmall}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Large"
        leftIcon={{ type: 'font-awesome', name: "angle-right" }}
        autoCapitalize="none"
        keyboardType='numeric'
        value={large}
        onChangeText={setLarge}
        containerStyle={styles.inputContainer}
      />
      <Button color={"grey"} title="Create" onPress={handleStackTray} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  register: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  detail: {
    fontSize: 13,
    fontStyle: "italic",
    color: "grey",
    marginBottom: 20,
  }
});

export default StackTray;

