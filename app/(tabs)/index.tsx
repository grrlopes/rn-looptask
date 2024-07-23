import { fetchAll } from '@/api/label';
import CurrentWeek from '@/components/CurrentWeek';
import { splitMessagesByWeek } from '@/helper/MessageByWeek';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';


export interface LabeledStack {
  error: string
  message: message[]
  success: boolean
}

export interface message {
  id: string
  trays: Tray[]
  created_at: string
  updated_at: string
  owner: User
  estimate: {
    small: number,
    large: number
  }
  tray_count: number
  small_count: number
  large_count: number
}

export interface Labeled {
  error: string
  message: message
  success: boolean
}

export interface Tray {
  id: string
  trayid: string
  size: string
  userid: User
  done: boolean
  created_at: string
  updated_at: string
}

export interface TrayLabel {
  id: string
  trayid: string
  size: string
  done: boolean
}

export interface User {
  id: string
  name: string
  surname: string
  email: string
}

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery<LabeledStack>({
    queryKey: ['labels'],
    queryFn: fetchAll,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size={"large"} color={"#000000"} style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }} />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const { previousWeek, currentWeek, currentDay } = splitMessagesByWeek(data?.message)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={styles.newestContainer}>
          <Text style={styles.newestTitle}>Current week</Text>
          <Text style={styles.newestToday}>Today</Text>
        </View>
        <View style={styles.today}>
          <Text style={styles.todayTitle}>Small</Text>
          <View style={styles.todayNrPlus}>
            {
              ((currentDay.estimate.small - currentDay.small_count) < 0)
                ? <Text style={{ color: "red" }}>{currentDay.estimate.small - currentDay.small_count}</Text>
                : <Text style={{ color: "green" }}>+{currentDay.estimate.small - currentDay.small_count}</Text>
            }
          </View>
          <View style={styles.todayNr}>
            <Text>{currentDay.estimate.small}</Text>
          </View>
          <View style={styles.todayNr}>
            <Text>{currentDay.estimate.large}</Text>
          </View>
          <View style={styles.todayNrMinus}>
            {
              ((currentDay.estimate.large - currentDay.large_count) < 0)
                ? <Text style={{ color: "red" }}>{currentDay.estimate.large - currentDay.large_count}</Text>
                : <Text style={{ color: "green" }}>+{currentDay.estimate.large - currentDay.large_count}</Text>
            }
          </View>
          <Text style={styles.todayTitle}>Large</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.newestLabel}>Labeled</Text>
          <Text style={styles.newestLabel}>Total</Text>
        </View>
        {
          currentWeek.map(item => {
            const dateparse = new Date(item.created_at)
            return (
              <CurrentWeek dateParse={dateparse} key={item.id} id={item.id} owner={item.owner} trayCount={item.tray_count} />
            )
          })
        }
        <View style={styles.PreviewsWeekContainer}>
          <Text style={styles.newestTitle}>Previews Week</Text>
        </View>
        {
          previousWeek.map(item => {
            const dateparse = new Date(item.created_at)
            return (
              <CurrentWeek dateParse={dateparse} key={item.id} id={item.id} owner={item.owner} trayCount={item.tray_count} />
            )
          })
        }

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
  todayNrPlus: {
    position: "absolute",
    marginLeft: 47,
  },
  todayNrMinus: {
    position: "absolute",
    marginLeft: 193,
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
