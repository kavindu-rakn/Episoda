import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DiscoverFilterState,
  DiscoverSortOption,
  MediaType,
  DEFAULT_DISCOVER_FILTERS,
} from '../types';
import {
  ALL_DISCOVER_GENRES,
  SORT_OPTION_LABELS,
  filterAndSortShows,
  countActiveFilters,
} from '../utils/showFilters';
import { INITIAL_SHOWS } from '../data/mockData';
import { COLORS, FONTS, RADIUS } from '../constants/theme';
import { hapticLight, hapticMedium } from '../utils/haptics';

export interface DiscoverFilterModalProps {
  visible: boolean;
  filters: DiscoverFilterState;
  onClose: () => void;
  onApply: (filters: DiscoverFilterState) => void;
  onReset: () => void;
}

const MEDIA_TYPES: { label: string; value: MediaType | 'ALL' }[] = [
  { label: 'ALL TYPES', value: 'ALL' },
  { label: 'TV SERIES', value: 'TV' },
  { label: 'ANIME', value: 'Anime' },
  { label: 'ONA', value: 'ONA' },
];

const STATUS_OPTIONS: { label: string; value: 'ALL' | 'Airing' | 'Completed' }[] = [
  { label: 'ALL STATUS', value: 'ALL' },
  { label: 'AIRING', value: 'Airing' },
  { label: 'COMPLETED', value: 'Completed' },
];

const RATING_OPTIONS: { label: string; value: number }[] = [
  { label: 'ANY', value: 0 },
  { label: '★ 8.0+', value: 8.0 },
  { label: '★ 8.5+', value: 8.5 },
  { label: '★ 9.0+', value: 9.0 },
];

const SORT_OPTIONS: DiscoverSortOption[] = [
  'top_ranked',
  'rating_desc',
  'title_asc',
  'title_desc',
  'episodes_desc',
  'newest',
];

export const DiscoverFilterModal: React.FC<DiscoverFilterModalProps> = ({
  visible,
  filters,
  onClose,
  onApply,
  onReset,
}) => {
  const insets = useSafeAreaInsets();
  const [draftFilters, setDraftFilters] = useState<DiscoverFilterState>(filters);

  // Sync draft state with incoming filters when opened
  useEffect(() => {
    if (visible) {
      setDraftFilters(filters);
    }
  }, [visible, filters]);

  const activeCount = useMemo(() => countActiveFilters(draftFilters), [draftFilters]);

  // Real-time preview of how many titles match the draft selection
  const previewCount = useMemo(() => {
    return filterAndSortShows(INITIAL_SHOWS, '', draftFilters).length;
  }, [draftFilters]);

  const handleResetDraft = () => {
    hapticMedium();
    setDraftFilters(DEFAULT_DISCOVER_FILTERS);
  };

  const handleApply = () => {
    hapticLight();
    onApply(draftFilters);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View
          style={[
            styles.drawerCard,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          {/* Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.headerTitleGroup}>
              <Text style={styles.headerTitle}>FILTER CATALOG</Text>
              {activeCount > 0 && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>{activeCount} ACTIVE</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.75}
            >
              <Feather name="x" size={20} color={COLORS.darkGreen} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Filter Sections */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Section 1: Media Type */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>MEDIA TYPE</Text>
              <View style={styles.pillsRow}>
                {MEDIA_TYPES.map((typeOpt) => {
                  const isSelected = draftFilters.mediaType === typeOpt.value;
                  return (
                    <TouchableOpacity
                      key={typeOpt.value}
                      style={[
                        styles.pillBtn,
                        isSelected && styles.pillBtnActive,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setDraftFilters((prev) => ({
                          ...prev,
                          mediaType: typeOpt.value,
                        }));
                      }}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.pillBtnText,
                          isSelected && styles.pillBtnTextActive,
                        ]}
                      >
                        {typeOpt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section 2: Release Status */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>RELEASE STATUS</Text>
              <View style={styles.pillsRow}>
                {STATUS_OPTIONS.map((statusOpt) => {
                  const isSelected = draftFilters.status === statusOpt.value;
                  return (
                    <TouchableOpacity
                      key={statusOpt.value}
                      style={[
                        styles.pillBtn,
                        isSelected && styles.pillBtnActive,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setDraftFilters((prev) => ({
                          ...prev,
                          status: statusOpt.value,
                        }));
                      }}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.pillBtnText,
                          isSelected && styles.pillBtnTextActive,
                        ]}
                      >
                        {statusOpt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section 3: Minimum Rating */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>MINIMUM RATING</Text>
              <View style={styles.pillsRow}>
                {RATING_OPTIONS.map((ratingOpt) => {
                  const isSelected = draftFilters.minRating === ratingOpt.value;
                  return (
                    <TouchableOpacity
                      key={ratingOpt.value}
                      style={[
                        styles.ratingChip,
                        isSelected && styles.ratingChipActive,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setDraftFilters((prev) => ({
                          ...prev,
                          minRating: ratingOpt.value,
                        }));
                      }}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.ratingChipText,
                          isSelected && styles.ratingChipTextActive,
                        ]}
                      >
                        {ratingOpt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Section 4: Genres Grid */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>GENRE</Text>
              <View style={styles.genresGrid}>
                {/* ALL GENRES chip */}
                <TouchableOpacity
                  style={[
                    styles.genreChip,
                    draftFilters.genre === 'ALL' && styles.genreChipActive,
                  ]}
                  onPress={() => {
                    hapticLight();
                    setDraftFilters((prev) => ({ ...prev, genre: 'ALL' }));
                  }}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.genreChipText,
                      draftFilters.genre === 'ALL' && styles.genreChipTextActive,
                    ]}
                  >
                    ALL GENRES
                  </Text>
                </TouchableOpacity>

                {/* Specific Genre Chips */}
                {ALL_DISCOVER_GENRES.map((genre) => {
                  const isSelected =
                    draftFilters.genre.toLowerCase() === genre.toLowerCase();
                  return (
                    <TouchableOpacity
                      key={genre}
                      style={[
                        styles.genreChip,
                        isSelected && styles.genreChipActive,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setDraftFilters((prev) => ({
                          ...prev,
                          genre: prev.genre === genre ? 'ALL' : genre,
                        }));
                      }}
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
              </View>
            </View>

            {/* Section 5: Sort Order */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>SORT ORDER</Text>
              <View style={styles.sortGrid}>
                {SORT_OPTIONS.map((sortOpt) => {
                  const isSelected = draftFilters.sortBy === sortOpt;
                  return (
                    <TouchableOpacity
                      key={sortOpt}
                      style={[
                        styles.sortOptionPill,
                        isSelected && styles.sortOptionPillActive,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setDraftFilters((prev) => ({ ...prev, sortBy: sortOpt }));
                      }}
                      activeOpacity={0.75}
                    >
                      <Text
                        style={[
                          styles.sortOptionPillText,
                          isSelected && styles.sortOptionPillTextActive,
                        ]}
                      >
                        {SORT_OPTION_LABELS[sortOpt]}
                      </Text>
                      {isSelected && (
                        <Feather
                          name="check"
                          size={14}
                          color="#FFFFFF"
                          strokeWidth={2.5}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={handleResetDraft}
              activeOpacity={0.75}
            >
              <Feather name="rotate-ccw" size={14} color={COLORS.darkGreen} />
              <Text style={styles.resetBtnText}>RESET ALL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={handleApply}
              activeOpacity={0.85}
            >
              <Text style={styles.applyBtnText}>
                APPLY FILTERS ({previewCount})
              </Text>
              <Feather name="arrow-right" size={15} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawerCard: {
    backgroundColor: COLORS.background,
    borderTopWidth: 3,
    borderTopColor: COLORS.darkGreen,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    maxHeight: '85%',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.darkGreen,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkGreen,
    letterSpacing: 1.5,
  },
  activeBadge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.none,
  },
  activeBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  closeBtn: {
    padding: 4,
  },
  scrollArea: {
    flexShrink: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 20,
  },
  sectionBlock: {
    gap: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.darkGreen,
    letterSpacing: 1.2,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.25)',
    borderRadius: RADIUS.none,
  },
  pillBtnActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.darkGreen,
  },
  pillBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    color: COLORS.darkGreen,
    letterSpacing: 0.5,
  },
  pillBtnTextActive: {
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  ratingChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.25)',
    borderRadius: RADIUS.none,
  },
  ratingChipActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  ratingChipText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    color: COLORS.darkGreen,
    letterSpacing: 0.5,
  },
  ratingChipTextActive: {
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  genreChip: {
    paddingHorizontal: 10,
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
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.darkGreen,
    letterSpacing: 0.4,
  },
  genreChipTextActive: {
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  sortGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortOptionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.25)',
    borderRadius: RADIUS.none,
  },
  sortOptionPillActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.darkGreen,
  },
  sortOptionPillText: {
    fontFamily: FONTS.medium,
    fontSize: 11.5,
    color: COLORS.darkGreen,
  },
  sortOptionPillTextActive: {
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: COLORS.darkGreen,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
  },
  resetBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  applyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primaryDark,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
  },
  applyBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
