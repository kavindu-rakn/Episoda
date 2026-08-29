import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  useFonts, 
  ChakraPetch_400Regular, 
  ChakraPetch_500Medium, 
  ChakraPetch_600SemiBold, 
  ChakraPetch_700Bold 
} from '@expo-google-fonts/chakra-petch';
import * as SplashScreen from 'expo-splash-screen';

import { AppProvider, useApp } from './src/context/AppContext';
import { Header } from './src/components/Header';
import { BottomNav } from './src/components/BottomNav';
import { HomeScreen } from './src/screens/HomeScreen';
import { WatchlistScreen } from './src/screens/WatchlistScreen';
import { DiscoverScreen } from './src/screens/DiscoverScreen';
import { CastScreen } from './src/screens/CastScreen';
import { RankingScreen } from './src/screens/RankingScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { NotificationScreen } from './src/screens/NotificationScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { LaunchScreen } from './src/screens/LaunchScreen';
import { COLORS } from './src/constants/theme';

// Keep native splash screen visible while fonts load
SplashScreen.preventAutoHideAsync().catch(() => {});

const MainNavigator: React.FC = () => {
  const { activeTab, activeOverlay, isAuthenticated } = useApp();
  const [showLaunchScreen, setShowLaunchScreen] = useState(true);

  if (showLaunchScreen) {
    return <LaunchScreen onFinish={() => setShowLaunchScreen(false)} />;
  }

  if (!isAuthenticated && activeOverlay === 'auth') {
    return <AuthScreen />;
  }

  if (!isAuthenticated && activeOverlay === 'onboarding') {
    return <OnboardingScreen />;
  }

  // Handle Full Overlays
  if (activeOverlay === 'profile') {
    return <ProfileScreen />;
  }

  if (activeOverlay === 'notifications') {
    return <NotificationScreen />;
  }

  if (activeOverlay === 'onboarding') {
    return <OnboardingScreen />;
  }

  if (activeOverlay === 'auth') {
    return <AuthScreen />;
  }

  // Active Bottom Tab
  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'watchlist':
        return <WatchlistScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'cast':
        return <CastScreen />;
      case 'ranking':
        return <RankingScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.contentContainer}>
        {renderCurrentTab()}
      </View>
      <BottomNav />
    </View>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    ChakraPetch_400Regular,
    ChakraPetch_500Medium,
    ChakraPetch_600SemiBold,
    ChakraPetch_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryDark} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        <StatusBar style="dark" />
        <AppProvider>
          <MainNavigator />
        </AppProvider>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
  },
});
