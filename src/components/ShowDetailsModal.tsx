import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { WatchStatus, CastMember, Show } from '../types';
import { INITIAL_CAST_MEMBERS } from '../data/mockData';
import { fetchFullShowDetails, getShowCast } from '../services/mediaService';
import { CastCard } from './CastCard';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STATUS_OPTIONS: WatchStatus[] = ['Watching', 'Planning', 'Completed'];

export const ShowDetailsModal: React.FC = () => {
  const { 
    selectedShow, 
    closeShowDetails, 
    watchlist, 
    addToWatchlist, 
    setWatchStatus, 
    removeFromWatchlist,
    setEpisodeProgress,
    openCastDetails,
  } = useApp();
  const insets = useSafeAreaInsets();
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  const [isHydrating, setIsHydrating] = useState(false);
  const [hydratedShow, setHydratedShow] = useState<Show | null>(null);
  const [liveCast, setLiveCast] = useState<CastMember[]>([]);

  // Hydrate full episodes and cast when an online show is selected
  useEffect(() => {
    if (!selectedShow) {
      setHydratedShow(null);
      setLiveCast([]);
      setIsHydrating(false);
      return;
    }

    // If local show with populated seasons, no network fetch needed
    if (selectedShow.seasons && selectedShow.seasons.length > 0) {
      setHydratedShow(selectedShow);
      setLiveCast(getShowCast(selectedShow));
      setIsHydrating(false);
      return;
    }

    // If online title, fetch complete seasons and cast
    if (selectedShow.id.startsWith('jikan-') || selectedShow.id.startsWith('tvmaze-')) {
      let isMounted = true;
      setIsHydrating(true);

      fetchFullShowDetails(selectedShow)
        .then((res) => {
          if (isMounted) {
            setHydratedShow(res.show);
            setLiveCast(res.cast);
            setIsHydrating(false);
          }
        })
        .catch((err) => {
          console.warn('[ShowDetailsModal] Hydration error:', err);
          if (isMounted) {
            setHydratedShow(selectedShow);
            setIsHydrating(false);
          }
        });

      return () => {
        isMounted = false;
      };
    } else {
      setHydratedShow(selectedShow);
      setLiveCast(getShowCast(selectedShow));
      setIsHydrating(false);
    }
  }, [selectedShow]);

  if (!selectedShow) {
    return null;
  }

  const activeShow = hydratedShow || selectedShow;

  const watchlistItem = watchlist.find(
    (w) => w.showId === activeShow.id || w.title.toLowerCase() === activeShow.title.toLowerCase()
  );
  const isInWatchlist = Boolean(watchlistItem);

  const hasSeasons = Boolean(activeShow.seasons && activeShow.seasons.length > 0);
  const safeSeasonIndex = Math.min(selectedSeasonIndex, (activeShow.seasons?.length || 1) - 1);
  const currentSeason = hasSeasons ? activeShow.seasons![safeSeasonIndex] : null;
  const episodesList = currentSeason?.episodes || activeShow.episodes || [];

  const previousSeasonsEpisodes = hasSeasons
    ? activeShow.seasons!.slice(0, safeSeasonIndex).reduce((sum, s) => sum + s.totalEpisodes, 0)
    : 0;

  const watchedCount = watchlistItem?.watchedEpisodes || 0;
  const numericTotal = typeof activeShow.totalEpisodes === 'number' ? activeShow.totalEpisodes : 0;
  const progressPercentage = numericTotal > 0 ? Math.min(100, Math.round((watchedCount / numericTotal) * 100)) : 0;

  const showCast = useMemo(() => {
    if (!activeShow) return [];
    if (liveCast.length > 0) return liveCast;

    const titleLower = activeShow.title.toLowerCase();
    const shortLower = activeShow.shortTitle?.toLowerCase();
    return INITIAL_CAST_MEMBERS.filter(
      (m) =>
        m.showTitle.toLowerCase() === titleLower ||
        (shortLower && m.showTitle.toLowerCase() === shortLower) ||
        titleLower.includes(m.showTitle.toLowerCase()) ||
        m.showTitle.toLowerCase().includes(titleLower)
    );
  }, [activeShow, liveCast]);

  const handleClose = () => {
    hapticLight();
    setIsSynopsisExpanded(false);
    setShowStatusPicker(false);
    setSelectedSeasonIndex(0);
    closeShowDetails();
  };

  const handleOpenCastMember = (member: CastMember) => {
    hapticMedium();
    closeShowDetails();
    openCastDetails(member);
  };

  const handleAddToWatchlist = () => {
    hapticMedium();
    addToWatchlist(activeShow, 'Watching');
  };

  const handleToggleEpisode = (epNumber: number) => {
    const overallEp = previousSeasonsEpisodes + epNumber;
    let target = overallEp;

    if (watchedCount === overallEp) {
      target = overallEp - 1;
      hapticLight();
    } else {
      if (numericTotal > 0 && target >= numericTotal) {
        hapticSuccess();
      } else {
        hapticLight();
      }
    }

    if (!isInWatchlist) {
      addToWatchlist(activeShow, 'Watching', target);
    } else if (watchlistItem) {
      setEpisodeProgress(watchlistItem.id, target);
    }
  };

  const handleChangeStatus = (newStatus: WatchStatus) => {
    if (watchlistItem) {
      hapticMedium();
      setWatchStatus(watchlistItem.id, newStatus);
    }
    setShowStatusPicker(false);
  };

  const handleRemoveFromWatchlist = () => {
    if (!watchlistItem) return;
    hapticLight();
    Alert.alert(
      'Remove from Watchlist',
      `Are you sure you want to remove "${activeShow.title}" from your watchlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            hapticMedium();
            removeFromWatchlist(watchlistItem.id);
          },
        },
      ]
    );
  };

  const backdropSource = activeShow.backdropUrl || activeShow.posterUrl;
  const isInfinity =
    activeShow.totalEpisodes === '∞' ||
    (typeof activeShow.totalEpisodes === 'number' && activeShow.totalEpisodes >= 999);
  const displayTotal = isInfinity ? '∞' : activeShow.totalEpisodes;

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
                source={{ uri: activeShow.posterUrl }}
                style={styles.posterThumbnail}
                resizeMode="cover"
              />
              <View style={styles.posterBorderOverlay} />
            </View>
          </View>

          {/* Header Metadata Section */}
          <View style={styles.metaContainer}>
            {/* Title */}
            <Text style={styles.showTitle}>{activeShow.title}</Text>

            {/* Key Info Badges */}
            <View style={styles.badgesRow}>
              {/* Media Type Badge */}
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{activeShow.type}</Text>
              </View>

              {/* Release Year */}
              {activeShow.year && (
                <View style={styles.infoPill}>
                  <Text style={styles.infoPillText}>{activeShow.year}</Text>
                </View>
              )}

              {/* Airing Status */}
              {activeShow.status && (
                <View style={[styles.infoPill, styles.statusPill]}>
                  <Text style={styles.statusPillText}>{activeShow.status}</Text>
                </View>
              )}

              {/* Rating */}
              {activeShow.rating && (
                <View style={styles.ratingPill}>
                  <Feather name="star" size={13} color="#F59E0B" />
                  <Text style={styles.ratingText}>{activeShow.rating.toFixed(1)}</Text>
                </View>
              )}

              {/* Total Episodes */}
              <View style={styles.infoPill}>
                <Text style={styles.infoPillText}>{displayTotal} EPS</Text>
              </View>
            </View>

            {/* Genres Row */}
            {activeShow.genres && activeShow.genres.length > 0 && (
              <View style={styles.genresRow}>
                {activeShow.genres.map((genre) => (
                  <View key={genre} style={styles.genreTag}>
                    <Text style={styles.genreTagText}>{genre}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Watchlist Action Section */}
            <View style={styles.actionSection}>
              {!isInWatchlist ? (
                <TouchableOpacity
                  style={styles.addToWatchlistBtn}
                  onPress={handleAddToWatchlist}
                  activeOpacity={0.85}
                >
                  <Feather name="plus" size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }} />
                  <Text style={styles.addToWatchlistText}>ADD TO WATCHLIST</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.watchlistActionsRow}>
                  {/* Status Dropdown Button */}
                  <TouchableOpacity
                    style={styles.statusDropdownBtn}
                    onPress={() => {
                      hapticLight();
                      setShowStatusPicker(true);
                    }}
                    activeOpacity={0.8}
                  >
                    <View style={styles.statusDot} />
                    <Text style={styles.statusLabelText}>
                      STATUS:{' '}
                      <Text style={styles.statusValueText}>{watchlistItem?.status.toUpperCase()}</Text>
                    </Text>
                    <Feather name="chevron-down" size={16} color={COLORS.darkGreen} />
                  </TouchableOpacity>

                  {/* Remove Button */}
                  <TouchableOpacity
                    style={styles.removeWatchlistBtn}
                    onPress={handleRemoveFromWatchlist}
                    activeOpacity={0.8}
                    accessibilityLabel="Remove from watchlist"
                  >
                    <Feather name="trash-2" size={18} color={COLORS.darkGreen} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Synopsis Section */}
            {activeShow.description && (
              <View style={styles.synopsisSection}>
                <Text style={styles.sectionHeading}>SYNOPSIS</Text>
                <Text
                  style={styles.synopsisText}
                  numberOfLines={isSynopsisExpanded ? undefined : 3}
                >
                  {activeShow.description}
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

            {/* Episodes & Seasons Section */}
            <View style={styles.episodesSection}>
              <View style={styles.episodesHeaderRow}>
                <Text style={styles.sectionHeading}>EPISODES</Text>
                {numericTotal > 0 && (
                  <Text style={styles.progressCounterText}>
                    {watchedCount} / {displayTotal} ({progressPercentage}%)
                  </Text>
                )}
              </View>

              {/* Progress Bar */}
              {numericTotal > 0 && (
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                </View>
              )}

              {/* Season Tabs (if multi-season) */}
              {hasSeasons && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.seasonsScroll}
                >
                  {activeShow.seasons!.map((season, idx) => {
                    const isActive = safeSeasonIndex === idx;
                    return (
                      <TouchableOpacity
                        key={season.id}
                        style={[styles.seasonTab, isActive && styles.seasonTabActive]}
                        onPress={() => {
                          hapticLight();
                          setSelectedSeasonIndex(idx);
                        }}
                        activeOpacity={0.75}
                      >
                        <Text style={[styles.seasonTabText, isActive && styles.seasonTabTextActive]}>
                          {season.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}

              {/* Episode List or Loading Indicator */}
              {isHydrating ? (
                <View style={styles.episodesHydratingCard}>
                  <ActivityIndicator size="small" color={COLORS.primaryDark} />
                  <Text style={styles.episodesHydratingText}>FETCHING LIVE EPISODES & SEASONS...</Text>
                </View>
              ) : episodesList.length === 0 ? (
                <View style={styles.noEpisodesCard}>
                  <Text style={styles.noEpisodesText}>Episode list coming soon.</Text>
                </View>
              ) : (
                episodesList.map((ep) => {
                  const overallEp = previousSeasonsEpisodes + ep.episodeNumber;
                  const isWatched = watchedCount >= overallEp;

                  return (
                    <TouchableOpacity
                      key={ep.id}
                      style={[styles.episodeCard, isWatched && styles.episodeCardWatched]}
                      onPress={() => handleToggleEpisode(ep.episodeNumber)}
                      activeOpacity={0.75}
                    >
                      {/* Episode Number Badge */}
                      <View style={styles.episodeNumWrapper}>
                        <Text style={styles.episodeNumText}>EP {ep.episodeNumber}</Text>
                      </View>

                      {/* Title & Info */}
                      <View style={styles.episodeInfoWrapper}>
                        <Text style={styles.episodeTitle} numberOfLines={1}>
                          {ep.title}
                        </Text>
                        {(ep.duration || ep.airDate) && (
                          <Text style={styles.episodeSubtext}>
                            {ep.duration ? `${ep.duration}` : ''}
                            {ep.duration && ep.airDate ? ' • ' : ''}
                            {ep.airDate ? `${ep.airDate}` : ''}
                          </Text>
                        )}
                      </View>

                      {/* Checkmark Button */}
                      <View style={[styles.episodeCheckBtn, isWatched && styles.episodeCheckBtnWatched]}>
                        {isWatched && <Feather name="check" size={15} color="#FFFFFF" strokeWidth={3} />}
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
            
            {/* Cast & Voice Actors Section */}
            {showCast.length > 0 && (
              <View style={styles.castSection}>
                <Text style={styles.sectionHeading}>CAST & VOICE ACTORS</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.castScroll}
                  style={styles.castScrollContainer}
                >
                  {showCast.map((member) => (
                    <CastCard
                      key={member.id}
                      member={member}
                      cardWidth={140}
                      onPress={() => handleOpenCastMember(member)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </ScrollView>


        {/* Status Picker Modal */}
        <Modal
          visible={showStatusPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowStatusPicker(false)}
        >
          <TouchableOpacity
            style={styles.pickerBackdrop}
            activeOpacity={1}
            onPress={() => setShowStatusPicker(false)}
          >
            <View style={styles.pickerCard}>
              <Text style={styles.pickerTitle}>SELECT WATCH STATUS</Text>
              {STATUS_OPTIONS.map((status) => {
                const isCurrent = watchlistItem?.status === status;
                return (
                  <TouchableOpacity
                    key={status}
                    style={[styles.pickerOption, isCurrent && styles.pickerOptionActive]}
                    onPress={() => handleChangeStatus(status)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pickerOptionText, isCurrent && styles.pickerOptionTextActive]}>
                      {status}
                    </Text>
                    {isCurrent && <Feather name="check" size={18} color="#FFFFFF" strokeWidth={3} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>
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
  actionSection: {
    marginBottom: 20,
    marginTop: 4,
  },
  addToWatchlistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderWidth: BORDERS.teal,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.none,
    paddingVertical: 13,
  },
  addToWatchlistText: {
    fontFamily: FONTS.bold,
    fontSize: 14.5,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  watchlistActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDropdownBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: BORDERS.teal,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.none,
    paddingHorizontal: 14,
    height: 48,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primaryDark,
    marginRight: 8,
  },
  statusLabelText: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  statusValueText: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
  },
  removeWatchlistBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  pickerCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    padding: 18,
  },
  pickerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.darkGreen,
    letterSpacing: 2,
    marginBottom: 14,
    textAlign: 'center',
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.2,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  pickerOptionActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  pickerOptionText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.darkGreen,
  },
  pickerOptionTextActive: {
    color: '#FFFFFF',
  },
  episodesSection: {
    marginTop: 8,
    marginBottom: 28,
  },
  episodesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressCounterText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(0, 191, 165, 0.15)',
    borderRadius: RADIUS.none,
    borderWidth: 1,
    borderColor: 'rgba(0, 191, 165, 0.3)',
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primaryDark,
  },
  seasonsScroll: {
    gap: 8,
    marginBottom: 16,
  },
  seasonTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
  },
  seasonTabActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.darkGreen,
  },
  seasonTabText: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    letterSpacing: 1,
  },
  seasonTabTextActive: {
    color: '#FFFFFF',
  },
  episodesHydratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
    borderRadius: RADIUS.none,
    marginBottom: 12,
  },
  episodesHydratingText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  noEpisodesCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.15)',
    borderRadius: RADIUS.none,
    alignItems: 'center',
  },
  noEpisodesText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    borderRadius: RADIUS.none,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
  },
  episodeCardWatched: {
    backgroundColor: 'rgba(0, 191, 165, 0.06)',
    borderColor: COLORS.primary,
  },
  episodeNumWrapper: {
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.none,
    marginRight: 12,
  },
  episodeNumText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  episodeInfoWrapper: {
    flex: 1,
    marginRight: 10,
  },
  episodeTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  episodeSubtext: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  episodeCheckBtn: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.none,
    borderWidth: 2,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeCheckBtnWatched: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  castSection: {
    marginBottom: 28,
  },
  castScrollContainer: {
    marginHorizontal: -20,
  },
  castScroll: {
    paddingHorizontal: 20,
    gap: 12,
    paddingTop: 4,
  },
});

