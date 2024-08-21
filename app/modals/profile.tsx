import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/native';
import { Text, StyleSheet } from 'react-native';

export default function ProfileModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const springProps = useSpring({
    translateX: isVisible ? 0 : 300, // Directly define translateX as a numeric value
    config: { tension: 220, friction: 10, mass: 1 },
  });

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when the modal mounts
  }, []);

  return (
    <animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: springProps.translateX }, // Explicitly map the translateX property
          ],
        },
      ]}
    >
      <Text style={styles.title}>Profile</Text>
    </animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeLink: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
});
