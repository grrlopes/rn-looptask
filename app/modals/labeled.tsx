import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, router, useGlobalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Labeled } from '../(tabs)';
import { fetchOneById } from '@/api/label';
import LabelById from '@/components/LabelById';
import ErrorPage from '@/components/ErrorPage';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import useStoreLabel from '@/store/labeled';

export default function labeled() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const getItemById = useStoreLabel((state) => state.getItemById(id !== undefined ? id : ""))
  const { data, isLoading, error } = useQuery<Labeled>({
    queryKey: ['labels', id],
    queryFn: () => fetchOneById(id),
  });

  if (isLoading) {
    return <ActivityIndicator size={"large"} color={"#000000"} style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }} />;
  }

  if (error) {
    return (
      <>
        <ErrorPage message={error.message} />
        <View style={styles.footBar}>
          <Link href={{ pathname: "/modals/barcode", params: { id: id, } }} asChild>
            <TouchableOpacity>
              <FontAwesome
                name="camera-retro"
                size={28}
                color={Colors['light'].text}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.TopBar}>
        <View style={styles.title}>
          <Text style={styles.titleSize}>Small</Text>
          <View style={styles.Quantity}>
            <Text>{getItemById?.small}</Text>
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleSize}>Large</Text>
          <View style={styles.Quantity}>
            <Text>{getItemById?.large}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Text >Go Back</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.message.trays}
        numColumns={2}
        renderItem={({ item, index }) => <LabelById labels={item} count={index} />}
        keyExtractor={item => item.id}
      />
      <View style={styles.footBar}>
        <Link href={{ pathname: "/modals/barcode", params: { id: id, } }} asChild>
          <TouchableOpacity>
            <FontAwesome
              name="camera-retro"
              size={28}
              color={Colors['light'].text}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#E0E0E0',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 0.1,
    borderTopColor: '#ccc',
  },
  TopBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 70,
    backgroundColor: '#757575',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 0.1,
    borderTopColor: '#ccc',
    paddingBottom: 4,
  },
  Quantity: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  title: {
    flexDirection: "row",
    gap: 10,
  },
  titleSize: {
    fontSize: 11,
  }
})
