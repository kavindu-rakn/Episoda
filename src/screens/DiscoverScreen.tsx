import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { FilterTabs } from '../components/FilterTabs';
import { MediaCard } from '../components/MediaCard';
import { useApp } from '../context/AppContext';
import { INITIAL_SHOWS } from '../data/mockData';
import { MediaType, Show } from '../types';
import { COLORS, FONTS } from '../constants/theme';
import { hapticLight } from '../utils/haptics';

export const DiscoverScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Peaky Blinders');
  const [selectedType, setSelectedType] = useState<MediaType | 'ALL'>('TV');
  const { openShowDetails } = useApp();

  // Generate cards for search results, including season breakdown if available
  const displayItems = useMemo(() => {
    let results: Show[] = [];

    INITIAL_SHOWS.forEach((show) => {
      // Check type filter
      if (selectedType !== 'ALL' && show.type !== selectedType) {
        return;
      }

      // Check search match
      const query = searchQuery.trim().toLowerCase();
      const matchTitle = show.title.toLowerCase().includes(query) || 
                         (show.shortTitle && show.shortTitle.toLowerCase().includes(query));

      if (!matchTitle && query.length > 0) {
        return;
      }

      // If show has seasons and user searched for it, show the individual seasons!
      if (show.seasons && show.seasons.length > 0 && query.length > 0) {
        show.seasons.forEach((season) => {
          results.push({
            id: `${show.id}-${season.seasonNumber}`,
            title: season.title,
            shortTitle: season.title,
            type: show.type,
            posterUrl: season.posterUrl,
            totalEpisodes: season.totalEpisodes,
          });
        });
      } else {
        results.push(show);
      }
    });

    return results;
  }, [searchQuery, selectedType]);

  const handlePressCard = (show: Show) => {
    hapticLight();
    const fullShow =
      INITIAL_SHOWS.find(
        (s) =>
          s.id === show.id ||
          show.id.startsWith(s.id) ||
          s.title.toLowerCase() === show.title.toLowerCase() ||
          show.title.toLowerCase().startsWith(s.title.toLowerCase())
      ) || show;
    openShowDetails(fullShow);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.pageTitle}>DISCOVER</Text>

      {/* Search Bar */}
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search anime, TV series, ONA..."
        onClear={() => setSearchQuery('')}
      />

      {/* Filter Checkboxes */}
      <FilterTabs
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Cards Grid */}
      <FlatList
        data={displayItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MediaCard
            show={item}
            showTitle={true}
            onPress={() => handlePressCard(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
          </View>
        }
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textMuted,
  },
});
