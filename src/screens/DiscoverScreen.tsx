import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Modal 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SearchInput } from '../components/SearchInput';
import { FilterTabs } from '../components/FilterTabs';
import { MediaCard } from '../components/MediaCard';
import { useApp } from '../context/AppContext';
import { INITIAL_SHOWS } from '../data/mockData';
import { MediaType, Show, DiscoverFilterState, DiscoverSortOption, DEFAULT_DISCOVER_FILTERS } from '../types';
import { 
  ALL_DISCOVER_GENRES, 
  SORT_OPTION_LABELS, 
  filterAndSortShows, 
  countActiveFilters 
} from '../utils/showFilters';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticMedium } from '../utils/haptics';

const SORT_OPTIONS: DiscoverSortOption[] = [
  'top_ranked',
  'rating_desc',
  'title_asc',
  'title_desc',
  'episodes_desc',
  'newest',
];

export const DiscoverScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<DiscoverFilterState>({
    ...DEFAULT_DISCOVER_FILTERS,
    mediaType: 'TV', // Preserving Figma initial default
  });
  const [showSortModal, setShowSortModal] = useState(false);
  const { openShowDetails } = useApp();

  // Active filter count
  const activeFiltersCount = useMemo(() => countActiveFilters(filters), [filters]);

  // Filtered and sorted display items
  const displayItems = useMemo(() => {
    // Run full filter and sort engine
    const processed = filterAndSortShows(INITIAL_SHOWS, searchQuery, filters);

    // If show has seasons and user searched for it specifically, include individual seasons
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
      let results: Show[] = [];
      processed.forEach((show) => {
        if (show.seasons && show.seasons.length > 0) {
          show.seasons.forEach((season) => {
            results.push({
              id: `${show.id}-${season.seasonNumber}`,
              title: season.title,
              shortTitle: season.title,
              type: show.type,
              posterUrl: season.posterUrl,
              totalEpisodes: season.totalEpisodes,
              rating: show.rating,
            });
          });
        } else {
          results.push(show);
        }
      });
      return results;
    }

    return processed;
  }, [searchQuery, filters]);

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

  const handleSelectGenre = (genre: string) => {
    hapticLight();
    setFilters((prev) => ({
      ...prev,
      genre: prev.genre === genre ? 'ALL' : genre,
    }));
  };

  const handleSelectSort = (sortOption: DiscoverSortOption) => {
    hapticLight();
    setFilters((prev) => ({
      ...prev,
      sortBy: sortOption,
    }));
    setShowSortModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.pageTitle}>DISCOVER</Text>

      {/* Search Bar */}
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search anime, TV series, genres..."
        onClear={() => setSearchQuery('')}
      />

      {/* Filter Checkboxes (TV, Anime, ONA) */}
      <FilterTabs
        selectedType={filters.mediaType}
        onSelectType={(type) => {
          hapticLight();
          setFilters((prev) => ({ ...prev, mediaType: type }));
        }}
      />

      {/* Quick Sort & Filter Header Bar */}
      <View style={styles.quickBarRow}>
        {/* Sort Pill Button */}
        <TouchableOpacity
          style={styles.sortPill}
          onPress={() => {
            hapticLight();
            setShowSortModal(true);
          }}
          activeOpacity={0.75}
        >
          <Feather name="bar-chart-2" size={13} color={COLORS.darkGreen} />
          <Text style={styles.sortPillText}>
            SORT: {SORT_OPTION_LABELS[filters.sortBy].toUpperCase()}
          </Text>
          <Feather name="chevron-down" size={14} color={COLORS.primaryDark} />
        </TouchableOpacity>

        {/* Active Filter Count Badge */}
        {activeFiltersCount > 0 && (
          <TouchableOpacity
            style={styles.activeFilterChip}
            onPress={() => {
              hapticMedium();
              setFilters(DEFAULT_DISCOVER_FILTERS);
            }}
            activeOpacity={0.75}
          >
            <Text style={styles.activeFilterChipText}>RESET ({activeFiltersCount})</Text>
            <Feather name="x" size={12} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
        )}
      </View>

      {/* Horizontal Scrolling Genre Carousel */}
      <View style={styles.genresCarouselWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genresScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.genreChip,
              filters.genre === 'ALL' && styles.genreChipActive,
            ]}
            onPress={() => handleSelectGenre('ALL')}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.genreChipText,
                filters.genre === 'ALL' && styles.genreChipTextActive,
              ]}
            >
              ALL GENRES
            </Text>
          </TouchableOpacity>

          {ALL_DISCOVER_GENRES.map((genre) => {
            const isSelected = filters.genre.toLowerCase() === genre.toLowerCase();
            return (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.genreChip,
                  isSelected && styles.genreChipActive,
                ]}
                onPress={() => handleSelectGenre(genre)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.genreChipText,
                    isSelected && styles.genreChipTextActive,
                  ]}
                >
                  {genre.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

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
            <Feather name="search" size={32} color={COLORS.textMuted} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>NO MATCHING TITLES</Text>
            <Text style={styles.emptyText}>
              No titles match your active query or filter criteria.
            </Text>
            {activeFiltersCount > 0 && (
              <TouchableOpacity
                style={styles.resetEmptyBtn}
                onPress={() => {
                  hapticMedium();
                  setSearchQuery('');
                  setFilters(DEFAULT_DISCOVER_FILTERS);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.resetEmptyBtnText}>RESET ALL FILTERS</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Quick Sort Order Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.sortModalCard}>
            <View style={styles.sortModalHeader}>
              <Text style={styles.sortModalTitle}>SELECT SORT ORDER</Text>
              <TouchableOpacity
                onPress={() => setShowSortModal(false)}
                style={styles.modalCloseBtn}
              >
                <Feather name="x" size={20} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            {SORT_OPTIONS.map((opt) => {
              const isSelected = filters.sortBy === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.sortOptionRow,
                    isSelected && styles.sortOptionRowActive,
                  ]}
                  onPress={() => handleSelectSort(opt)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      isSelected && styles.sortOptionTextActive,
                    ]}
                  >
                    {SORT_OPTION_LABELS[opt]}
                  </Text>
                  {isSelected && (
                    <Feather name="check" size={18} color={COLORS.primaryDark} strokeWidth={3} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
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
  quickBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sortPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sortPillText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.none,
  },
  activeFilterChipText: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  genresCarouselWrapper: {
    marginBottom: 12,
  },
  genresScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  genreChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.25)',
    borderRadius: RADIUS.none,
  },
  genreChipActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.darkGreen,
  },
  genreChipText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  genreChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    marginBottom: 12,
    opacity: 0.6,
  },
  emptyTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkGreen,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 16,
  },
  resetEmptyBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.none,
  },
  resetEmptyBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sortModalCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    padding: 16,
  },
  sortModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.darkGreen,
    paddingBottom: 10,
    marginBottom: 8,
  },
  sortModalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkGreen,
    letterSpacing: 1.5,
  },
  modalCloseBtn: {
    padding: 4,
  },
  sortOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 56, 49, 0.1)',
  },
  sortOptionRowActive: {
    backgroundColor: '#E8F8F5',
  },
  sortOptionText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  sortOptionTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
  },
});
