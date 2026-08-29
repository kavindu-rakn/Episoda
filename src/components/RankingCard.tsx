import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { RankingItem } from '../types';
import { COLORS, FONTS } from '../constants/theme';

interface RankingCardProps {
  item: RankingItem;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 3;

export const RankingCard: React.FC<RankingCardProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Crisp Teal Border */}
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
    </View>
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
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  rankBadge: {
    position: 'absolute',
    top: 3,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  rankText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#00F5D4',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
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
