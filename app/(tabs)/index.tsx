import { fetchAll } from '@/api/label';
import CurrentWeek from '@/components/CurrentWeek';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [value, setValue] = useState<string>("")
  const { data, isLoading, error } = useQuery<[Labeled]>({
    queryKey: ['labels'],
    queryFn: fetchAll,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

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
            <CurrentWeek dateParse={dateparse} items={item} key={item.id}/>
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
    paddingLeft: 100
  },
});
