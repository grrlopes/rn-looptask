import { fetchAll } from '@/api/label';
import Colors from '@/constants/Colors';
import { Button } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export interface Labeled {
  id: string
  tray: Tray[]
  createdAt: string
  creator: string
}

export interface Tray {
  id: string
  trayId: string
  user: string
  createdAt: string
}

export default function TabOneScreen() {
  const { data, isLoading, error } = useQuery<[Labeled]>({
    queryKey: ['label'],
    queryFn: fetchAll,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }


  console.log(data)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.newestContainer}>
          <Text style={styles.newestTitle}>Current week</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.newestTitle}>Labeled</Text>
          <Text style={styles.newestTitle}>Total</Text>
        </View>

        {data?.map(item => {
          const dateparse = new Date(item.createdAt)
          return (
            <View style={styles.newestMainContentContainer} key={item.id}>
              <View style={styles.newestContentContainer}>
                <View style={styles.newestContentDate}>
                  <Text>{dateparse.toLocaleDateString('en-us', { weekday:"short"})}</Text>
                  <Text>{dateparse.getUTCDate()}</Text>
                  <Text>{dateparse.toLocaleString('en-us', {month: "short"})}</Text>
                </View>
                <View>
                  <Text>{item.createdAt}</Text>
                  <Text>{item.id}</Text>
                  <Text>{item.creator}</Text>
                </View>
                <View style={styles.newestContentQty}>
                  <Text>{item.tray.length}</Text>
                </View>
              </View>
            </View>
          )
        })}

      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    // paddingTop: Platform.OS === 'android' ? 25 : 0
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
    paddingBottom: 20,
  },
  newestMainContentContainer: {
    flex: 1,
    flexDirection: "column",
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
});
