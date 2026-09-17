import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MediaType } from '../types';
import { COLORS, FONTS, RADIUS } from '../constants/theme';

interface FilterTabsProps {
  selectedType: MediaType | 'ALL';
  onSelectType: (type: MediaType | 'ALL') => void;
  allowAll?: boolean;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  selectedType,
  onSelectType,
}) => {
  const options: MediaType[] = ['TV', 'Anime', 'ONA'];

  return (
    <View style={styles.container}>
      {options.map((type) => {
        const isChecked = selectedType === type;
        return (
          <TouchableOpacity
            key={type}
            style={styles.checkboxRow}
            onPress={() => onSelectType(isChecked ? 'ALL' : type)}
            activeOpacity={0.7}
          >
            <View style={[styles.box, isChecked && styles.boxChecked]}>
              {isChecked && <Feather name="check" size={14} color={COLORS.darkGreen} strokeWidth={3} />}
            </View>
            <Text style={styles.label}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.none,
    borderWidth: 1.8,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
    letterSpacing: 0.5,
  },
});

