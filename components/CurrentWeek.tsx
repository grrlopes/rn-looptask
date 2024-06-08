import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'
import { Labeled } from '@/app/(tabs)'

interface Props {
  dateParse: Date;
  items: Labeled;
}

const CurrentWeek = (props: Props) => {
  return (
    <Link href={{ pathname: "/modals/labeled", params: { id: props.items.id, } }} asChild>
      <TouchableOpacity>
        <View style={styles.newestMainContentContainer}>
          <View style={styles.newestContentContainer}>
            <View style={styles.newestContentDate}>
              <Text style={{ color: "darkblue" }}>{props.dateParse.toLocaleDateString('en-us', { weekday: "short" })}</Text>
              <Text style={{ fontWeight: "600" }}>{props.dateParse.getUTCDate()}</Text>
              <Text style={{ fontWeight: "400" }}>{props.dateParse.toLocaleString('en-us', { month: "short" })}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "500", color: "#000000" }}>{props.dateParse.getFullYear()}</Text>
              <Text style={{ fontWeight: "400" }}>{props.items.id}</Text>
              <Text>{props.items.creator}</Text>
            </View>
            <View style={styles.newestContentQty}>
              <Text>{props.items.tray.length}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default CurrentWeek

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
