import Colors from '@/constants/Colors';
import { Button } from '@rneui/themed';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.newestContainer}>
          <Text style={styles.newestTitle}>Current week</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.newestTitle}>Labeled</Text>
          <Text style={styles.newestTitle}>Count</Text>
        </View>

        <View style={styles.newestContentContainer}>
          <View style={styles.newestContentDate}>
            <Text>Wed</Text>
            <Text>8</Text>
            <Text>MAY</Text>
          </View>
          <View style={styles.newestContent}>
            <Text>11:00 a.m - 6.00 p.m</Text>
            <Text>code</Text>
            <Text>creator</Text>
          </View>
          <View style={styles.newestContentQty}>
            <Text>10</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  scroll: {
    marginHorizontal: 16,
  },
  newestContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  newestTitle: {
    fontSize: 17,
  },
  newestContentContainer: {
    flexDirection: "row",
    columnGap: 26,
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10
  },
  newestContentDate: {
    alignItems: "center"
  },
  newestContentQty: {
    alignItems: "center",
    paddingLeft: 40
  },
  newestContent: {
  }
});
