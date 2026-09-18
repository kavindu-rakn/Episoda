import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { TabRoute } from '../types';
import { COLORS, FONTS } from '../constants/theme';
import { hapticSelection } from '../utils/haptics';

interface TabItem {
  key: TabRoute;
  label: string;
  renderIcon: (color: string, size: number) => React.ReactNode;
}

const TABS: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    renderIcon: (color, size) => <Feather name="home" size={size} color={color} />,
  },
  {
    key: 'watchlist',
    label: 'Watchlist',
    renderIcon: (color, size) => <Feather name="tv" size={size} color={color} />,
  },
  {
    key: 'discover',
    label: 'Discover',
    renderIcon: (color, size) => <Feather name="search" size={size} color={color} />,
  },
  {
    key: 'cast',
    label: 'Cast & VA',
    renderIcon: (color, size) => <Feather name="mic" size={size} color={color} />,
  },
  {
    key: 'ranking',
    label: 'Ranking',
    renderIcon: (color, size) => <Feather name="list" size={size} color={color} />,
  },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeOverlay, setActiveOverlay } = useApp();
  const insets = useSafeAreaInsets();

  if (activeOverlay === 'onboarding' || activeOverlay === 'auth') {
    return null;
  }

  const handleTabPress = (tabKey: TabRoute) => {
    hapticSelection();
    if (activeOverlay) {
      setActiveOverlay(null);
    }
    setActiveTab(tabKey);
  };


  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 6) }]}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const color = isActive ? COLORS.primaryDark : COLORS.darkGreen;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.key)}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              {tab.renderIcon(color, 24)}
              <Text
                style={[
                  styles.label,
                  { color, fontFamily: isActive ? FONTS.bold : FONTS.medium },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.darkGreen,
  },
  bar: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
