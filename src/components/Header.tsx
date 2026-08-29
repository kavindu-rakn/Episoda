import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { EpisodaLogo } from './EpisodaLogo';
import { COLORS } from '../constants/theme';

export const Header: React.FC = () => {
  const { setActiveOverlay, unreadCount } = useApp();

  return (
    <View style={styles.header}>
      {/* Profile / Avatar Button (Torii Gate Icon) */}
      <TouchableOpacity
        style={styles.avatarButton}
        onPress={() => setActiveOverlay('profile')}
        activeOpacity={0.7}
        accessibilityLabel="Open Profile"
      >
        <Svg width={36} height={36} viewBox="0 0 40 40">
          <Circle cx="20" cy="20" r="18" stroke={COLORS.darkGreen} strokeWidth="2" fill="#E8F5E9" />
          {/* Torii Gate Symbol */}
          <Path d="M 10 14 L 30 14" stroke={COLORS.darkGreen} strokeWidth="2.5" strokeLinecap="round" />
          <Path d="M 12 18 L 28 18" stroke={COLORS.darkGreen} strokeWidth="2" strokeLinecap="round" />
          <Path d="M 15 14 L 15 28" stroke={COLORS.darkGreen} strokeWidth="2.5" strokeLinecap="round" />
          <Path d="M 25 14 L 25 28" stroke={COLORS.darkGreen} strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* Center Brand Logo */}
      <View style={styles.logoContainer}>
        <EpisodaLogo size="small" />
      </View>

      {/* Notification Bell Button */}
      <TouchableOpacity
        style={styles.notifButton}
        onPress={() => setActiveOverlay('notifications')}
        activeOpacity={0.7}
        accessibilityLabel="Open Notifications"
      >
        <Feather name="bell" size={24} color={COLORS.darkGreen} />
        {unreadCount > 0 && <View style={styles.badge} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.darkGreen,
  },
  avatarButton: {
    padding: 4,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifButton: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 3,
    right: 4,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
});
