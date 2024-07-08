import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useGlobalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Labeled } from '../(tabs)';
import { fetchOneById } from '@/api/label';
import LabelById from '@/components/LabelById';
import ErrorPage from '@/components/ErrorPage';

export default function labeled() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Labeled>({
    queryKey: ['labels', id],
    queryFn: () => fetchOneById(id),
  });

  if (isLoading) {
    return <ActivityIndicator size={"large"} color={"#000000"} style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }} />;
  }

  if (error) {
    return (
      <ErrorPage message={error.message} />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.message.trays}
        numColumns={2}
        renderItem={({ item, index }) => <LabelById labels={item} count={index} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
