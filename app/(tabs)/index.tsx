import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.newestContainer}>
          <Text style={styles.newestTitle}>Newest dough</Text>
          <Text style={styles.newestTitle}>view history</Text>
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
            <Text>Qty 10</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  newestContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  newestTitle: {
    fontSize: 15,
  },
  newestContentContainer: {
    flexDirection: "row",
    columnGap: 26,
  },
  newestContentDate: {
    alignItems: "center"
  },
  newestContentQty: {
    alignItems: "center"
  },
  newestContent: {
  }
});
