import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Show } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';

interface MediaCardProps {
  show: Show;
  onPress?: () => void;
  showTitle?: boolean;
  showRating?: boolean;
  showTypeBadge?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

export const MediaCard: React.FC<MediaCardProps> = ({
  show,
  onPress,
  showTitle = false,
  showRating = false,
  showTypeBadge = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: show.posterUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Media Type Badge */}
        {showTypeBadge && show.type && (
          <View
            style={[
              styles.typeBadge,
              show.type === 'Anime' && styles.typeBadgeAnime,
              show.type === 'TV' && styles.typeBadgeTV,
              show.type === 'ONA' && styles.typeBadgeONA,
            ]}
          >
            <Text
              style={[
                styles.typeBadgeText,
                show.type === 'Anime' && styles.typeBadgeTextAnime,
                show.type === 'TV' && styles.typeBadgeTextTV,
                show.type === 'ONA' && styles.typeBadgeTextONA,
              ]}
            >
              {show.type.toUpperCase()}
            </Text>
          </View>
        )}

        {/* Star Rating Badge */}
        {showRating && typeof show.rating === 'number' && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeStar}>★</Text>
            <Text style={styles.ratingBadgeText}>{show.rating.toFixed(1)}</Text>
          </View>
        )}

        {/* Crisp Sharp Teal Border as in Figma */}
        <View style={styles.borderOverlay} />
      </View>

      {showTitle && (
        <Text style={styles.title} numberOfLines={1}>
          {show.shortTitle || show.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 14,
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.05,
    borderRadius: RADIUS.none,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0F2620',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: RADIUS.none,
    borderWidth: 1,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
  },
  typeBadgeAnime: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  typeBadgeTV: {
    backgroundColor: '#E1F5FE',
    borderColor: '#0277BD',
  },
  typeBadgeONA: {
    backgroundColor: '#FFF3E0',
    borderColor: '#E65100',
  },
  typeBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 8.5,
    color: COLORS.darkGreen,
    letterSpacing: 0.5,
  },
  typeBadgeTextAnime: {
    color: '#1B5E20',
  },
  typeBadgeTextTV: {
    color: '#01579B',
  },
  typeBadgeTextONA: {
    color: '#BF360C',
  },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(13, 56, 49, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: RADIUS.none,
    zIndex: 2,
  },
  ratingBadgeStar: {
    color: '#FFD700',
    fontSize: 9.5,
  },
  ratingBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 9.5,
    color: '#FFFFFF',
    letterSpacing: 0.3,
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
    zIndex: 1,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
    marginTop: 6,
    textAlign: 'center',
  },
});

