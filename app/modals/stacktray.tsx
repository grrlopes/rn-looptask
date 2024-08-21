import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Input } from '@rneui/themed';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewStackTray } from '@/api/label';
import { estimate } from '@/interfaces/message';
import { useSpring, animated } from '@react-spring/native';

const StackTray = () => {
  const [small, setSmall] = useState<string>("");
  const [large, setLarge] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const springProps = useSpring({
    translateY: isVisible ? 0 : 300, // Directly define translateY as a numeric value
    translateX: isVisible ? 0 : 300, // Directly define translateX as a numeric value
    config: { tension: 220, friction: 10, mass: 1 },
  });

  const client = useQueryClient();

  const { mutate, reset, isSuccess, error } = useMutation({
    mutationFn: (quantity: estimate) => addNewStackTray(quantity),
    onSuccess: () => {
      client.invalidateQueries();
      setSuccessMessage("The input was recorded.");
      setTimeout(() => setSuccessMessage(""), 4000);
    },
  });

  const handleStackTray = () => {
    const quantity: estimate = {
      small: parseInt(small),
      large: parseInt(large),
    }
    mutate(quantity)
  };

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when the modal mounts
    if (isSuccess) {
      reset();
      setSmall("");
      setLarge("");
    }
  }, [isSuccess, reset]);

  return (
    <View style={styles.container}>
      <animated.View
        style={[
          {
            transform: [
              { translateY: springProps.translateY }, // Explicitly map the translateX property
            ],
          },
        ]}
      >
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
      </animated.View>
      <animated.View
        style={[
          {
            transform: [
              { translateX: springProps.translateX }, // Explicitly map the translateX property
            ],
          },
        ]}
      >
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
        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
        {error ? <Text style={styles.errorMessage}>{error.message}</Text> : null}
      </animated.View>
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
  },
  successMessage: {
    color: "green",
    fontWeight: "500",
    marginTop: 20,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    fontWeight: "500",
    marginTop: 20,
    textAlign: "center",
  }
});

export default StackTray;
