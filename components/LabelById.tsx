import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tray } from '@/app/(tabs)'
import { Card, Text as Texty } from '@rneui/themed';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';

const LabelById = ({ labels, count }: { labels: Tray, count: number }) => {
  const dateparse = new Date(labels.createdAt)
  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardContainer}>
          <View style={styles.cardCount}>
            <Texty h4>{count + 1}</Texty>
          </View>
          <View style={styles.cardSize}>
            <Text>{labels.size}</Text>
          </View>
          <CardDivider />
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
      </Card>
    </View>
  );
};

export default LabelById;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
