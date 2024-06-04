import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Labeled, Tray } from '@/app/(tabs)'

const LabelById = ({ labels }: {labels: Tray}) => {
  return (
    <View>
      <Text>{labels.id}</Text>
    </View>
  );
};

export default LabelById;

const styles = StyleSheet.create({})
