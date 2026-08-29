import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { CastCard } from '../components/CastCard';
import { INITIAL_CAST_MEMBERS } from '../data/mockData';
import { COLORS, FONTS } from '../constants/theme';

export const CastScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Demon Slayer');

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return INITIAL_CAST_MEMBERS;

    return INITIAL_CAST_MEMBERS.filter(
      (m) =>
        m.showTitle.toLowerCase().includes(query) ||
        m.characterName.toLowerCase().includes(query) ||
        m.actorName.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.pageTitle}>CAST & VA</Text>

      {/* Search Bar */}
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search character, voice actor, show..."
        onClear={() => setSearchQuery('')}
      />

      {/* 2-Column Grid */}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CastCard member={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No cast members found for "{searchQuery}"</Text>
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
