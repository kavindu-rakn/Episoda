import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import Svg, { Path, Rect, Circle, G, Line } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, FONTS } from '../constants/theme';
import { hapticLight, hapticMedium } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  renderIllustration: () => React.ReactNode;
}

export const OnboardingScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { setActiveOverlay } = useApp();
  const insets = useSafeAreaInsets();

  const SLIDES: SlideItem[] = [
    {
      id: 'slide-1',
      title: 'Browse Most Popular &\nTrending Shows.',
      subtitle: 'Explore the greatness of Cast &\nVoice Actors.',
      renderIllustration: () => (
        <Svg width="240" height="170" viewBox="0 0 240 170" fill="none">
          {/* Top sliders / minimal UI elements */}
          <Line x1="70" y1="20" x2="140" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
          <Circle cx="90" cy="20" r="3.5" fill="#00BFA5" />
          
          {/* Right lamp / decor */}
          <Circle cx="165" cy="26" r="4.5" fill="#00BFA5" />
          <Path d="M 175 28 C 175 45 190 45 190 70 C 190 95 175 95 175 115" stroke="#475569" strokeWidth="1.5" />
          <Rect x="168" y="32" width="14" height="18" rx="7" fill="#334155" />
          <Rect x="168" y="55" width="14" height="20" rx="7" fill="#334155" />

          {/* Left Leaf decor */}
          <Path d="M 50 82 C 40 60 55 45 55 45 C 55 45 70 60 60 82 C 55 88 45 88 50 82 Z" fill="#00BFA5" />
          <Line x1="55" y1="48" x2="55" y2="82" stroke="#0D3831" strokeWidth="1" />
          <Circle cx="40" cy="62" r="2.5" stroke="#94A3B8" strokeWidth="1" />
          <Rect x="65" y="52" width="4" height="4" stroke="#94A3B8" strokeWidth="1" />

          {/* Bold Netflix Style 'N' */}
          <Rect x="80" y="32" width="16" height="66" fill="#E50914" />
          <Path d="M 80 32 L 126 98 L 142 98 L 96 32 Z" fill="#B20710" />
          <Rect x="126" y="32" width="16" height="66" fill="#E50914" />

          {/* Girl silhouette sitting on the diagonal of N */}
          <Circle cx="148" cy="46" r="9" fill="#1E293B" />
          {/* Hair */}
          <Path d="M 142 42 C 142 40 156 38 156 48 C 156 55 142 56 142 42 Z" fill="#0F172A" />
          {/* Body */}
          <Path d="M 143 54 L 138 68 L 148 68 L 152 54 Z" fill="#F8FAFC" />
          <Path d="M 143 58 L 136 68" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Legs folded sitting */}
          <Path d="M 138 68 L 128 78 L 140 98" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M 148 68 L 150 88" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />

          {/* Ground reflection shadow lines */}
          <Line x1="38" y1="105" x2="202" y2="105" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <Line x1="56" y1="110" x2="184" y2="110" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          <Line x1="75" y1="114" x2="165" y2="114" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
        </Svg>
      ),
    },
    {
      id: 'slide-2',
      title: 'Keep Track of Your Favorite TV\nSeries and Anime.',
      subtitle: 'Never Lose Track of Where You\nLeft Off.',
      renderIllustration: () => (
        <Svg width="240" height="170" viewBox="0 0 240 170" fill="none">
          {/* Floating Progress List Card */}
          <G>
            <Rect x="42" y="16" width="108" height="120" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            <Circle cx="140" cy="24" r="3" fill="#94A3B8" />
            
            {/* Row 1 */}
            <Rect x="50" y="28" width="92" height="26" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <Circle cx="58" cy="41" r="2.5" fill="#CBD5E1" />
            <Rect x="66" y="38" width="58" height="6" rx="3" fill="#00BFA5" />
            <Rect x="124" y="38" width="12" height="6" rx="3" fill="#E2E8F0" />

            {/* Row 2 */}
            <Rect x="50" y="60" width="92" height="26" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <Circle cx="58" cy="73" r="2.5" fill="#CBD5E1" />
            <Rect x="66" y="70" width="18" height="6" rx="3" fill="#00BFA5" />
            <Rect x="86" y="70" width="16" height="6" rx="3" fill="#E2E8F0" />
            <Circle cx="107" cy="73" r="2.5" fill="#CBD5E1" />
            <Rect x="114" y="70" width="18" height="6" rx="3" fill="#00BFA5" />

            {/* Row 3 */}
            <Rect x="50" y="92" width="92" height="26" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <Circle cx="58" cy="105" r="2.5" fill="#CBD5E1" />
            <Rect x="66" y="102" width="42" height="6" rx="3" fill="#00BFA5" />
            <Rect x="110" y="102" width="28" height="6" rx="3" fill="#E2E8F0" />
          </G>

          {/* Walking Figure */}
          <G>
            {/* Head & Hair */}
            <Circle cx="178" cy="38" r="9" fill="#1E293B" />
            <Path d="M 172 32 C 172 26 190 28 190 38 C 190 46 172 45 172 32 Z" fill="#0F172A" />
            {/* Torso */}
            <Path d="M 172 46 L 164 68 L 184 68 L 184 46 Z" fill="#CBD5E1" />
            {/* Arms */}
            <Path d="M 170 50 L 158 60" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
            <Circle cx="157" cy="61" r="2.5" fill="#E2E8F0" />
            {/* Trousers & Legs in walking motion */}
            <Path d="M 166 68 L 158 106 L 152 110" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M 180 68 L 186 104 L 194 108" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </G>
        </Svg>
      ),
    },
    {
      id: 'slide-3',
      title: 'Create & Manage Your Watchlist for\nMust-Watch Programs.',
      subtitle: 'Organize Your Next Binge-Watching\nSession.',
      renderIllustration: () => (
        <Svg width="240" height="170" viewBox="0 0 240 170" fill="none">
          {/* Standing Lamp on right */}
          <Path d="M 175 40 L 195 40 L 210 65 L 160 65 Z" fill="#00BFA5" />
          <Line x1="185" y1="65" x2="185" y2="135" stroke="#94A3B8" strokeWidth="2" />
          <Circle cx="185" cy="74" r="2" fill="#CBD5E1" />
          <Path d="M 170 135 L 200 135" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

          {/* Comfortable Armchair */}
          <Rect x="55" y="65" width="115" height="60" rx="16" fill="#292F42" />
          <Circle cx="66" cy="94" r="14" fill="#1C2133" />
          <Circle cx="159" cy="94" r="14" fill="#1C2133" />
          {/* Seat cushion accent in teal */}
          <Rect x="75" y="90" width="75" height="12" rx="2" fill="#00BFA5" />

          {/* Person sitting in armchair */}
          {/* Head & 3D Glasses */}
          <Circle cx="112" cy="46" r="10" fill="#FBCFE8" />
          <Path d="M 102 42 C 102 34 122 34 122 42 Z" fill="#1E293B" />
          {/* 3D Glasses */}
          <Rect x="105" y="44" width="7" height="4.5" rx="1" fill="#00BFA5" />
          <Rect x="113" y="44" width="7" height="4.5" rx="1" fill="#EF4444" />
          <Line x1="103" y1="46" x2="122" y2="46" stroke="#0F172A" strokeWidth="1.5" />

          {/* Body with white sweater */}
          <Path d="M 98 56 C 98 56 112 52 126 56 L 132 86 L 92 86 Z" fill="#E2E8F0" />

          {/* Popcorn bucket */}
          <Path d="M 103 72 L 121 72 L 118 94 L 106 94 Z" fill="#00A884" />
          <Line x1="108" y1="72" x2="109" y2="94" stroke="#FFFFFF" strokeWidth="1" />
          <Line x1="113" y1="72" x2="114" y2="94" stroke="#FFFFFF" strokeWidth="1" />
          <Circle cx="108" cy="70" r="3" fill="#FDE047" />
          <Circle cx="113" cy="68" r="3" fill="#FDE047" />
          <Circle cx="117" cy="70" r="3" fill="#FDE047" />

          {/* Dark trousers & legs hanging down */}
          <Path d="M 95 86 L 86 115 L 88 128" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <Path d="M 129 86 L 138 115 L 136 128" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="88" cy="128" r="3" fill="#FBCFE8" />
          <Circle cx="136" cy="128" r="3" fill="#FBCFE8" />
        </Svg>
      ),
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < SLIDES.length) {
      setActiveIndex(index);
      hapticLight();
    }
  };

  const scrollToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setActiveIndex(index);
      hapticLight();
    }
  };

  const handleGetStarted = () => {
    hapticMedium();
    setActiveOverlay('auth');
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 24) }]}>
      {/* Top Navigation Row with Back Button and 3 Indicator Dots */}
      <View style={styles.topRow}>
        {activeIndex > 0 ? (
          <TouchableOpacity
            onPress={() => scrollToSlide(activeIndex - 1)}
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Previous slide"
          >
            <Feather name="arrow-left" size={24} color={COLORS.darkGreen} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* 3 Pagination Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToSlide(index)}
                activeOpacity={0.8}
                style={[
                  styles.dot,
                  isActive ? styles.dotActive : styles.dotInactive,
                ]}
              />
            );
          })}
        </View>

        <View style={styles.backPlaceholder} />
      </View>

      {/* Horizontal Swipeable FlatList */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        decelerationRate="fast"
        bounces={false}
        renderItem={({ item, index }) => (
          <View style={styles.slideWrapper}>
            {/* Outer Rounded Illustration Frame matching Figma */}
            <View style={styles.illustrationFrame}>
              {item.renderIllustration()}
            </View>

            {/* Typography */}
            <View style={styles.textContainer}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            </View>

            {/* Bottom Mint Progress Bar */}
            <View style={styles.bottomBarTrack}>
              <View
                style={[
                  styles.bottomBarFill,
                  { width: `${((index + 1) / SLIDES.length) * 100}%` },
                ]}
              />
            </View>
          </View>
        )}
      />

      {/* Action Area: "Get Started" capsule on slide 3, or Swipe prompt */}
      <View style={styles.actionContainer}>
        {activeIndex === SLIDES.length - 1 ? (
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.85}
            accessibilityRole="button"
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextTextButton}
            onPress={() => scrollToSlide(activeIndex + 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.nextText}>Swipe or Tap to Continue →</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 48,
  },
  backButton: {
    padding: 6,
  },
  backPlaceholder: {
    width: 36,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  slideWrapper: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  illustrationFrame: {
    width: SCREEN_WIDTH - 44,
    height: 250,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  slideTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.darkGreen,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  slideSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  bottomBarTrack: {
    width: '75%',
    height: 4,
    backgroundColor: '#D1E7DD',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  bottomBarFill: {
    height: '100%',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 2,
  },
  actionContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  getStartedButton: {
    width: '58%',
    backgroundColor: '#000000',
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    paddingVertical: 13,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  nextTextButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  nextText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
    letterSpacing: 0.2,
  },
});
