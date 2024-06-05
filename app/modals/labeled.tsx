import { ActivityIndicator, FlatList,  Text, View } from 'react-native'
import React, { useState } from 'react'
import { useGlobalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Labeled, Tray } from '../(tabs)';
import { fetchOneById } from '@/api/label';
import { SafeAreaView } from 'react-native-safe-area-context';
import LabelById from '@/components/LabelById';

export default function labeled() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<Labeled>({
    queryKey: ['labels', id],
    queryFn: () => fetchOneById(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={{ backgroundColor: "#E0E0E0", flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.tray}
        numColumns={2}
        renderItem={({ item, index }) => <LabelById labels={item} count={index} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

