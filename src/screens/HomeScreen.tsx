import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { INITIAL_SHOWS } from '../data/mockData';
import { MediaCard } from '../components/MediaCard';
import { Show } from '../types';
import { COLORS } from '../constants/theme';
import { hapticLight } from '../utils/haptics';


export const HomeScreen: React.FC = () => {
  const { openShowDetails } = useApp();

  const handlePressShow = (show: Show) => {
    hapticLight();
    openShowDetails(show);
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
