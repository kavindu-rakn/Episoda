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
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ShowDetailsModal: React.FC = () => {
  const { selectedShow, closeShowDetails } = useApp();
  const insets = useSafeAreaInsets();
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  if (!selectedShow) {
    return null;
  }

  const handleClose = () => {
    hapticLight();
    setIsSynopsisExpanded(false);
    closeShowDetails();
  };

  const backdropSource = selectedShow.backdropUrl || selectedShow.posterUrl;
  const isInfinity =
    selectedShow.totalEpisodes === '∞' ||
    (typeof selectedShow.totalEpisodes === 'number' && selectedShow.totalEpisodes >= 999);
  const displayTotal = isInfinity ? '∞' : selectedShow.totalEpisodes;

  return (
    <Modal
      visible={Boolean(selectedShow)}
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
          accessibilityLabel="Close show details"
        >
          <Feather name="x" size={22} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom + 24, 40) }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Banner Image with Gradient */}
          <View style={styles.bannerContainer}>
            <Image
              source={{ uri: backdropSource }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', 'rgba(13,56,49,0.3)', COLORS.background]}
              style={StyleSheet.absoluteFill}
            />


            {/* Poster Thumbnail Overlap */}
            <View style={styles.posterOverlayWrapper}>
              <Image
                source={{ uri: selectedShow.posterUrl }}
                style={styles.posterThumbnail}
                resizeMode="cover"
              />
              <View style={styles.posterBorderOverlay} />
            </View>
          </View>

          {/* Header Metadata Section */}
          <View style={styles.metaContainer}>
            {/* Title */}
            <Text style={styles.showTitle}>{selectedShow.title}</Text>

            {/* Key Info Badges */}
            <View style={styles.badgesRow}>
              {/* Media Type Badge */}
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{selectedShow.type}</Text>
              </View>

              {/* Release Year */}
              {selectedShow.year && (
                <View style={styles.infoPill}>
                  <Text style={styles.infoPillText}>{selectedShow.year}</Text>
                </View>
              )}

              {/* Airing Status */}
              {selectedShow.status && (
                <View style={[styles.infoPill, styles.statusPill]}>
                  <Text style={styles.statusPillText}>{selectedShow.status}</Text>
                </View>
              )}

              {/* Rating */}
              {selectedShow.rating && (
                <View style={styles.ratingPill}>
                  <Feather name="star" size={13} color="#F59E0B" />
                  <Text style={styles.ratingText}>{selectedShow.rating.toFixed(1)}</Text>
                </View>
              )}

              {/* Total Episodes */}
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>{displayTotal} EPS</Text>
              </View>
            </View>

            {/* Genres Row */}
            {selectedShow.genres && selectedShow.genres.length > 0 && (
              <View style={styles.genresRow}>
                {selectedShow.genres.map((genre) => (
                  <View key={genre} style={styles.genreTag}>
                    <Text style={styles.genreTagText}>{genre}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Synopsis Section */}
            {selectedShow.description && (
              <View style={styles.synopsisSection}>
                <Text style={styles.sectionHeading}>SYNOPSIS</Text>
                <Text
                  style={styles.synopsisText}
                  numberOfLines={isSynopsisExpanded ? undefined : 3}
                >
                  {selectedShow.description}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
                  activeOpacity={0.7}
                  style={styles.readMoreButton}
                >
                  <Text style={styles.readMoreText}>
                    {isSynopsisExpanded ? 'Show Less ↑' : 'Read More ↓'}
                  </Text>
                </TouchableOpacity>
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
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: 250,
    position: 'relative',
    backgroundColor: '#0F2620',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  posterOverlayWrapper: {
    position: 'absolute',
    bottom: 12,
    left: 20,
    width: 82,
    height: 112,
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: RADIUS.none,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  posterThumbnail: {
    width: '100%',
    height: '100%',
  },
  posterBorderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: BORDERS.teal,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.none,
  },
  metaContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  showTitle: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.darkGreen,
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  typeBadge: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.none,
  },
  typeBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  infoPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: COLORS.darkGreen,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.none,
  },
  infoPillText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  statusPill: {
    backgroundColor: '#F0FDF9',
    borderColor: COLORS.primaryDark,
  },
  statusPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primaryDark,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.none,
  },
  ratingText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 18,
  },
  genreTag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.none,
  },
  genreTagText: {
    fontFamily: FONTS.medium,
    fontSize: 11.5,
    color: COLORS.darkGreen,
  },
  synopsisSection: {
    marginTop: 4,
    marginBottom: 16,
  },
  sectionHeading: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.darkGreen,
    letterSpacing: 2,
    marginBottom: 6,
  },
  synopsisText: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    color: COLORS.textPrimary,
    lineHeight: 21,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    marginTop: 2,
  },
  readMoreText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primaryDark,
    textDecorationLine: 'underline',
  },
});
