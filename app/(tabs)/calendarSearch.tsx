import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableHighlight, Text, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { fetchAll } from '@/api/label';
import CurrentWeek from '@/components/CurrentWeek';
import { ActivityIndicator } from 'react-native';
import { LabeledStack } from '.';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyDatePicker = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery<LabeledStack>({
    queryKey: ['search'],
    queryFn: () => fetchAll(),
  });

  if (isLoading) {
    return <ActivityIndicator size={"large"} color={"#000000"} style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }} />;
  }

  if (error) {
    return (<Text>fsdfdsfsdfsd</Text>)
  }


  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const modal = () => {
    return (
      <DateTimePicker
        value={date}
        mode="date"
        display="calendar"
        onChange={onChange}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnCalendar}>
        <TouchableOpacity onPress={() => setShow(true)} style={styles.touch}>
          <View style={styles.search}>
            <FontAwesome name="search" style={styles.searchIcon} />
            <Text style={styles.searchTxt}>{date.toDateString()}</Text>
          </View>
        </TouchableOpacity>
      </View>
        <ScrollView>
          {
            data?.message.map(item => {
              const dateParse = new Date(item.created_at)
              return (
                <Link href={{ pathname: "/modals/labeled", params: { id: item.id, } }} key={item.id} asChild>
                  <TouchableOpacity>
                    <View style={styles.newestMainContentContainer}>
                      <View style={styles.newestContentContainer}>
                        <View style={styles.newestContentDate}>
                          <Text style={{ color: "darkblue" }}>{dateParse.toLocaleDateString('en-us', { weekday: "short" })}</Text>
                          <Text style={{ fontWeight: "600" }}>{dateParse.getUTCDate()}</Text>
                          <Text style={{ fontWeight: "400" }}>{dateParse.toLocaleString('en-us', { month: "short" })}</Text>
                        </View>
                        <View>
                          <Text style={{ fontWeight: "500", color: "#000000" }}>{dateParse.getFullYear()}</Text>
                          <Text style={{ fontWeight: "400" }}>{item.id}</Text>
                          <Text>{item.owner.name} {item.owner.surname}  </Text>
                        </View>
                        <View style={styles.newestContentQty}>
                          <View style={styles.qtyTxt}>
                            <Text>{item.tray_count}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              )
            })
          }
        </ScrollView>
      <View>
        {show && modal()}
      </View>
    </View>
  );
};

export default MyDatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnCalendar: {
    margin: 0,
  },
  searchIcon: {
    fontSize: 40,
  },
  touch: {
    backgroundColor: "grey",
    alignItems: "center",
    padding: 10,
  },
  search: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
    height: 70,
  },
  searchTxt: {
    fontSize: 15,
    fontWeight: "600"
  },
  // ------ The second screen view style
  newestContentContainer: {
    flexDirection: "row",
    columnGap: 26,
    paddingTop: 5,
    paddingBottom: 5,
  },
  newestMainContentContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10
  },
  newestContentDate: {
    alignItems: "center"
  },
  newestContentQty: {
    flex: 1,
    alignSelf: "center",
    alignItems: "flex-end",
  },
  qtyTxt: {
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 100,
    marginRight: 4,
    height: 20,
    width: 20
  }

})
