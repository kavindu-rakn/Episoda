import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AVATAR_PRESETS } from '../data/mockData';
import { COLORS, FONTS, RADIUS, BORDERS } from '../constants/theme';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProfileScreen: React.FC = () => {
  const { userProfile, updateUserProfile, logout, setActiveOverlay } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editHandle, setEditHandle] = useState(userProfile.handle || 'johndoe');
  const [editBio, setEditBio] = useState(userProfile.bio || '');
  const [editAvatarUrl, setEditAvatarUrl] = useState(userProfile.avatarUrl);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editBirthday, setEditBirthday] = useState(userProfile.birthday);
  const [editGender, setEditGender] = useState(userProfile.gender);

  const handleOpenEdit = () => {
    hapticLight();
    setEditName(userProfile.name);
    setEditHandle(userProfile.handle || 'johndoe');
    setEditBio(userProfile.bio || '');
    setEditAvatarUrl(userProfile.avatarUrl);
    setEditEmail(userProfile.email);
    setEditBirthday(userProfile.birthday);
    setEditGender(userProfile.gender);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Please enter a valid display name.');
      return;
    }
    if (!editEmail.trim() || !editEmail.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    hapticSuccess();
    updateUserProfile({
      name: editName.trim(),
      handle: editHandle.trim().replace(/^@/, ''),
      bio: editBio.trim(),
      avatarUrl: editAvatarUrl.trim() || userProfile.avatarUrl,
      birthday: editBirthday.trim(),
      gender: editGender.trim(),
      email: editEmail.trim(),
    });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    hapticLight();
    Alert.alert('Log Out', 'Are you sure you want to log out of EpiSoda?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Log Out', 
        style: 'destructive', 
        onPress: () => {
          hapticMedium();
          logout();
        }
      },
    ]);
  };

  const { stats } = userProfile;

  return (
    <View style={styles.container}>
      {/* Title Header */}
      <View style={styles.titleBar}>
        <Text style={styles.pageTitle}>PROFILE</Text>
        <TouchableOpacity
          style={styles.closeOverlayBtn}
          onPress={() => {
            hapticLight();
            setActiveOverlay(null);
          }}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Close Profile"
        >
          <Feather name="x" size={20} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Hero Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: userProfile.avatarUrl }}
                style={styles.avatarImage}
              />
            </View>
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={13} color="#10B981" strokeWidth={3} />
            </View>
          </View>

          {/* User Name & Handle */}
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userHandle}>@{userProfile.handle || 'johndoe'}</Text>

          {/* Member Since Badge */}
          {userProfile.joinDate && (
            <View style={styles.joinDateBadge}>
              <Feather name="calendar" size={11} color={COLORS.primaryDark} />
              <Text style={styles.joinDateText}>MEMBER SINCE {userProfile.joinDate.toUpperCase()}</Text>
            </View>
          )}

          {/* User Bio Quote */}
          {userProfile.bio ? (
            <Text style={styles.userBio}>"{userProfile.bio}"</Text>
          ) : null}

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleOpenEdit}
            activeOpacity={0.75}
          >
            <Feather name="edit-2" size={13} color={COLORS.darkGreen} />
            <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>

        {/* User Information Table (4 Rows with Solid Dark Green Borders) */}
        <View style={styles.infoTable}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Name : {userProfile.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Birthday : {userProfile.birthday}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Gender : {userProfile.gender}</Text>
          </View>
          <View style={[styles.infoRow, styles.lastRow]}>
            <Text style={styles.infoText}>eMail : {userProfile.email}</Text>
          </View>
        </View>

        {/* 3x3 Watch Statistics Grid (Figma Screen 11) */}
        <View style={styles.statsGrid}>
          {/* Row 1: Anime */}
          <View style={styles.statsRow}>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{String(stats.animeCount).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>No. of Anime</Text>
            </View>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.animeHours}</Text>
              <Text style={styles.statLabel}>Anime Hours</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statNumber}>{stats.animeEpisodes}</Text>
              <Text style={styles.statLabel}>Anime Episodes</Text>
            </View>
          </View>

          {/* Row 2: TV */}
          <View style={styles.statsRow}>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{String(stats.tvCount).padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>No. of TV</Text>
            </View>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.tvHours}</Text>
              <Text style={styles.statLabel}>TV Hours</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statNumber}>{stats.tvEpisodes}</Text>
              <Text style={styles.statLabel}>TV Episodes</Text>
            </View>
          </View>

          {/* Row 3: Total */}
          <View style={[styles.statsRow, styles.lastStatsRow]}>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.totalCount}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={[styles.statCell, styles.borderRight]}>
              <Text style={styles.statNumber}>{stats.totalHours}</Text>
              <Text style={styles.statLabel}>Total Hours</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statNumber}>{stats.totalEpisodes}</Text>
              <Text style={styles.statLabel}>Total Episodes</Text>
            </View>
          </View>
        </View>

        {/* Logout Option */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={16} color={COLORS.darkGreen} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Advanced Edit Profile Modal */}
      <Modal 
        visible={isEditing} 
        transparent 
        animationType="slide"
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>EDIT PROFILE</Text>
              <TouchableOpacity
                onPress={() => {
                  hapticLight();
                  setIsEditing(false);
                }}
                style={styles.modalCloseBtn}
                accessibilityLabel="Close modal"
              >
                <Feather name="x" size={20} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* Preset Avatar Selection */}
              <Text style={styles.sectionSubtitle}>CHOOSE AVATAR PRESET</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.presetsScroll}
                style={styles.presetsContainer}
              >
                {AVATAR_PRESETS.map((preset) => {
                  const isSelected = editAvatarUrl === preset.url;
                  return (
                    <TouchableOpacity
                      key={preset.id}
                      style={[
                        styles.presetCard,
                        isSelected && styles.presetCardSelected,
                      ]}
                      onPress={() => {
                        hapticLight();
                        setEditAvatarUrl(preset.url);
                      }}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: preset.url }} style={styles.presetImage} />
                      {isSelected && (
                        <View style={styles.presetCheckOverlay}>
                          <Feather name="check" size={13} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}
                      <Text style={[styles.presetName, isSelected && styles.presetNameSelected]} numberOfLines={1}>
                        {preset.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Custom Image URL */}
              <Text style={styles.inputLabel}>Custom Avatar URL (Optional)</Text>
              <TextInput
                style={styles.modalInput}
                value={editAvatarUrl}
                onChangeText={setEditAvatarUrl}
                placeholder="https://..."
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Display Name */}
              <Text style={styles.inputLabel}>Display Name</Text>
              <TextInput
                style={styles.modalInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Your full display name"
                placeholderTextColor={COLORS.textMuted}
              />

              {/* Handle */}
              <Text style={styles.inputLabel}>Handle</Text>
              <View style={styles.handleInputRow}>
                <Text style={styles.handlePrefix}>@</Text>
                <TextInput
                  style={styles.handleInput}
                  value={editHandle}
                  onChangeText={setEditHandle}
                  placeholder="username"
                  placeholderTextColor={COLORS.textMuted}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Bio / Tagline */}
              <Text style={styles.inputLabel}>Bio / Tagline</Text>
              <TextInput
                style={[styles.modalInput, styles.bioInput]}
                value={editBio}
                onChangeText={setEditBio}
                placeholder="Favorite anime, genres, or motto..."
                placeholderTextColor={COLORS.textMuted}
                multiline
                numberOfLines={3}
                maxLength={140}
              />

              {/* Birthday */}
              <Text style={styles.inputLabel}>Birthday</Text>
              <TextInput
                style={styles.modalInput}
                value={editBirthday}
                onChangeText={setEditBirthday}
                placeholder="01 Jan 2001"
                placeholderTextColor={COLORS.textMuted}
              />

              {/* Gender */}
              <Text style={styles.inputLabel}>Gender</Text>
              <TextInput
                style={styles.modalInput}
                value={editGender}
                onChangeText={setEditGender}
                placeholder="Male / Female / Other"
                placeholderTextColor={COLORS.textMuted}
              />

              {/* Email */}
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.modalInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="you@example.com"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* Button Actions */}
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnCancel]}
                  onPress={() => {
                    hapticLight();
                    setIsEditing(false);
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={styles.modalBtnTextCancel}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.modalBtnSave]}
                  onPress={handleSaveProfile}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalBtnTextSave}>SAVE CHANGES</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  titleBar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  pageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 4,
  },
  closeOverlayBtn: {
    position: 'absolute',
    right: 18,
    top: 12,
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 8,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarBorder: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    padding: 3,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.darkGreen,
    textAlign: 'center',
    marginBottom: 2,
  },
  userHandle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primaryDark,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  joinDateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.none,
    gap: 5,
    marginBottom: 8,
  },
  joinDateText: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    color: COLORS.darkGreen,
    letterSpacing: 0.8,
  },
  userBio: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.none,
  },
  editProfileButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: COLORS.darkGreen,
    letterSpacing: 1,
  },
  infoTable: {
    marginHorizontal: 20,
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.none,
    marginBottom: 24,
  },
  infoRow: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: BORDERS.dark,
    borderBottomColor: COLORS.darkGreen,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  infoText: {
    fontFamily: FONTS.medium,
    fontSize: 14.5,
    color: COLORS.darkGreen,
  },
  statsGrid: {
    marginHorizontal: 20,
    borderWidth: BORDERS.dark,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.none,
  },
  statsRow: {
    flexDirection: 'row',
    borderBottomWidth: BORDERS.dark,
    borderBottomColor: COLORS.darkGreen,
  },
  lastStatsRow: {
    borderBottomWidth: 0,
  },
  statCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderRight: {
    borderRightWidth: BORDERS.dark,
    borderRightColor: COLORS.darkGreen,
  },
  statNumber: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.primaryDark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.darkGreen,
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 8,
  },
  logoutText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.darkGreen,
    textDecorationLine: 'underline',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 36,
  },
  modalContent: {
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.none,
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    padding: 18,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.darkGreen,
    paddingBottom: 10,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.darkGreen,
    letterSpacing: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScrollContent: {
    paddingBottom: 16,
  },
  sectionSubtitle: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    color: COLORS.primaryDark,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  presetsContainer: {
    marginBottom: 14,
  },
  presetsScroll: {
    gap: 10,
    paddingVertical: 4,
  },
  presetCard: {
    width: 68,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.2)',
    padding: 4,
    backgroundColor: '#F8FAF9',
  },
  presetCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: '#E8F8F5',
  },
  presetImage: {
    width: 56,
    height: 56,
    marginBottom: 4,
  },
  presetCheckOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.primaryDark,
    padding: 2,
    borderRadius: 2,
  },
  presetName: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.darkGreen,
    textAlign: 'center',
  },
  presetNameSelected: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryDark,
  },
  inputLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.darkGreen,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  modalInput: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    color: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
  },
  handleInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 56, 49, 0.3)',
    borderRadius: RADIUS.none,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  handlePrefix: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primaryDark,
    paddingLeft: 10,
    paddingRight: 2,
  },
  handleInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    paddingHorizontal: 6,
    paddingVertical: 8,
    color: COLORS.darkGreen,
  },
  bioInput: {
    height: 64,
    textAlignVertical: 'top',
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.none,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnCancel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
  },
  modalBtnSave: {
    backgroundColor: COLORS.primaryDark,
    borderWidth: 1.5,
    borderColor: COLORS.primaryDark,
  },
  modalBtnTextCancel: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: COLORS.darkGreen,
    letterSpacing: 1,
  },
  modalBtnTextSave: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
