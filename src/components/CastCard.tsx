import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Check } from 'lucide-react-native';
import { CastMember } from '../types';
import { COLORS, FONTS } from '../constants/theme';

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
              <Check size={12} color="#10B981" strokeWidth={3.5} />
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

        {/* Crisp Teal Border */}
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
    width: 1,
    height: '100%',
    backgroundColor: COLORS.primary,
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
  verifiedBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
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
