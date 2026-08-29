import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FilterTabs } from '../components/FilterTabs';
import { RankingCard } from '../components/RankingCard';
import { INITIAL_RANKINGS } from '../data/mockData';
import { MediaType } from '../types';
import { COLORS, FONTS } from '../constants/theme';

export const RankingScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MediaType | 'ALL'>('Anime');

  const filteredRankings = useMemo(() => {
    if (selectedType === 'ALL') return INITIAL_RANKINGS;
    return INITIAL_RANKINGS.filter((r) => r.type === selectedType);
  }, [selectedType]);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.pageTitle}>TOP 100</Text>

      {/* Filter Checkboxes */}
      <FilterTabs
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* 3-Column Grid */}
      <FlatList
        data={filteredRankings}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RankingCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 4,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
