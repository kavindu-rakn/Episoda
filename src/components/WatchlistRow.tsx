import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WatchlistItem } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticSuccess } from '../utils/haptics';

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
  const isInfinity =
    item.totalEpisodes === '∞' ||
    (typeof item.totalEpisodes === 'number' && item.totalEpisodes >= 999);
  const displayTotal = isInfinity ? '∞' : item.totalEpisodes;

  const handlePlus = () => {
    if (
      typeof item.totalEpisodes === 'number' &&
      item.totalEpisodes > 0 &&
      item.watchedEpisodes + 1 >= item.totalEpisodes
    ) {
      hapticSuccess();
    } else {
      hapticLight();
    }
    onIncrement();
  };

  const handleMinus = () => {
    hapticLight();
    onDecrement();
  };


  return (
    <View style={styles.card}>
      {/* Left Thumbnail (Sharp square) */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.thumbWrapper}>
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Middle Title */}
      <TouchableOpacity
        style={styles.titleWrapper}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Stepper Buttons (- / +) */}
      <View style={styles.stepperContainer}>
        <TouchableOpacity
          style={[styles.stepButton, item.watchedEpisodes <= 0 && styles.stepButtonDisabled]}
          onPress={handleMinus}
          activeOpacity={0.7}
          disabled={item.watchedEpisodes <= 0}
          accessibilityLabel="Decrement episode"
        >
          <Feather
            name="minus"
            size={13}
            color={item.watchedEpisodes > 0 ? COLORS.darkGreen : COLORS.textMuted}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.stepButton, styles.stepButtonPlus]}
          onPress={handlePlus}
          activeOpacity={0.7}
          accessibilityLabel="Increment episode"
        >
          <Feather name="plus" size={13} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Rigid Column: Episode Progress (e.g. 780/∞ or 3/8) */}
      <View style={styles.progressColumn}>
        <Text style={styles.progressText}>
          {item.watchedEpisodes}/{displayTotal}
        </Text>
      </View>

      {/* Rigid Column: Media Type Badge (Anime, TV, ONA) */}
      <View style={styles.typeColumn}>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    height: 60,
  },
  thumbWrapper: {
    width: 44,
    height: 44,
    backgroundColor: '#0F2620',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 6,
  },
  stepButton: {
    width: 24,
    height: 24,
    borderRadius: RADIUS.none,
    borderWidth: 1.2,
    borderColor: COLORS.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  stepButtonDisabled: {
    borderColor: '#D1E7DD',
    backgroundColor: '#F8FAFC',
  },
  stepButtonPlus: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  progressColumn: {
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
    letterSpacing: 0.2,
  },
  typeColumn: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  typeText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
});
