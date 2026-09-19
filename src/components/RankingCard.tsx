import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { RankingItem } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';

import { TouchableOpacity } from 'react-native';

interface RankingCardProps {
  item: RankingItem;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;

export const RankingCard: React.FC<RankingCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={!onPress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Crisp Sharp Teal Border */}
        <View style={styles.borderOverlay} />

        {/* Glowing Rank Badge (#1, #2, etc.) in Top-Left */}
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{item.rank}</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {item.shortTitle}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0F2620',
    borderRadius: RADIUS.none,
  },
  image: {
    width: '100%',
    height: '100%',
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
  rankBadge: {
    position: 'absolute',
    top: 3,
    left: 4,
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  rankText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.rankCyan,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.darkGreen,
    marginTop: 5,
    textAlign: 'center',
  },
});

