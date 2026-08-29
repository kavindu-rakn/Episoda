import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Ellipse, Rect } from 'react-native-svg';
import { COLORS, FONTS } from '../constants/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showSubtitle?: boolean;
}

export const EpisodaLogo: React.FC<LogoProps> = ({ size = 'medium', showSubtitle = false }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconWidth = isSmall ? 32 : isLarge ? 80 : 54;
  const iconHeight = isSmall ? 28 : isLarge ? 70 : 48;
  const fontSize = isSmall ? 18 : isLarge ? 34 : 26;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Tilted Soda Can Vector */}
        <Svg width={iconWidth} height={iconHeight} viewBox="0 0 60 50" fill="none">
          {/* Outer Can Outline */}
          <Path
            d="M 18 12 C 18 6 36 2 46 8 C 52 12 52 18 50 24 L 28 42 C 22 46 12 44 8 38 C 4 32 8 20 18 12 Z"
            stroke={COLORS.darkGreen}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Can Top Ring / Lid */}
          <Ellipse
            cx="38"
            cy="12"
            rx="10"
            ry="6"
            stroke={COLORS.darkGreen}
            strokeWidth="3.5"
            fill="none"
            transform="rotate(-25 38 12)"
          />
          {/* Pull Tab / Hole */}
          <Ellipse
            cx="38"
            cy="11"
            rx="3"
            ry="2"
            fill={COLORS.darkGreen}
            transform="rotate(-25 38 11)"
          />
          {/* Wave Stripe on Can */}
          <Path
            d="M 10 32 C 18 28 26 36 38 28 C 44 24 48 22 50 24"
            stroke={COLORS.darkGreen}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </Svg>

        <Text style={[styles.title, { fontSize }]}>
          EPISODA
        </Text>
      </View>

      {showSubtitle && (
        <Text style={styles.subtitle}>
          TV Series & Anime Tracker
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.darkGreen,
    letterSpacing: 3,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginTop: 8,
    letterSpacing: 0.5,
  },
});
