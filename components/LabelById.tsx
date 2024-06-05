import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tray } from '@/app/(tabs)'
import { Text as Texty } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const LabelById = ({ labels, count }: { labels: Tray, count: number }) => {
  const dateparse = new Date(labels.createdAt)
  return (
      <View style={styles.container}>
        <View style={styles.cardCount}>
          <Texty h4>{count + 1}</Texty>
        </View>
        <View style={styles.cardSize}>
          <Text>{labels.size}</Text>
        </View>
        <View style={styles.cardTime}>
          <Text>
            {dateparse.getHours()}:{dateparse.getMinutes()}
          </Text>
        </View>
        <View style={styles.cardUser}>
          <Text numberOfLines={1}>{labels.user}</Text>
        </View>
        <View style={styles.cardTrayid}>
          <Text numberOfLines={1}>{labels.trayId}</Text>
        </View>
      </View>
  );
};

export default LabelById;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    margin: 16,
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 16,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  cardContainer: {
    flex: 1,
  },
  cardTime: {
    alignItems: "center"
  },
  cardSize: {
    alignItems: "center"
  },
  cardUser: {
    paddingTop: 10
  },
  cardCount: {
    alignItems: "flex-start",
  },
  cardTrayid: {
    paddingTop: 10
  }
})
