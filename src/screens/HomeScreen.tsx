import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { INITIAL_SHOWS } from '../data/mockData';
import { MediaCard } from '../components/MediaCard';
import { Show } from '../types';
import { COLORS } from '../constants/theme';

export const HomeScreen: React.FC = () => {
  const { addToWatchlist, watchlist } = useApp();

  const handlePressShow = (show: Show) => {
    const isAlreadyInWl = watchlist.some((item) => item.showId === show.id);
    if (isAlreadyInWl) {
      Alert.alert(show.title, 'This show is already in your Watchlist!');
    } else {
      Alert.alert(
        show.title,
        `Add "${show.title}" to your Watchlist?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Add to Watching',
            onPress: () => addToWatchlist(show, 'Watching'),
          },
          {
            text: 'Add to Planning',
            onPress: () => addToWatchlist(show, 'Planning'),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={INITIAL_SHOWS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MediaCard show={item} onPress={() => handlePressShow(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
