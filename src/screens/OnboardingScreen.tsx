import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, FONTS } from '../constants/theme';

const { width } = Dimensions.get('window');

interface SlideData {
  title: string;
  subtitle: string;
  renderIllustration: () => React.ReactNode;
}

export const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setActiveOverlay } = useApp();

  const slides: SlideData[] = [
    {
      title: 'Browse Most Popular &\nTrending Shows.',
      subtitle: 'Explore the greatness of Cast &\nVoice Actors.',
      renderIllustration: () => (
        <Svg width="220" height="150" viewBox="0 0 220 150">
          <Rect x="50" y="25" width="22" height="90" fill="#E50914" rx="2" />
          <Path d="M 50 25 L 105 115" stroke="#B20710" strokeWidth="22" strokeLinecap="round" />
          <Rect x="90" y="25" width="22" height="90" fill="#E50914" rx="2" />
          <Circle cx="160" cy="50" r="16" fill="#00BFA5" />
          <Rect x="155" y="70" width="10" height="45" fill="#0D3831" rx="4" />
          <Path d="M 20 120 L 200 120" stroke="#0D3831" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      ),
    },
    {
      title: 'Keep Track of Your Favorite TV\nSeries and Anime.',
      subtitle: 'Never Lose Track of Where You\nLeft Off.',
      renderIllustration: () => (
        <Svg width="220" height="150" viewBox="0 0 220 150">
          {/* Card Mockup */}
          <Rect x="20" y="20" width="120" height="100" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <Circle cx="40" cy="40" r="4" fill="#94A3B8" />
          <Rect x="52" y="37" width="70" height="6" rx="3" fill="#00BFA5" />
          <Circle cx="40" cy="70" r="4" fill="#94A3B8" />
          <Rect x="52" y="67" width="40" height="6" rx="3" fill="#00BFA5" />
          <Circle cx="40" cy="100" r="4" fill="#94A3B8" />
          <Rect x="52" y="97" width="55" height="6" rx="3" fill="#00BFA5" />
          {/* Character Figure */}
          <Circle cx="170" cy="45" r="14" fill="#0D3831" />
          <Rect x="160" y="62" width="20" height="35" rx="6" fill="#64748B" />
          <Rect x="162" y="97" width="7" height="30" rx="3" fill="#0D3831" />
          <Rect x="171" y="97" width="7" height="30" rx="3" fill="#0D3831" />
        </Svg>
      ),
    },
    {
      title: 'Create & Manage Your Watchlist for\nMust-Watch Programs.',
      subtitle: 'Organize Your Next Binge-Watching\nSession.',
      renderIllustration: () => (
        <Svg width="220" height="150" viewBox="0 0 220 150">
          {/* Couch */}
          <Rect x="30" y="55" width="140" height="65" rx="14" fill="#1E293B" />
          <Circle cx="45" cy="85" r="12" fill="#0F172A" />
          <Circle cx="155" cy="85" r="12" fill="#0F172A" />
          {/* Person on couch */}
          <Circle cx="100" cy="40" r="14" fill="#F87171" />
          <Rect x="90" y="36" width="20" height="6" fill="#00BFA5" rx="1" />
          <Rect x="85" y="56" width="30" height="35" rx="6" fill="#F1F5F9" />
          {/* Popcorn bucket */}
          <Rect x="90" y="70" width="20" height="22" rx="2" fill="#00BFA5" />
          <Circle cx="95" cy="68" r="4" fill="#FBBF24" />
          <Circle cx="105" cy="68" r="4" fill="#FBBF24" />
          <Circle cx="100" cy="66" r="4" fill="#FDE68A" />
        </Svg>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setActiveOverlay('auth');
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <View style={styles.container}>
      {/* Top Header Row with Optional Back Arrow & Pagination Dots */}
      <View style={styles.topRow}>
        {currentSlide > 0 ? (
          <TouchableOpacity onPress={handlePrev} style={styles.backButton} activeOpacity={0.7}>
            <Feather name="arrow-left" size={24} color={COLORS.darkGreen} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* 3 Pagination Dots */}
        <View style={styles.dotsRow}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlide === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <View style={styles.backPlaceholder} />
      </View>

      {/* Main Illustration Box */}
      <View style={styles.illustrationFrame}>
        {slide.renderIllustration()}
      </View>

      {/* Titles & Descriptions */}
      <View style={styles.textContainer}>
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
      </View>

      {/* Bottom Progress Bar */}
      <View style={styles.bottomBarTrack}>
        <View
          style={[
            styles.bottomBarFill,
            { width: `${((currentSlide + 1) / slides.length) * 100}%` },
          ]}
        />
      </View>

      {/* Button: "Get Started" on last slide, or "Next" / Tap to advance */}
      {currentSlide === slides.length - 1 ? (
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.nextTextButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextText}>Tap to Continue →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backPlaceholder: {
    width: 40,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
  },
  dotActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  dotInactive: {
    backgroundColor: '#FFFFFF',
  },
  illustrationFrame: {
    width: width - 56,
    height: 240,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  slideTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  slideSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomBarTrack: {
    width: '80%',
    height: 4,
    backgroundColor: '#D1E7DD',
    borderRadius: 2,
    overflow: 'hidden',
    marginVertical: 16,
  },
  bottomBarFill: {
    height: '100%',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 2,
  },
  getStartedButton: {
    width: '60%',
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  nextTextButton: {
    paddingVertical: 14,
  },
  nextText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.darkGreen,
  },
});
