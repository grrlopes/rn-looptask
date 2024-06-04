import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
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
    <SafeAreaView>
      <FlatList
        data={data?.tray}
        numColumns={2}
        renderItem={({ item }) => <LabelById labels={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

