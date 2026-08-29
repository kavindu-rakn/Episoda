import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WatchlistItem } from '../types';
import { COLORS, FONTS } from '../constants/theme';

interface WatchlistRowProps {
  item: WatchlistItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onPress?: () => void;
}

export const WatchlistRow: React.FC<WatchlistRowProps> = ({
  item,
  onIncrement,
  onDecrement,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Left Thumbnail */}
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Middle Title */}
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/* Right Episode Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {item.watchedEpisodes}/{item.totalEpisodes}
          </Text>
        </View>

        {/* Far Right Media Type Tag */}
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </TouchableOpacity>

      {/* Quick Stepper Buttons (+ / -) */}
      <View style={styles.stepperContainer}>
        <TouchableOpacity
          style={styles.stepButton}
          onPress={onDecrement}
          activeOpacity={0.7}
          disabled={item.watchedEpisodes <= 0}
        >
          <Feather name="minus" size={14} color={item.watchedEpisodes > 0 ? COLORS.darkGreen : COLORS.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.stepButton, styles.stepButtonPlus]}
          onPress={onIncrement}
          activeOpacity={0.7}
        >
          <Feather name="plus" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: COLORS.darkGreen,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 3,
    backgroundColor: '#E0F2FE',
  },
  title: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  progressContainer: {
    paddingHorizontal: 6,
  },
  progressText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  typeBadge: {
    minWidth: 48,
    alignItems: 'flex-end',
  },
  typeText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 6,
  },
  stepButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  stepButtonPlus: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
});
