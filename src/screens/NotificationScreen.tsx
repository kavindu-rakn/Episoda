import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';
import { COLORS, FONTS } from '../constants/theme';

export const NotificationScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    setActiveOverlay 
  } = useApp();

  const renderNotificationCard = ({ item }: { item: NotificationItem }) => {
    return (
      <TouchableOpacity
        style={[styles.card, !item.isRead && styles.unreadCard]}
        onPress={() => markNotificationRead(item.id)}
        activeOpacity={0.8}
      >
        {/* Left Thumbnail */}
        <Image
          source={{ uri: item.posterUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        {/* Message Content */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Episode {item.episodeNumber} of{' '}
            <Text style={styles.showTitleHighlight}>{item.showTitle}</Text>
            {' '}aired!
          </Text>
        </View>

        {/* Relative Time */}
        <Text style={styles.timeAgoText}>{item.timeAgo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and Mark All Read */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveOverlay(null)}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color={COLORS.darkGreen} />
        </TouchableOpacity>
        
        <Text style={styles.pageTitle}>NOTIFICATIONS</Text>

        <TouchableOpacity
          style={styles.markReadButton}
          onPress={markAllNotificationsRead}
          activeOpacity={0.7}
          accessibilityLabel="Mark all as read"
        >
          <Ionicons name="checkmark-done" size={22} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications right now.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  backButton: {
    padding: 4,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 4,
  },
  markReadButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 12,
  },
  unreadCard: {
    borderColor: COLORS.primaryDark,
    borderWidth: 2,
    backgroundColor: '#F0FDF9',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 3,
    backgroundColor: '#E0F2FE',
  },
  messageContainer: {
    flex: 1,
  },
  messageText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
    lineHeight: 18,
  },
  showTitleHighlight: {
    color: COLORS.primaryDark,
    fontFamily: FONTS.bold,
    textDecorationLine: 'underline',
  },
  timeAgoText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textMuted,
  },
});
