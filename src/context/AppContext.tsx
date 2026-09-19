import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  TabRoute, 
  OverlayScreen, 
  WatchlistItem, 
  WatchStatus, 
  UserProfile, 
  NotificationItem, 
  Show,
  CastMember,
  AppSettings,
} from '../types';
import { 
  INITIAL_WATCHLIST, 
  INITIAL_USER_PROFILE, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { setHapticsEnabled } from '../utils/haptics';

export const DEFAULT_SETTINGS: AppSettings = {
  hapticsEnabled: true,
  streamingRegion: 'Global',
  autoNextEpisode: true,
};

interface AppContextType {
  activeTab: TabRoute;
  setActiveTab: (tab: TabRoute) => void;
  activeOverlay: OverlayScreen;
  setActiveOverlay: (overlay: OverlayScreen) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  watchlist: WatchlistItem[];
  updateEpisodeProgress: (id: string, delta: number) => void;
  setEpisodeProgress: (id: string, targetCount: number) => void;
  setWatchStatus: (id: string, status: WatchStatus) => void;
  addToWatchlist: (show: Show, status?: WatchStatus, initialEpisodes?: number) => void;
  removeFromWatchlist: (id: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetToSampleData: () => void;
  clearWatchlist: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;
  selectedShow: Show | null;
  openShowDetails: (show: Show) => void;
  closeShowDetails: () => void;
  selectedCastMember: CastMember | null;
  openCastDetails: (member: CastMember) => void;
  closeCastDetails: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  WATCHLIST: '@episoda_watchlist',
  PROFILE: '@episoda_profile',
  NOTIFICATIONS: '@episoda_notifications',
  AUTH: '@episoda_auth',
  SETTINGS: '@episoda_settings',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabRoute>('home');
  const [activeOverlay, setActiveOverlay] = useState<OverlayScreen>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(INITIAL_WATCHLIST);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  const openShowDetails = (show: Show) => {
    setSelectedShow(show);
  };

  const closeShowDetails = () => {
    setSelectedShow(null);
  };

  const [selectedCastMember, setSelectedCastMember] = useState<CastMember | null>(null);

  const openCastDetails = (member: CastMember) => {
    setSelectedCastMember(member);
  };

  const closeCastDetails = () => {
    setSelectedCastMember(null);
  };

  // Load persisted data on startup
  useEffect(() => {
    (async () => {
      try {
        const [savedWl, savedProfile, savedNotifs, savedAuth, savedSettings] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.WATCHLIST),
          AsyncStorage.getItem(STORAGE_KEYS.PROFILE),
          AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
          AsyncStorage.getItem(STORAGE_KEYS.AUTH),
          AsyncStorage.getItem(STORAGE_KEYS.SETTINGS),
        ]);

        if (savedWl) setWatchlist(JSON.parse(savedWl));
        if (savedProfile) setUserProfile(JSON.parse(savedProfile));
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
        if (savedAuth !== null) setIsAuthenticated(savedAuth === 'true');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings(parsed);
          setHapticsEnabled(parsed.hapticsEnabled ?? true);
        }
      } catch (err) {
        console.warn('Error loading stored app state', err);
      }
    })();
  }, []);

  // Save changes to storage
  const saveWatchlist = async (items: WatchlistItem[]) => {
    setWatchlist(items);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save watchlist', e);
    }
  };

  const updateEpisodeProgress = (id: string, delta: number) => {
    const updated = watchlist.map((item) => {
      if (item.id !== id) return item;
      const total = typeof item.totalEpisodes === 'number' ? item.totalEpisodes : 999999;
      const nextCount = Math.max(0, Math.min(item.watchedEpisodes + delta, total));
      
      let nextStatus = item.status;
      if (typeof item.totalEpisodes === 'number' && nextCount >= item.totalEpisodes) {
        nextStatus = 'Completed';
      } else if (item.status === 'Completed' && nextCount < total) {
        nextStatus = 'Watching';
      } else if (item.status === 'Planning' && nextCount > 0) {
        nextStatus = 'Watching';
      }

      return {
        ...item,
        watchedEpisodes: nextCount,
        status: nextStatus,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
    });
    saveWatchlist(updated);
    recalculateStats(updated);
  };

  const setEpisodeProgress = (id: string, targetCount: number) => {
    const updated = watchlist.map((item) => {
      if (item.id !== id) return item;
      const total = typeof item.totalEpisodes === 'number' ? item.totalEpisodes : 999999;
      const nextCount = Math.max(0, Math.min(targetCount, total));

      let nextStatus = item.status;
      if (typeof item.totalEpisodes === 'number' && nextCount >= item.totalEpisodes) {
        nextStatus = 'Completed';
      } else if (item.status === 'Completed' && nextCount < total) {
        nextStatus = 'Watching';
      } else if (item.status === 'Planning' && nextCount > 0) {
        nextStatus = 'Watching';
      }

      return {
        ...item,
        watchedEpisodes: nextCount,
        status: nextStatus,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
    });
    saveWatchlist(updated);
    recalculateStats(updated);
  };

  const setWatchStatus = (id: string, status: WatchStatus) => {
    const updated = watchlist.map((item) => (item.id === id ? { ...item, status } : item));
    saveWatchlist(updated);
    recalculateStats(updated);
  };


  const addToWatchlist = (show: Show, status: WatchStatus = 'Watching', initialEpisodes: number = 0) => {
    const exists = watchlist.find((w) => w.showId === show.id);
    if (exists) return;
    const isCompleted = typeof show.totalEpisodes === 'number' && initialEpisodes >= show.totalEpisodes;
    const finalStatus = isCompleted ? 'Completed' : status;
    const newItem: WatchlistItem = {
      id: `wl-${Date.now()}`,
      showId: show.id,
      title: show.title,
      type: show.type,
      posterUrl: show.posterUrl,
      watchedEpisodes: initialEpisodes,
      totalEpisodes: show.totalEpisodes,
      status: finalStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    const updated = [newItem, ...watchlist];
    saveWatchlist(updated);
    recalculateStats(updated);
  };

  const removeFromWatchlist = (id: string) => {
    const updated = watchlist.filter((w) => w.id !== id);
    saveWatchlist(updated);
    recalculateStats(updated);
  };

  const recalculateStats = (items: WatchlistItem[]) => {
    const animeItems = items.filter((i) => i.type === 'Anime');
    const tvItems = items.filter((i) => i.type === 'TV' || i.type === 'ONA');

    const animeEpisodes = animeItems.reduce((sum, i) => sum + i.watchedEpisodes, 0);
    const tvEpisodes = tvItems.reduce((sum, i) => sum + i.watchedEpisodes, 0);

    // Approx 24 mins per anime episode, 50 mins per TV episode
    const animeHours = Math.round((animeEpisodes * 24) / 60);
    const tvHours = Math.round((tvEpisodes * 50) / 60);

    const newProfile: UserProfile = {
      ...userProfile,
      stats: {
        animeCount: animeItems.length,
        animeHours,
        animeEpisodes,
        tvCount: tvItems.length,
        tvHours,
        tvEpisodes,
        totalCount: items.length,
        totalHours: animeHours + tvHours,
        totalEpisodes: animeEpisodes + tvEpisodes,
      },
    };

    setUserProfile(newProfile);
    AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile)).catch(() => {});
  };

  const updateUserProfile = (profileUpdate: Partial<UserProfile>) => {
    const newProfile = { ...userProfile, ...profileUpdate };
    setUserProfile(newProfile);
    AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile)).catch(() => {});
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    const updated = { ...settings, ...partial };
    setSettings(updated);
    if (partial.hapticsEnabled !== undefined) {
      setHapticsEnabled(partial.hapticsEnabled);
    }
    AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated)).catch(() => {});
  };

  const resetToSampleData = () => {
    setWatchlist(INITIAL_WATCHLIST);
    setUserProfile(INITIAL_USER_PROFILE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(DEFAULT_SETTINGS);
    setHapticsEnabled(DEFAULT_SETTINGS.hapticsEnabled);
    AsyncStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(INITIAL_WATCHLIST)).catch(() => {});
    AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_USER_PROFILE)).catch(() => {});
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS)).catch(() => {});
    AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS)).catch(() => {});
    recalculateStats(INITIAL_WATCHLIST);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
    AsyncStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify([])).catch(() => {});
    recalculateStats([]);
  };

  const exportData = (): string => {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      watchlist,
      userProfile,
      settings,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.watchlist && Array.isArray(data.watchlist)) {
        setWatchlist(data.watchlist);
        AsyncStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(data.watchlist)).catch(() => {});
        recalculateStats(data.watchlist);
      }
      if (data.userProfile && typeof data.userProfile === 'object') {
        setUserProfile(data.userProfile);
        AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.userProfile)).catch(() => {});
      }
      if (data.settings && typeof data.settings === 'object') {
        const nextSettings = { ...DEFAULT_SETTINGS, ...data.settings };
        setSettings(nextSettings);
        setHapticsEnabled(nextSettings.hapticsEnabled);
        AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(nextSettings)).catch(() => {});
      }
      return true;
    } catch (e) {
      console.warn('Failed to parse import data', e);
      return false;
    }
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated)).catch(() => {});
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated)).catch(() => {});
  };

  const login = () => {
    setIsAuthenticated(true);
    setActiveOverlay(null);
    AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'true').catch(() => {});
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveOverlay('auth');
    AsyncStorage.setItem(STORAGE_KEYS.AUTH, 'false').catch(() => {});
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeOverlay,
        setActiveOverlay,
        isAuthenticated,
        login,
        logout,
        watchlist,
        updateEpisodeProgress,
        setEpisodeProgress,
        setWatchStatus,
        addToWatchlist,
        removeFromWatchlist,
        userProfile,
        updateUserProfile,
        settings,
        updateSettings,
        resetToSampleData,
        clearWatchlist,
        exportData,
        importData,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        selectedShow,
        openShowDetails,
        closeShowDetails,
        selectedCastMember,
        openCastDetails,
        closeCastDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
