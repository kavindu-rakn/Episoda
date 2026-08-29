import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Tv, Search, Mic, ListOrdered } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { TabRoute } from '../types';
import { COLORS, FONTS } from '../constants/theme';

interface TabItem {
  key: TabRoute;
  label: string;
  icon: (color: string, size: number) => React.ReactNode;
}

const TABS: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: (color, size) => <Home size={size} color={color} strokeWidth={2.2} />,
  },
  {
    key: 'watchlist',
    label: 'Watchlist',
    icon: (color, size) => <Tv size={size} color={color} strokeWidth={2.2} />,
  },
  {
    key: 'discover',
    label: 'Discover',
    icon: (color, size) => <Search size={size} color={color} strokeWidth={2.2} />,
  },
  {
    key: 'cast',
    label: 'Cast & VA',
    icon: (color, size) => <Mic size={size} color={color} strokeWidth={2.2} />,
  },
  {
    key: 'ranking',
    label: 'Ranking',
    icon: (color, size) => <ListOrdered size={size} color={color} strokeWidth={2.2} />,
  },
];

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, activeOverlay } = useApp();

  // If viewing a full overlay like Onboarding or Auth, don't show the bottom bar
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
              {tab.icon(color, 24)}
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
