import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Show } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';

interface MediaCardProps {
  show: Show;
  onPress?: () => void;
  showTitle?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

export const MediaCard: React.FC<MediaCardProps> = ({
  show,
  onPress,
  showTitle = false,
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
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.darkGreen,
    marginTop: 6,
    textAlign: 'center',
  },
});

