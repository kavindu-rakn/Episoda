import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert,
  TextInput,
  Modal,
  Dimensions,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AVATAR_PRESETS, MILESTONE_BADGES, INITIAL_SHOWS } from '../data/mockData';
import { MilestoneBadge, StreamingRegion } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const REGION_OPTIONS: StreamingRegion[] = ['Global', 'North America', 'Japan', 'Europe'];

export const ProfileScreen: React.FC = () => {
  const { 
    userProfile, 
    updateUserProfile, 
    logout, 
    setActiveOverlay, 
    watchlist,
    settings,
    updateSettings,
    resetToSampleData,
    clearWatchlist,
    exportData,
    importData,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState<'analytics' | 'milestones' | 'settings'>('analytics');

  // Modals for settings
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [exportedJsonText, setExportedJsonText] = useState('');
  const [importJsonText, setImportJsonText] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(userProfile.name);
  const [editHandle, setEditHandle] = useState(userProfile.handle || 'johndoe');
  const [editBio, setEditBio] = useState(userProfile.bio || '');
  const [editAvatarUrl, setEditAvatarUrl] = useState(userProfile.avatarUrl);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editBirthday, setEditBirthday] = useState(userProfile.birthday);
  const [editGender, setEditGender] = useState(userProfile.gender);

  const handleOpenEdit = () => {
    hapticLight();
    setEditName(userProfile.name);
    setEditHandle(userProfile.handle || 'johndoe');
    setEditBio(userProfile.bio || '');
    setEditAvatarUrl(userProfile.avatarUrl);
    setEditEmail(userProfile.email);
    setEditBirthday(userProfile.birthday);
    setEditGender(userProfile.gender);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Please enter a valid display name.');
      return;
    }
    if (!editEmail.trim() || !editEmail.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    hapticSuccess();
    updateUserProfile({
      name: editName.trim(),
      handle: editHandle.trim().replace(/^@/, ''),
      bio: editBio.trim(),
      avatarUrl: editAvatarUrl.trim() || userProfile.avatarUrl,
      birthday: editBirthday.trim(),
      gender: editGender.trim(),
      email: editEmail.trim(),
    });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    hapticLight();
    Alert.alert('Log Out', 'Are you sure you want to log out of EpiSoda?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Log Out', 
        style: 'destructive', 
        onPress: () => {
          hapticMedium();
          logout();
        }
      },
    ]);
  };

  const { stats } = userProfile;

  // Status Distribution Calculation
  const completedCount = useMemo(
    () => watchlist.filter((w) => w.status === 'Completed').length,
    [watchlist]
  );
  const watchingCount = useMemo(
    () => watchlist.filter((w) => w.status === 'Watching').length,
    [watchlist]
  );
  const planningCount = useMemo(
    () => watchlist.filter((w) => w.status === 'Planning').length,
    [watchlist]
  );
  const totalWatchlist = watchlist.length || 1;

  const completedPct = Math.round((completedCount / totalWatchlist) * 100);
  const watchingPct = Math.round((watchingCount / totalWatchlist) * 100);
  const planningPct = Math.max(0, 100 - completedPct - watchingPct);

  // Genre Distribution Calculation
  const genreDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    watchlist.forEach((item) => {
      const match = INITIAL_SHOWS.find(
        (s) =>
          s.id === item.showId ||
          s.title.toLowerCase() === item.title.toLowerCase()
      );
      const genres = match?.genres || (item.type === 'Anime' ? ['Anime', 'Action'] : ['TV', 'Drama']);
      genres.forEach((g) => {
        counts[g] = (counts[g] || 0) + 1;
      });
    });

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const totalOccurrences = entries.reduce((acc, curr) => acc + curr[1], 0) || 1;
    return entries.slice(0, 5).map(([genre, count]) => ({
      genre,
      count,
      pct: Math.round((count / totalOccurrences) * 100),
    }));
  }, [watchlist]);

  // Milestone Badges Progress Calculation
  const milestoneProgressList = useMemo(() => {
    return MILESTONE_BADGES.map((badge) => {
      let currentValue = 0;
      switch (badge.requiredType) {
        case 'episodes':
          currentValue = stats.totalEpisodes;
          break;
        case 'hours':
          currentValue = stats.totalHours;
          break;
        case 'shows':
          currentValue = stats.totalCount;
          break;
        case 'anime':
          currentValue = stats.animeCount;
          break;
        case 'completed':
          currentValue = completedCount;
          break;
      }
      const isUnlocked = currentValue >= badge.targetValue;
      const progressPct = Math.min(100, Math.round((currentValue / badge.targetValue) * 100));
      return {
        ...badge,
        currentValue,
        isUnlocked,
        progressPct,
      };
    });
  }, [stats, completedCount]);

  const unlockedMilestonesCount = milestoneProgressList.filter((m) => m.isUnlocked).length;

  const handlePressMilestone = (badge: MilestoneBadge & { currentValue: number; isUnlocked: boolean; progressPct: number }) => {
    hapticLight();
    Alert.alert(
      badge.title,
      `${badge.description}\n\n• Target: ${badge.targetValue} ${badge.requiredType}\n• Current Progress: ${badge.currentValue} (${badge.progressPct}%)\n• Status: ${badge.isUnlocked ? 'Unlocked 🎉' : 'In Progress ⏳'}`
    );
  };

  // Settings Handlers
  const handleOpenExport = () => {
    hapticMedium();
    const data = exportData();
    setExportedJsonText(data);
    setShowExportModal(true);
  };

  const handleOpenImport = () => {
    hapticLight();
    setImportJsonText('');
    setShowImportModal(true);
  };

  const handleExecuteImport = () => {
    if (!importJsonText.trim()) {
      Alert.alert('Error', 'Please enter backup JSON data.');
      return;
    }
    const success = importData(importJsonText.trim());
    if (success) {
      hapticSuccess();
      setShowImportModal(false);
      setImportJsonText('');
      Alert.alert('Success', 'Watchlist and settings restored successfully!');
    } else {
      Alert.alert('Error', 'Invalid backup format. Please verify the JSON string.');
    }
  };

  const handleResetSampleData = () => {
    hapticMedium();
    Alert.alert(
      'Restore Sample Catalog',
      'This will reset your watchlist, preferences, and profile back to sample initial data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          style: 'destructive',
          onPress: () => {
            resetToSampleData();
            hapticSuccess();
            Alert.alert('Reset Complete', 'Default catalog and sample watchlist restored.');
          },
        },
      ]
    );
  };

  const handleClearWatchlist = () => {
    hapticMedium();
    Alert.alert(
      'Clear Watchlist',
      'Are you sure you want to remove all shows from your watchlist? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearWatchlist();
            hapticSuccess();
            Alert.alert('Cleared', 'Your watchlist has been cleared.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Title Header */}
      <View style={styles.titleBar}>
        <Text style={styles.pageTitle}>PROFILE</Text>
        <TouchableOpacity
          style={styles.closeOverlayBtn}
          onPress={() => {
            hapticLight();
            setActiveOverlay(null);
          }}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Close Profile"
        >
          <Feather name="x" size={20} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Hero Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: userProfile.avatarUrl }}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={13} color="#10B981" strokeWidth={3} />
            </View>
          </View>

          {/* User Name & Handle */}
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userHandle}>@{userProfile.handle || 'johndoe'}</Text>

          {/* Member Since Badge */}
          {userProfile.joinDate && (
            <View style={styles.joinDateBadge}>
              <Feather name="calendar" size={11} color={COLORS.primaryDark} />
              <Text style={styles.joinDateText}>MEMBER SINCE {userProfile.joinDate.toUpperCase()}</Text>
            </View>
          )}

          {/* User Bio Quote */}
          {userProfile.bio ? (
            <Text style={styles.userBio}>"{userProfile.bio}"</Text>
          ) : null}

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleOpenEdit}
            activeOpacity={0.75}
          >
            <Feather name="edit-2" size={13} color={COLORS.darkGreen} />
            <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>

        {/* User Information Table (4 Rows with Solid Dark Green Borders - Figma Screen 11) */}
        <View style={styles.infoTable}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Name : {userProfile.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Birthday : {userProfile.birthday}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Gender : {userProfile.gender}</Text>
          </View>
          <View style={[styles.infoRow, styles.lastRow]}>
            <Text style={styles.infoText}>eMail : {userProfile.email}</Text>
          </View>
        </View>

        {/* 3x3 Watch Statistics Grid (Figma Screen 11) */}
        <View style={styles.statsGrid}>
          {/* Row 1: Anime */}
          <View style={styles.statsRow}>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{String(stats.animeCount).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>No. of Anime</Text>
            </View>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.animeHours}</Text>
              <Text style={styles.statLabel}>Anime Hours</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statNumber}>{stats.animeEpisodes}</Text>
              <Text style={styles.statLabel}>Anime Episodes</Text>
            </View>
          </View>

          {/* Row 2: TV */}
          <View style={styles.statsRow}>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{String(stats.tvCount).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>No. of TV</Text>
            </View>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.tvHours}</Text>
              <Text style={styles.statLabel}>TV Hours</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statNumber}>{stats.tvEpisodes}</Text>
              <Text style={styles.statLabel}>TV Episodes</Text>
            </View>
          </View>

          {/* Row 3: Total */}
          <View style={[styles.statsRow, styles.lastStatsRow]}>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.totalCount}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.totalHours}</Text>
              <Text style={styles.statLabel}>Total Hours</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statNumber}>{stats.totalEpisodes}</Text>
              <Text style={styles.statLabel}>Total Episodes</Text>
            </View>
          </View>
        </View>

        {/* Section Tabs: Deep Analytics, Milestones & Settings */}
        <View style={styles.sectionTabsRow}>
          <TouchableOpacity
            style={[styles.sectionTab, activeSectionTab === 'analytics' && styles.sectionTabActive]}
            onPress={() => {
              hapticLight();
              setActiveSectionTab('analytics');
            }}
            activeOpacity={0.75}
          >
            <Feather 
              name="bar-chart-2" 
              size={13} 
              color={activeSectionTab === 'analytics' ? '#FFFFFF' : COLORS.darkGreen} 
            />
            <Text style={[styles.sectionTabText, activeSectionTab === 'analytics' && styles.sectionTabTextActive]}>
              ANALYTICS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sectionTab, activeSectionTab === 'milestones' && styles.sectionTabActive]}
            onPress={() => {
              hapticLight();
              setActiveSectionTab('milestones');
            }}
            activeOpacity={0.75}
          >
            <Feather 
              name="award" 
              size={13} 
              color={activeSectionTab === 'milestones' ? '#FFFFFF' : COLORS.darkGreen} 
            />
            <Text style={[styles.sectionTabText, activeSectionTab === 'milestones' && styles.sectionTabTextActive]}>
              BADGES ({unlockedMilestonesCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sectionTab, activeSectionTab === 'settings' && styles.sectionTabActive]}
            onPress={() => {
              hapticLight();
              setActiveSectionTab('settings');
            }}
            activeOpacity={0.75}
          >
            <Feather 
              name="settings" 
              size={13} 
              color={activeSectionTab === 'settings' ? '#FFFFFF' : COLORS.darkGreen} 
            />
            <Text style={[styles.sectionTabText, activeSectionTab === 'settings' && styles.sectionTabTextActive]}>
              SETTINGS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Deep Analytics */}
        {activeSectionTab === 'analytics' && (
          <View style={styles.tabContentContainer}>
            {/* Watchlist Status Distribution */}
            <View style={styles.analyticsCard}>
              <Text style={styles.cardHeaderTitle}>STATUS DISTRIBUTION</Text>
              
              {/* Segmented Progress Bar */}
              <View style={styles.statusBarTrack}>
                {completedCount > 0 && (
                  <View style={[styles.statusBarSegment, { flex: completedCount, backgroundColor: '#10B981' }]} />
                )}
                {watchingCount > 0 && (
                  <View style={[styles.statusBarSegment, { flex: watchingCount, backgroundColor: COLORS.primary }]} />
                )}
                {planningCount > 0 && (
                  <View style={[styles.statusBarSegment, { flex: planningCount, backgroundColor: '#F59E0B' }]} />
                )}
              </View>

              {/* Status Legend */}
              <View style={styles.statusLegendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.legendText}>Completed: {completedCount} ({completedPct}%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>Watching: {watchingCount} ({watchingPct}%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.legendText}>Planning: {planningCount} ({planningPct}%)</Text>
                </View>
              </View>
            </View>

            {/* Top Genres Breakdown */}
            <View style={styles.analyticsCard}>
              <Text style={styles.cardHeaderTitle}>TOP GENRES IN WATCHLIST</Text>
              {genreDistribution.length === 0 ? (
                <Text style={styles.emptyCardText}>No show genres found yet.</Text>
              ) : (
                genreDistribution.map((item) => (
                  <View key={item.genre} style={styles.genreRow}>
                    <View style={styles.genreInfo}>
                      <Text style={styles.genreName}>{item.genre}</Text>
                      <Text style={styles.genreCountBadge}>{item.count} shows</Text>
                    </View>
                    <View style={styles.genreBarWrapper}>
                      <View style={styles.genreBarTrack}>
                        <View style={[styles.genreBarFill, { width: `${item.pct}%` }]} />
                      </View>
                      <Text style={styles.genrePctText}>{item.pct}%</Text>
                    </View>
                  </View>
                ))
              )}
            </View>

            {/* Quick Efficiency Metrics */}
            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>{completedPct}%</Text>
                <Text style={styles.metricLabel}>Completion</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>
                  {(stats.totalEpisodes / (stats.totalCount || 1)).toFixed(1)}
                </Text>
                <Text style={styles.metricLabel}>Avg Ep/Show</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>
                  {(stats.totalHours / 24).toFixed(1)}d
                </Text>
                <Text style={styles.metricLabel}>Watch Days</Text>
              </View>
            </View>
          </View>
        )}

        {/* Tab 2: Milestone Badges */}
        {activeSectionTab === 'milestones' && (
          <View style={styles.tabContentContainer}>
            <View style={styles.milestonesGrid}>
              {milestoneProgressList.map((badge) => (
                <TouchableOpacity
                  key={badge.id}
                  style={[styles.badgeCard, badge.isUnlocked ? styles.badgeCardUnlocked : styles.badgeCardLocked]}
                  onPress={() => handlePressMilestone(badge)}
                  activeOpacity={0.8}
                >
                  <View style={styles.badgeHeaderRow}>
                    <View style={[styles.badgeIconBox, badge.isUnlocked ? styles.badgeIconUnlocked : styles.badgeIconLocked]}>
                      <Feather 
                        name={badge.icon as any} 
                        size={18} 
                        color={badge.isUnlocked ? '#FFFFFF' : COLORS.textMuted} 
                      />
                    </View>
                    <View style={[styles.badgeStatusPill, badge.isUnlocked ? styles.badgePillUnlocked : styles.badgePillLocked]}>
                      <Text style={[styles.badgeStatusText, badge.isUnlocked ? styles.badgeStatusTextUnlocked : styles.badgeStatusTextLocked]}>
                        {badge.isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.badgeTitle} numberOfLines={1}>
                    {badge.title}
                  </Text>
                  <Text style={styles.badgeDescription} numberOfLines={2}>
                    {badge.description}
                  </Text>

                  {/* Progress bar */}
                  <View style={styles.badgeProgressWrapper}>
                    <View style={styles.badgeProgressTrack}>
                      <View style={[styles.badgeProgressFill, { width: `${badge.progressPct}%` }]} />
                    </View>
                    <Text style={styles.badgeProgressText}>
                      {badge.currentValue} / {badge.targetValue}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Tab 3: Settings Suite */}
        {activeSectionTab === 'settings' && (
          <View style={styles.tabContentContainer}>
            {/* Preferences Group */}
            <View style={styles.settingsGroupCard}>
              <Text style={styles.settingsGroupTitle}>APP PREFERENCES</Text>

              {/* Haptic Feedback Toggle */}
              <View style={styles.settingsItemRow}>
                <View style={styles.settingsItemInfo}>
                  <Text style={styles.settingsItemLabel}>Haptic Feedback</Text>
                  <Text style={styles.settingsItemSubtext}>Tactile vibrations on button clicks</Text>
                </View>
                <Switch
                  value={settings.hapticsEnabled}
                  onValueChange={(val) => {
                    hapticLight();
                    updateSettings({ hapticsEnabled: val });
                  }}
                  trackColor={{ false: '#E2E8F0', true: COLORS.primaryDark }}
                  thumbColor={settings.hapticsEnabled ? '#FFFFFF' : '#CBD5E1'}
                />
              </View>

              {/* Streaming Region */}
              <TouchableOpacity
                style={styles.settingsItemRow}
                onPress={() => {
                  hapticLight();
                  setShowRegionModal(true);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.settingsItemInfo}>
                  <Text style={styles.settingsItemLabel}>Preferred Streaming Region</Text>
                  <Text style={styles.settingsItemSubtext}>Release calendars and availability source</Text>
                </View>
                <View style={styles.regionBadge}>
                  <Text style={styles.regionBadgeText}>{settings.streamingRegion}</Text>
                  <Feather name="chevron-down" size={14} color={COLORS.primaryDark} />
                </View>
              </TouchableOpacity>

              {/* Auto Next Episode */}
              <View style={[styles.settingsItemRow, styles.lastSettingsItem]}>
                <View style={styles.settingsItemInfo}>
                  <Text style={styles.settingsItemLabel}>Auto-Next Episode</Text>
                  <Text style={styles.settingsItemSubtext}>Advance episodes when completing series</Text>
                </View>
                <Switch
                  value={settings.autoNextEpisode}
                  onValueChange={(val) => {
                    hapticLight();
                    updateSettings({ autoNextEpisode: val });
                  }}
                  trackColor={{ false: '#E2E8F0', true: COLORS.primaryDark }}
                  thumbColor={settings.autoNextEpisode ? '#FFFFFF' : '#CBD5E1'}
                />
              </View>
            </View>

            {/* Data & Storage Management Group */}
            <View style={styles.settingsGroupCard}>
              <Text style={styles.settingsGroupTitle}>DATA & BACKUP</Text>

              {/* Export Backup */}
              <TouchableOpacity
                style={styles.settingsActionRow}
                onPress={handleOpenExport}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrapper}>
                  <Feather name="download" size={16} color={COLORS.darkGreen} />
                </View>
                <View style={styles.actionTextWrapper}>
                  <Text style={styles.actionTitle}>Export Watchlist Backup</Text>
                  <Text style={styles.actionSubtext}>Save JSON backup to clipboard or storage</Text>
                </View>
                <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>

              {/* Import Backup */}
              <TouchableOpacity
                style={styles.settingsActionRow}
                onPress={handleOpenImport}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrapper}>
                  <Feather name="upload" size={16} color={COLORS.darkGreen} />
                </View>
                <View style={styles.actionTextWrapper}>
                  <Text style={styles.actionTitle}>Import Watchlist Backup</Text>
                  <Text style={styles.actionSubtext}>Restore watchlist & stats from JSON</Text>
                </View>
                <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>

              {/* Reset to Default */}
              <TouchableOpacity
                style={styles.settingsActionRow}
                onPress={handleResetSampleData}
                activeOpacity={0.7}
              >
                <View style={styles.actionIconWrapper}>
                  <Feather name="refresh-cw" size={16} color={COLORS.darkGreen} />
                </View>
                <View style={styles.actionTextWrapper}>
                  <Text style={styles.actionTitle}>Restore Default Catalog</Text>
                  <Text style={styles.actionSubtext}>Reset to default sample shows & cast</Text>
                </View>
                <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>

              {/* Clear Watchlist */}
              <TouchableOpacity
                style={[styles.settingsActionRow, styles.lastSettingsItem]}
                onPress={handleClearWatchlist}
                activeOpacity={0.7}
              >
                <View style={[styles.actionIconWrapper, { backgroundColor: '#FEE2E2' }]}>
                  <Feather name="trash-2" size={16} color="#DC2626" />
                </View>
                <View style={styles.actionTextWrapper}>
                  <Text style={[styles.actionTitle, { color: '#DC2626' }]}>Clear All Watchlist Data</Text>
                  <Text style={styles.actionSubtext}>Wipe watch history and tracking progress</Text>
                </View>
                <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            {/* About Episoda Group */}
            <View style={styles.settingsGroupCard}>
              <Text style={styles.settingsGroupTitle}>ABOUT EPISODA</Text>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Version</Text>
                <Text style={styles.aboutValue}>1.0.0 (Expo SDK 54)</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Architecture</Text>
                <Text style={styles.aboutValue}>React Native 0.81.5 • Hermes</Text>
              </View>
              <View style={[styles.aboutRow, styles.lastSettingsItem]}>
                <Text style={styles.aboutLabel}>Design System</Text>
                <Text style={styles.aboutValue}>Neobrutalist Anime & TV</Text>
              </View>
            </View>
          </View>
        )}

        {/* Logout Option */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={16} color={COLORS.darkGreen} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Advanced Edit Profile Modal */}
      <Modal 
        visible={isEditing} 
        transparent 
        animationType="slide"
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>EDIT PROFILE</Text>
              <TouchableOpacity
                onPress={() => {
                  hapticLight();
                  setIsEditing(false);
                }}
                style={styles.modalCloseBtn}
                accessibilityLabel="Close modal"
              >
                <Feather name="x" size={20} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* Preset Avatar Selection */}
              <Text style={styles.sectionSubtitle}>CHOOSE AVATAR PRESET</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.presetsScroll}
                style={styles.presetsContainer}
              >
                {AVATAR_PRESETS.map((preset) => {
                  const isSelected = editAvatarUrl === preset.url;
                  return (
                    <TouchableOpacity
                      key={preset.id}
                      style={[
                        styles.presetCard,
                        isSelected && styles.presetCardSelected,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setEditAvatarUrl(preset.url);
                      }}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: preset.url }} style={styles.presetImage} />
                      {isSelected && (
                        <View style={styles.presetCheckOverlay}>
                          <Feather name="check" size={13} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                      <Text style={[styles.presetName, isSelected && styles.presetNameSelected]} numberOfLines={1}>
                        {preset.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Custom Image URL */}
              <Text style={styles.inputLabel}>Custom Avatar URL (Optional)</Text>
              <TextInput
                style={styles.modalInput}
                value={editAvatarUrl}
                onChangeText={setEditAvatarUrl}
                placeholder="https://..."
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Display Name */}
              <Text style={styles.inputLabel}>Display Name</Text>
              <TextInput
                style={styles.modalInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Your full display name"
                placeholderTextColor={COLORS.textMuted}
              />

              {/* Handle */}
              <Text style={styles.inputLabel}>Handle</Text>
              <View style={styles.handleInputRow}>
                <Text style={styles.handlePrefix}>@</Text>
                <TextInput
                  style={styles.handleInput}
                  value={editHandle}
                  onChangeText={setEditHandle}
                  placeholder="username"
                  placeholderTextColor={COLORS.textMuted}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Bio / Tagline */}
              <Text style={styles.inputLabel}>Bio / Tagline</Text>
              <TextInput
                style={[styles.modalInput, styles.bioInput]}
                value={editBio}
                onChangeText={setEditBio}
                placeholder="Favorite anime, genres, or motto..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={3}
                maxLength={140}
              />

              {/* Birthday */}
              <Text style={styles.inputLabel}>Birthday</Text>
              <TextInput
                style={styles.modalInput}
                value={editBirthday}
                onChangeText={setEditBirthday}
                placeholder="01 Jan 2001"
                placeholderTextColor={COLORS.textMuted}
              />

              {/* Gender */}
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={styles.modalInput}
                value={editGender}
                onChangeText={setEditGender}
                placeholder="Male / Female / Other"
                placeholderTextColor={COLORS.textMuted}
              />

              {/* Email */}
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.modalInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="you@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Button Actions */}
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnCancel]}
                  onPress={() => {
                    hapticLight();
                    setIsEditing(false);
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={styles.modalBtnTextCancel}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnSave]}
                  onPress={handleSaveProfile}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalBtnTextSave}>SAVE CHANGES</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Export Backup Modal */}
      <Modal
        visible={showExportModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExportModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>BACKUP DATA</Text>
              <TouchableOpacity
                onPress={() => setShowExportModal(false)}
                style={styles.modalCloseBtn}
              >
                <Feather name="x" size={20} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            <Text style={styles.exportModalDesc}>
              Select and copy the JSON string below to save or transfer your profile and watchlist:
            </Text>

            <TextInput
              style={styles.exportTextInput}
              value={exportedJsonText}
              multiline
              editable={false}
              selectTextOnFocus
            />

            <TouchableOpacity
              style={[styles.modalBtn, styles.modalBtnSave, { marginTop: 12 }]}
              onPress={() => {
                hapticLight();
                setShowExportModal(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.modalBtnTextSave}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Import Backup Modal */}
      <Modal
        visible={showImportModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImportModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>RESTORE BACKUP</Text>
              <TouchableOpacity
                onPress={() => setShowImportModal(false)}
                style={styles.modalCloseBtn}
              >
                <Feather name="x" size={20} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            <Text style={styles.exportModalDesc}>
              Paste your exported JSON backup string below:
            </Text>

            <TextInput
              style={[styles.exportTextInput, { height: 160 }]}
              value={importJsonText}
              onChangeText={setImportJsonText}
              multiline
              placeholder="Paste JSON here..."
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => setShowImportModal(false)}
                activeOpacity={0.75}
              >
                <Text style={styles.modalBtnTextCancel}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnSave]}
                onPress={handleExecuteImport}
                activeOpacity={0.8}
              >
                <Text style={styles.modalBtnTextSave}>RESTORE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Streaming Region Selection Modal */}
      <Modal
        visible={showRegionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRegionModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowRegionModal(false)}
        >
          <View style={[styles.modalContent, { maxHeight: 340 }]}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>SELECT REGION</Text>
              <TouchableOpacity
                onPress={() => setShowRegionModal(false)}
                style={styles.modalCloseBtn}
              >
                <Feather name="x" size={20} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            {REGION_OPTIONS.map((region) => {
              const isCurrent = settings.streamingRegion === region;
              return (
                <TouchableOpacity
                  key={region}
                  style={[styles.regionOptionRow, isCurrent && styles.regionOptionRowActive]}
                  onPress={() => {
                    hapticLight();
                    updateSettings({ streamingRegion: region });
                    setShowRegionModal(false);
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.regionOptionText, isCurrent && styles.regionOptionTextActive]}>
                    {region}
                  </Text>
                  {isCurrent && <Feather name="check" size={18} color={COLORS.primaryDark} strokeWidth={3} />}
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
  titleBar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 4,
  },
  closeOverlayBtn: {
    position: 'absolute',
    right: 18,
    top: 12,
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarBorder: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    padding: 3,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.darkGreen,
    textAlign: 'center',
    marginBottom: 2,
  },
  userHandle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primaryDark,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  joinDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.none,
    gap: 5,
    marginBottom: 8,
  },
  joinDateText: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  userBio: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.none,
  },
  editProfileButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: COLORS.darkGreen,
    letterSpacing: 1,
  },
  infoTable: {
    marginHorizontal: 20,
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.none,
    marginBottom: 24,
  },
  infoRow: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: BORDERS.dark,
    borderBottomColor: COLORS.darkGreen,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  infoText: {
    fontFamily: FONTS.medium,
    fontSize: 14.5,
    color: COLORS.darkGreen,
  },
  statsGrid: {
    marginHorizontal: 20,
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.none,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    borderBottomWidth: BORDERS.dark,
    borderBottomColor: COLORS.darkGreen,
  },
  lastStatsRow: {
    borderBottomWidth: 0,
  },
  statCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderRight: {
    borderRightWidth: BORDERS.dark,
    borderRightColor: COLORS.darkGreen,
  },
  statNumber: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.darkGreen,
    textAlign: 'center',
  },
  sectionTabsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
  },
  sectionTabActive: {
    backgroundColor: COLORS.darkGreen,
    borderColor: COLORS.darkGreen,
  },
  sectionTabText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  sectionTabTextActive: {
    color: '#FFFFFF',
  },
  tabContentContainer: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
  analyticsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    borderRadius: RADIUS.none,
    padding: 14,
    marginBottom: 14,
  },
  cardHeaderTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  statusBarTrack: {
    height: 12,
    backgroundColor: '#E2E8F0',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: RADIUS.none,
    marginBottom: 10,
  },
  statusBarSegment: {
    height: '100%',
  },
  statusLegendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textPrimary,
  },
  emptyCardText: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  genreRow: {
    marginBottom: 10,
  },
  genreInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  genreName: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
  },
  genreCountBadge: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.textMuted,
  },
  genreBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  genreBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: RADIUS.none,
    overflow: 'hidden',
  },
  genreBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  genrePctText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.primaryDark,
    width: 32,
    textAlign: 'right',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: RADIUS.none,
  },
  metricNumber: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  metricLabel: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    color: COLORS.darkGreen,
  },
  milestonesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    padding: 12,
    borderRadius: RADIUS.none,
  },
  badgeCardUnlocked: {
    borderColor: COLORS.primary,
  },
  badgeCardLocked: {
    borderColor: 'rgba(13, 56, 49, 0.2)',
    opacity: 0.85,
  },
  badgeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badgeIconBox: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.none,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconUnlocked: {
    backgroundColor: COLORS.primaryDark,
  },
  badgeIconLocked: {
    backgroundColor: '#E2E8F0',
  },
  badgeStatusPill: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  badgePillUnlocked: {
    backgroundColor: '#DCFCE7',
  },
  badgePillLocked: {
    backgroundColor: '#F1F5F9',
  },
  badgeStatusText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  badgeStatusTextUnlocked: {
    color: '#15803D',
  },
  badgeStatusTextLocked: {
    color: '#64748B',
  },
  badgeTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    marginBottom: 3,
  },
  badgeDescription: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    color: COLORS.textMuted,
    lineHeight: 14,
    height: 28,
    marginBottom: 8,
  },
  badgeProgressWrapper: {
    marginTop: 'auto',
  },
  badgeProgressTrack: {
    height: 5,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    borderRadius: RADIUS.none,
    marginBottom: 4,
  },
  badgeProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  badgeProgressText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.darkGreen,
    textAlign: 'right',
  },
  settingsGroupCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    borderRadius: RADIUS.none,
    padding: 14,
    marginBottom: 14,
  },
  settingsGroupTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  settingsItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 56, 49, 0.1)',
  },
  lastSettingsItem: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  settingsItemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  settingsItemLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 13.5,
    color: COLORS.darkGreen,
    marginBottom: 2,
  },
  settingsItemSubtext: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.textMuted,
  },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: RADIUS.none,
    backgroundColor: '#F0FDF9',
  },
  regionBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.primaryDark,
  },
  settingsActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 56, 49, 0.1)',
  },
  actionIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: '#E8F8F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderRadius: RADIUS.none,
  },
  actionTextWrapper: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  actionSubtext: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    color: COLORS.textMuted,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 56, 49, 0.1)',
  },
  aboutLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.darkGreen,
  },
  aboutValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    color: COLORS.primaryDark,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 18,
    paddingVertical: 8,
  },
  logoutText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
    textDecorationLine: 'underline',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  modalContent: {
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.none,
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    padding: 18,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.darkGreen,
    paddingBottom: 10,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScrollContent: {
    paddingBottom: 16,
  },
  sectionSubtitle: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: COLORS.primaryDark,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  presetsContainer: {
    marginBottom: 14,
  },
  presetsScroll: {
    gap: 10,
    paddingVertical: 4,
  },
  presetCard: {
    width: 68,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    padding: 4,
    backgroundColor: '#F8FAF9',
  },
  presetCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: '#E8F8F5',
  },
  presetImage: {
    width: 56,
    height: 56,
    marginBottom: 4,
  },
  presetCheckOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.primaryDark,
    padding: 2,
    borderRadius: 2,
  },
  presetName: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.darkGreen,
    textAlign: 'center',
  },
  presetNameSelected: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
  },
  inputLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.darkGreen,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  modalInput: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    color: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
  },
  handleInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  handlePrefix: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primaryDark,
    paddingLeft: 10,
    paddingRight: 2,
  },
  handleInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 8,
    color: COLORS.darkGreen,
  },
  bioInput: {
    height: 64,
    textAlignVertical: 'top',
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.none,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnCancel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
  },
  modalBtnSave: {
    backgroundColor: COLORS.primaryDark,
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
  },
  modalBtnTextCancel: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    letterSpacing: 1,
  },
  modalBtnTextSave: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  exportModalDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 12,
  },
  exportTextInput: {
    height: 180,
    backgroundColor: '#F8FAF9',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
    padding: 10,
    fontFamily: 'monospace',
    fontSize: 11,
    color: COLORS.darkGreen,
    textAlignVertical: 'top',
  },
  regionOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 56, 49, 0.1)',
  },
  regionOptionRowActive: {
    backgroundColor: '#E8F8F5',
  },
  regionOptionText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  regionOptionTextActive: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
  },
});
