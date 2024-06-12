import { fetchAll } from '@/api/label';
import CurrentWeek from '@/components/CurrentWeek';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export interface Labeled {
  id: string
  tray: Tray[]
  createdAt: string
  creator: string
}

export interface Tray {
  id: string
  trayId: string
  size: string
  user: string
  createdAt: string
  done: boolean
}

export default function TabOneScreen() {
  const { data, isLoading, error } = useQuery<[Labeled]>({
    queryKey: ['labels'],
    queryFn: fetchAll,
  });

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.newestContainer}>
          <Text style={styles.newestTitle}>Current week</Text>
          <Text style={styles.newestToday}>Today</Text>
        </View>
        <View style={styles.today}>
          <Text style={styles.todayTitle}>Small</Text>
          <View style={styles.todayNr}>
            <Text>160</Text>
          </View>
          <View style={styles.todayNr}>
            <Text>70</Text>
          </View>
          <Text style={styles.todayTitle}>Large</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.newestLabel}>Labeled</Text>
          <Text style={styles.newestLabel}>Total</Text>
        </View>
        {data?.map(item => {
          const dateparse = new Date(item.createdAt)
          return (
            <CurrentWeek dateParse={dateparse} items={item} key={item.id} />
          )
        })}

        <View style={styles.PreviewsWeekContainer}>
          <Text style={styles.newestTitle}>Previews Week</Text>
        </View>
        {data?.map(item => {
          const dateparse = new Date(item.createdAt)
          return (
            <CurrentWeek dateParse={dateparse} items={item} key={item.id} />
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
    marginHorizontal: 5,
  },
  newestContainer: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 5,
    alignItems: "center"
  },
  newestTitle: {
    fontSize: 19,
  },
  newestLabel: {
    fontSize: 15,
  },
  newestToday: {
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "italic"
  },
  labelContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10
  },
  today: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 70,
    paddingBottom: 5,
  },
  todayNr: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 30,
    width: 30,

  },
  todayTitle: {
    fontSize: 11,
  },
  PreviewsWeekContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 25,
    paddingBottom: 5,
    alignItems: "center"
  },

});
