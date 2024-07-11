import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'expo-router'
import { User } from '@/app/(tabs)';

interface Props {
  dateParse: Date;
  id: string;
  owner: User;
  trayCount: number
}

const CurrentWeek = (props: Props) => {
  return (
    <Link href={{ pathname: "/modals/labeled", params: { id: props.id, } }} asChild>
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
              <Text style={{ fontWeight: "400" }}>{props.id}</Text>
              <Text>{props.owner.name} {props.owner.surname}  </Text>
            </View>
            <View style={styles.newestContentQty}>
              <View style={styles.qtyTxt}>
                <Text>{props.trayCount}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default CurrentWeek

const styles = StyleSheet.create({
  newestContentContainer: {
    flexDirection: "row",
    columnGap: 26,
    paddingTop: 5,
    paddingBottom: 5,
  },
  newestMainContentContainer: {
    flex: 1,
    flexDirection: "column",
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
});
