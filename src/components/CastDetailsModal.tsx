import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { INITIAL_SHOWS } from '../data/mockData';
import { FilmographyItem, Show } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticMedium } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CastDetailsModal: React.FC = () => {
  const { selectedCastMember, closeCastDetails, openShowDetails } = useApp();
  const insets = useSafeAreaInsets();
  const [activeBioTab, setActiveBioTab] = useState<'character' | 'actor'>('character');

  if (!selectedCastMember) {
    return null;
  }

  const handleClose = () => {
    hapticLight();
    closeCastDetails();
  };

  const handlePressCurrentShow = () => {
    hapticMedium();
    const match = INITIAL_SHOWS.find(
      (s) =>
        s.title.toLowerCase() === selectedCastMember.showTitle.toLowerCase() ||
        (s.shortTitle && s.shortTitle.toLowerCase() === selectedCastMember.showTitle.toLowerCase()) ||
        selectedCastMember.showTitle.toLowerCase().includes(s.title.toLowerCase()) ||
        s.title.toLowerCase().includes(selectedCastMember.showTitle.toLowerCase())
    );
    closeCastDetails();
    if (match) {
      openShowDetails(match);
    } else {
      const showId = selectedCastMember.id.startsWith('jikan-cast-')
        ? `jikan-${selectedCastMember.id.split('-')[2]}`
        : selectedCastMember.id.startsWith('tvmaze-cast-')
        ? `tvmaze-${selectedCastMember.id.split('-')[2]}`
        : selectedCastMember.id;

      openShowDetails({
        id: showId,
        title: selectedCastMember.showTitle,
        shortTitle: selectedCastMember.showTitle,
        type: showId.startsWith('jikan-') ? 'Anime' : 'TV',
        posterUrl: selectedCastMember.characterImageUrl,
        totalEpisodes: 12,
        rating: 8.5,
      });
    }
  };

  const handlePressFilmography = (item: FilmographyItem) => {
    hapticMedium();
    const match = INITIAL_SHOWS.find(
      (s) =>
        s.title.toLowerCase() === item.showTitle.toLowerCase() ||
        (s.shortTitle && s.shortTitle.toLowerCase() === item.showTitle.toLowerCase()) ||
        item.showTitle.toLowerCase().includes(s.title.toLowerCase()) ||
        s.title.toLowerCase().includes(item.showTitle.toLowerCase())
    );

    closeCastDetails();
    if (match) {
      openShowDetails(match);
    } else {
      const isAnime = item.id.startsWith('jikan-');
      const fallbackShow: Show = {
        id: item.id,
        title: item.showTitle,
        shortTitle: item.showTitle,
        type: isAnime ? 'Anime' : 'TV',
        posterUrl: item.posterUrl || selectedCastMember.characterImageUrl,
        totalEpisodes: 12,
        rating: 8.5,
      };
      openShowDetails(fallbackShow);
    }
  };

  const characterBioText =
    selectedCastMember.characterBio ||
    `${selectedCastMember.characterName} is a prominent figure in ${selectedCastMember.showTitle}, brought to life with distinct personality, emotional depth, and memorable dialogue.`;

  const actorBioText =
    selectedCastMember.actorBio ||
    `${selectedCastMember.actorName} is a celebrated voice artist and actor whose performances across television, animation, and video games have earned widespread critical acclaim.`;

  return (
    <Modal
      visible={Boolean(selectedCastMember)}
      animationType="slide"
      transparent={false}
      onRequestClose={handleClose}
    >
      <View style={styles.rootContainer}>
        {/* Floating Close Button */}
        <TouchableOpacity
          style={[styles.floatingCloseButton, { top: Math.max(insets.top + 8, 20) }]}
          onPress={handleClose}
          activeOpacity={0.8}
          accessibilityLabel="Close cast details"
        >
          <Feather name="x" size={22} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom + 24, 40) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Hero Showcase: Dual Portrait Side-by-Side */}
          <View style={[styles.heroContainer, { paddingTop: Math.max(insets.top + 20, 32) }]}>
            <View style={styles.dualImageBox}>
              {/* Left Half: Character Portrait */}
              <View style={styles.portraitHalf}>
                <Image
                  source={{ uri: selectedCastMember.characterImageUrl }}
                  style={styles.portraitImage}
                  resizeMode="cover"
                />
                <View style={styles.portraitLabelBadge}>
                  <Text style={styles.portraitLabelText}>CHARACTER</Text>
                </View>
                {selectedCastMember.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Feather name="check" size={12} color="#10B981" strokeWidth={3} />
                  </View>
                )}
              </View>

              {/* Center Divider */}
              <View style={styles.dualDivider} />

              {/* Right Half: Actor Portrait */}
              <View style={styles.portraitHalf}>
                <Image
                  source={{ uri: selectedCastMember.actorImageUrl }}
                  style={styles.portraitImage}
                  resizeMode="cover"
                />
                <View style={[styles.portraitLabelBadge, styles.actorLabelBadge]}>
                  <Text style={styles.portraitLabelText}>VOICE ACTOR</Text>
                </View>
              </View>

              {/* Sharp 2.5px Teal Border Overlay */}
              <View style={styles.borderOverlay} />
            </View>
          </View>

          {/* Metadata Section */}
          <View style={styles.metaContainer}>
            {/* Actor Name & Verified Badge */}
            <View style={styles.titleRow}>
              <Text style={styles.actorNameText}>{selectedCastMember.actorName}</Text>
              {selectedCastMember.isVerified && (
                <Ionicons name="checkmark-circle" size={22} color="#10B981" style={styles.verifiedIcon} />
              )}
            </View>

            {/* Character Spotlight Banner with Jump-to-Show capability */}
            <TouchableOpacity
              style={styles.spotlightCard}
              onPress={handlePressCurrentShow}
              activeOpacity={0.8}
            >
              <View style={styles.spotlightHeaderRow}>
                <Text style={styles.spotlightLabel}>PORTRAYING / VOICING</Text>
                <View style={styles.viewShowPill}>
                  <Text style={styles.viewShowText}>VIEW SHOW</Text>
                  <Feather name="arrow-right" size={11} color={COLORS.primaryDark} />
                </View>
              </View>
              <Text style={styles.spotlightCharacter}>
                {selectedCastMember.characterName}
                <Text style={styles.spotlightShow}> in {selectedCastMember.showTitle}</Text>
              </Text>
            </TouchableOpacity>

            {/* Key Information Badges */}
            <View style={styles.badgesRow}>
              {selectedCastMember.role && (
                <View style={styles.roleBadge}>
                  <Text style={styles.roleBadgeText}>{selectedCastMember.role.toUpperCase()}</Text>
                </View>
              )}

              {selectedCastMember.nationality && (
                <View style={styles.infoPill}>
                  <Feather name="globe" size={12} color={COLORS.darkGreen} style={{ marginRight: 4 }} />
                  <Text style={styles.infoPillText}>{selectedCastMember.nationality}</Text>
                </View>
              )}

              {selectedCastMember.birthDate && (
                <View style={styles.infoPill}>
                  <Feather name="calendar" size={12} color={COLORS.darkGreen} style={{ marginRight: 4 }} />
                  <Text style={styles.infoPillText}>{selectedCastMember.birthDate}</Text>
                </View>
              )}
            </View>

            {/* Biography Segmented Switcher */}
            <View style={styles.bioTabsRow}>
              <TouchableOpacity
                style={[styles.bioTab, activeBioTab === 'character' && styles.bioTabActive]}
                onPress={() => {
                  hapticLight();
                  setActiveBioTab('character');
                }}
                activeOpacity={0.75}
              >
                <Text style={[styles.bioTabText, activeBioTab === 'character' && styles.bioTabTextActive]}>
                  CHARACTER STORY
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.bioTab, activeBioTab === 'actor' && styles.bioTabActive]}
                onPress={() => {
                  hapticLight();
                  setActiveBioTab('actor');
                }}
                activeOpacity={0.75}
              >
                <Text style={[styles.bioTabText, activeBioTab === 'actor' && styles.bioTabTextActive]}>
                  ACTOR BIOGRAPHY
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bio Content Box */}
            <View style={styles.bioContentCard}>
              <Text style={styles.bioText}>
                {activeBioTab === 'character' ? characterBioText : actorBioText}
              </Text>
            </View>

            {/* Known For / Filmography Section */}
            {selectedCastMember.filmography && selectedCastMember.filmography.length > 0 && (
              <View style={styles.filmographySection}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionHeading}>KNOWN FOR / FILMOGRAPHY</Text>
                  <Text style={styles.filmographyCount}>
                    {selectedCastMember.filmography.length} CREDITS
                  </Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filmographyScroll}
                  style={styles.filmographyScrollContainer}
                >
                  {selectedCastMember.filmography.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.filmCard}
                      onPress={() => handlePressFilmography(item)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.filmPosterWrapper}>
                        <Image
                          source={{ uri: item.posterUrl || selectedCastMember.characterImageUrl }}
                          style={styles.filmPosterImage}
                          resizeMode="cover"
                        />
                        {item.year && (
                          <View style={styles.filmYearBadge}>
                            <Text style={styles.filmYearText}>{item.year}</Text>
                          </View>
                        )}
                        <View style={styles.filmBorderOverlay} />
                      </View>

                      <Text style={styles.filmTitle} numberOfLines={1}>
                        {item.showTitle}
                      </Text>
                      <Text style={styles.filmCharacter} numberOfLines={1}>
                        {item.characterName}
                      </Text>
                      {item.roleType && (
                        <Text style={styles.filmRole} numberOfLines={1}>
                          {item.roleType}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  floatingCloseButton: {
    position: 'absolute',
    left: 16,
    zIndex: 50,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  dualImageBox: {
    width: SCREEN_WIDTH - 32,
    height: (SCREEN_WIDTH - 32) * 0.68,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#000000',
    overflow: 'hidden',
    borderRadius: RADIUS.none,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  portraitHalf: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  portraitImage: {
    width: '100%',
    height: '100%',
  },
  portraitLabelBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(13, 56, 49, 0.85)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  actorLabelBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  portraitLabelText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  dualDivider: {
    width: 2.5,
    height: '100%',
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  borderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: BORDERS.teal,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.none,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 2,
    padding: 3,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  metaContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actorNameText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.darkGreen,
    letterSpacing: 0.5,
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  spotlightCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDERS.teal,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.none,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  spotlightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  viewShowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: RADIUS.none,
    gap: 4,
  },
  viewShowText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.primaryDark,
    letterSpacing: 0.8,
  },
  spotlightLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    color: COLORS.primaryDark,
    letterSpacing: 1.5,
  },
  spotlightCharacter: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkGreen,
  },
  spotlightShow: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  roleBadge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.none,
  },
  roleBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: COLORS.darkGreen,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: RADIUS.none,
  },
  infoPillText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  bioTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  bioTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
  },
  bioTabActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.darkGreen,
  },
  bioTabText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: COLORS.darkGreen,
    letterSpacing: 1,
  },
  bioTabTextActive: {
    color: '#FFFFFF',
  },
  bioContentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    borderRadius: RADIUS.none,
    padding: 14,
    marginBottom: 24,
  },
  bioText: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    color: COLORS.textPrimary,
    lineHeight: 21,
  },
  filmographySection: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionHeading: {
    fontFamily: FONTS.bold,
    fontSize: 14.5,
    color: COLORS.darkGreen,
    letterSpacing: 1.5,
  },
  filmographyCount: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: COLORS.primaryDark,
    letterSpacing: 0.8,
  },
  filmographyScrollContainer: {
    marginHorizontal: -20,
  },
  filmographyScroll: {
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 2,
    paddingBottom: 4,
  },
  filmCard: {
    width: 124,
  },
  filmPosterWrapper: {
    width: 124,
    height: 168,
    backgroundColor: '#000000',
    overflow: 'hidden',
    borderRadius: RADIUS.none,
    position: 'relative',
    marginBottom: 6,
  },
  filmPosterImage: {
    width: '100%',
    height: '100%',
  },
  filmYearBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: RADIUS.none,
  },
  filmYearText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  filmBorderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: BORDERS.teal,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.none,
  },
  filmTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    marginBottom: 1,
  },
  filmCharacter: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    color: COLORS.primaryDark,
    marginBottom: 1,
  },
  filmRole: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    color: COLORS.textMuted,
  },
});
