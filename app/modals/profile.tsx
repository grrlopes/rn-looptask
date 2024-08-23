import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/native';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { removeUserToken } from '@/store/persistor';

export default function ProfileModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  const springProps = useSpring({
    translateX: isVisible ? 0 : 300,
    config: { tension: 220, friction: 10, mass: 1 },
  });

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when the modal mounts
  }, []);

  const handleLogout = async () => {
    try {
      await removeUserToken()
      router.replace('');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Your Profile</Text>
          <View style={styles.linksContainer}>
            <Link href={{ pathname: "" }} asChild>
              <TouchableOpacity style={styles.linkWrapper}>
                <Text style={styles.linkText}>Personal Information</Text>
              </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "" }} asChild>
              <TouchableOpacity style={styles.linkWrapper}>
                <Text style={styles.linkText}>Achieved Jobs</Text>
              </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "" }} asChild>
              <TouchableOpacity style={styles.linkWrapper}>
                <Text style={styles.linkText}>Notification alerts</Text>
              </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "" }} asChild>
              <TouchableOpacity style={styles.linkWrapper}>
                <Text style={styles.linkText}>Statistics</Text>
              </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "" }} asChild>
              <TouchableOpacity style={styles.linkWrapper}>
                <Text style={styles.linkText}>Account Settings</Text>
              </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "" }} asChild>
              <TouchableOpacity style={styles.linkWrapper} onPress={() => handleLogout()}>
                <Text style={styles.linkText}>Sign out</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </animated.View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 2,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  linksContainer: {
    alignItems: 'flex-start',
  },
  linkWrapper: {
    width: "100%",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  linkText: {
    color: '#000000',
  },
});
