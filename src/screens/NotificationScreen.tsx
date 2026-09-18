import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticSuccess } from '../utils/haptics';

export const NotificationScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead 
  } = useApp();

  const handleNotificationPress = (id: string) => {
    hapticLight();
    markNotificationRead(id);
  };

  const handleMarkAllRead = () => {
    hapticSuccess();
    markAllNotificationsRead();
  };

  const renderNotificationCard = ({ item }: { item: NotificationItem }) => {
    return (
      <TouchableOpacity
        style={[styles.card, !item.isRead && styles.unreadCard]}
        onPress={() => handleNotificationPress(item.id)}
        activeOpacity={0.8}
      >
        {/* Left Thumbnail (Square) */}
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
      {/* Title Bar matching Figma Screen 12 */}
      <View style={styles.titleBar}>
        <Text style={styles.pageTitle}>NOTIFICATIONS</Text>

        {notifications.some(n => !n.isRead) && (
          <TouchableOpacity
            style={styles.markReadButton}
            onPress={handleMarkAllRead}
            activeOpacity={0.7}
            accessibilityLabel="Mark all as read"
          >
            <Ionicons name="checkmark-done" size={20} color={COLORS.primaryDark} />
          </TouchableOpacity>
        )}
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
  titleBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 4,
  },
  markReadButton: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    borderRadius: RADIUS.none,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    gap: 12,
  },
  unreadCard: {
    borderColor: COLORS.primaryDark,
    borderWidth: 2,
    backgroundColor: '#F0FDF9',
  },
  thumbnail: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.none,
    backgroundColor: '#0F2620',
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
