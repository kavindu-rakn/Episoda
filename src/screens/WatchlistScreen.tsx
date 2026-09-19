import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { WatchlistRow } from '../components/WatchlistRow';
import { INITIAL_SHOWS } from '../data/mockData';
import { WatchlistItem, Show } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight } from '../utils/haptics';

export const WatchlistScreen: React.FC = () => {
  const { watchlist, updateEpisodeProgress, openShowDetails } = useApp();

  const watchingItems = watchlist.filter((i) => i.status === 'Watching');
  const planningItems = watchlist.filter((i) => i.status === 'Planning');
  const completedItems = watchlist.filter((i) => i.status === 'Completed');

  const handlePressRow = (item: WatchlistItem) => {
    hapticLight();
    const matchingShow: Show =
      INITIAL_SHOWS.find(
        (s) =>
          s.id === item.showId ||
          s.title.toLowerCase() === item.title.toLowerCase() ||
          (item.title.toLowerCase().startsWith(s.title.toLowerCase()))
      ) || {
        id: item.showId,
        title: item.title,
        type: item.type,
        posterUrl: item.posterUrl,
        totalEpisodes: item.totalEpisodes,
      };
    openShowDetails(matchingShow);
  };

  const renderSection = (title: string, items: typeof watchlist) => {
    return (
      <View style={styles.sectionContainer} key={title}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No shows in {title.toLowerCase()}</Text>
          </View>
        ) : (
          items.map((item) => (
            <WatchlistRow
              key={item.id}
              item={item}
              onIncrement={() => updateEpisodeProgress(item.id, 1)}
              onDecrement={() => updateEpisodeProgress(item.id, -1)}
              onPress={() => handlePressRow(item)}
            />
          ))
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title matching Figma Screen 7 */}
        <Text style={styles.pageTitle}>WATCHLIST</Text>

        {renderSection('Watching', watchingItems)}
        {renderSection('Planning', planningItems)}
        {renderSection('Completed', completedItems)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 12,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkGreen,
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    marginHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
