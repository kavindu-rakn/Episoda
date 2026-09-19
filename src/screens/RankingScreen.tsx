import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FilterTabs } from '../components/FilterTabs';
import { RankingCard } from '../components/RankingCard';
import { INITIAL_RANKINGS } from '../data/mockData';
import { MediaType } from '../types';
import { COLORS, FONTS } from '../constants/theme';

import { useApp } from '../context/AppContext';
import { INITIAL_SHOWS } from '../data/mockData';
import { hapticLight } from '../utils/haptics';

export const RankingScreen: React.FC = () => {
  const { openShowDetails } = useApp();
  const [selectedType, setSelectedType] = useState<MediaType | 'ALL'>('Anime');

  const filteredRankings = useMemo(() => {
    if (selectedType === 'ALL') return INITIAL_RANKINGS;
    return INITIAL_RANKINGS.filter((r) => r.type === selectedType);
  }, [selectedType]);

  const handlePressRanking = (item: (typeof INITIAL_RANKINGS)[0]) => {
    hapticLight();
    const show =
      INITIAL_SHOWS.find((s) => s.id === item.id || s.title.toLowerCase() === item.title.toLowerCase()) || {
        id: item.id,
        title: item.title,
        shortTitle: item.shortTitle,
        type: item.type,
        posterUrl: item.posterUrl,
        totalEpisodes: '∞' as const,
        rating: 9.0,
        rank: item.rank,
      };
    openShowDetails(show);
  };


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
        renderItem={({ item }) => (
          <RankingCard item={item} onPress={() => handlePressRanking(item)} />
        )}
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
