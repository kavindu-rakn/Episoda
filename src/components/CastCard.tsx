import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CastMember } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';

interface CastCardProps {
  member: CastMember;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 44) / 2;

export const CastCard: React.FC<CastCardProps> = ({ member }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        {/* Left: Character Portrait */}
        <View style={styles.halfImage}>
          <Image
            source={{ uri: member.characterImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Green Checkmark Badge on Character Image */}
          {member.isVerified && (
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={13} color="#10B981" strokeWidth={3} />
            </View>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Right: Voice Actor Portrait */}
        <View style={styles.halfImage}>
          <Image
            source={{ uri: member.actorImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Crisp Sharp Teal Border */}
        <View style={styles.borderOverlay} />
      </View>

      {/* Caption: Character - Actor */}
      <Text style={styles.caption} numberOfLines={1}>
        {member.characterName} - {member.actorName}
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
  imageBox: {
    width: '100%',
    height: CARD_WIDTH * 0.72,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: RADIUS.none,
  },
  halfImage: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: COLORS.primary,
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
    bottom: 3,
    right: 3,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 2,
    padding: 2,
  },
  caption: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    marginTop: 6,
    textAlign: 'center',
  },
});

