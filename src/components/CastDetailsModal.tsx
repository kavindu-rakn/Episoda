import React from 'react';
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
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CastDetailsModal: React.FC = () => {
  const { selectedCastMember, closeCastDetails } = useApp();
  const insets = useSafeAreaInsets();

  if (!selectedCastMember) {
    return null;
  }

  const handleClose = () => {
    hapticLight();
    closeCastDetails();
  };

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

            {/* Character Spotlight Banner */}
            <View style={styles.spotlightCard}>
              <Text style={styles.spotlightLabel}>PORTRAYING / VOICING</Text>
              <Text style={styles.spotlightCharacter}>
                {selectedCastMember.characterName}
                <Text style={styles.spotlightShow}> in {selectedCastMember.showTitle}</Text>
              </Text>
            </View>

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
  spotlightLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    color: COLORS.primaryDark,
    letterSpacing: 1.5,
    marginBottom: 2,
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
    marginBottom: 20,
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
});
