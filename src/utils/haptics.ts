import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

let _hapticsEnabled = true;

export const setHapticsEnabled = (enabled: boolean) => {
  _hapticsEnabled = enabled;
};

export const isHapticsEnabled = () => _hapticsEnabled;

export const hapticLight = async () => {
  if (!_hapticsEnabled || Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (e) {}
};

export const hapticMedium = async () => {
  if (!_hapticsEnabled || Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (e) {}
};

export const hapticHeavy = async () => {
  if (!_hapticsEnabled || Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (e) {}
};

export const hapticSelection = async () => {
  if (!_hapticsEnabled || Platform.OS === 'web') return;
  try {
    await Haptics.selectionAsync();
  } catch (e) {}
};

export const hapticSuccess = async () => {
  if (!_hapticsEnabled || Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (e) {}
};

export const hapticWarning = async () => {
  if (!_hapticsEnabled || Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (e) {}
};
