import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { FontAwesome } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { fetchTrayStackByDate } from '@/api/label';
import { ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { LabeledStack } from '@/interfaces/label';
import { useSpring, animated } from '@react-spring/native';
import { useIsFocused } from '@react-navigation/native';
import { TrayStacked } from '@/interfaces/tray';
import { subWeeks } from 'date-fns';

const MyDatePicker = () => {
  const [date, setDate] = useState<Date>(subWeeks(new Date(), 4));
  const [show, setShow] = useState<boolean>(false);

  const daa: TrayStacked = {
    created_at: date
  }
  const { data, isLoading } = useQuery<LabeledStack>({
    queryKey: ['search', date],
    queryFn: () => fetchTrayStackByDate(daa),
  });

  const springProps = useSpring({
    translateY: useIsFocused() ? 0 : 300, // Directly define translateX as a numeric value
    config: { tension: 220, friction: 10, bounce: 1.0 },
  });

  if (isLoading) {
    return <ActivityIndicator size={"large"} color={"#000000"} style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }} />;
  }

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const dateModal = () => {
    return (
      <DateTimePickerModal
        date={date}
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        themeVariant='light'
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnCalendar}>
        <TouchableOpacity onPress={showDatePicker} style={styles.touch}>
          <View style={styles.search}>
            <FontAwesome name="search" style={styles.searchIcon} />
            <Text style={styles.searchTxt}>{date.toDateString()}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <animated.View
        style={[
          {
            transform: [
              { translateY: springProps.translateY }, // Explicitly map the translateX property
            ],
          },
        ]}
      >
        <ScrollView>
          {
            data?.message.map(item => {
              const dateParse = new Date(item.created_at)
              return (
                <Link href={{ pathname: "/modals/labeled", params: { id: item.id, } }} key={item.id} asChild>
                  <Pressable>
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
                  </Pressable>
                </Link>
              )
            })
          }
        </ScrollView>
      </animated.View>
      <View>
        {show && dateModal()}
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
    marginBottom: 10,

    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 3,
    elevation: 2,

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
