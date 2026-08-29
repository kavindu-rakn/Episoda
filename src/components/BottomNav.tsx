import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { TabRoute } from '../types';
import { COLORS, FONTS } from '../constants/theme';

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
  const { activeTab, setActiveTab, activeOverlay } = useApp();

  if (activeOverlay === 'onboarding' || activeOverlay === 'auth') {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const color = isActive ? COLORS.primaryDark : COLORS.darkGreen;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
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
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingBottom: 4,
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
