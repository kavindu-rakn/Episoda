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
  Modal
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { COLORS, FONTS } from '../constants/theme';

export const ProfileScreen: React.FC = () => {
  const { userProfile, updateUserProfile, setActiveOverlay, logout } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editBirthday, setEditBirthday] = useState(userProfile.birthday);
  const [editGender, setEditGender] = useState(userProfile.gender);

  const handleSaveProfile = () => {
    updateUserProfile({
      name: editName,
      email: editEmail,
      birthday: editBirthday,
      gender: editGender,
    });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const { stats } = userProfile;

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveOverlay(null)}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color={COLORS.darkGreen} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>PROFILE</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert('Log Out', 'Are you sure you want to log out?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log Out', style: 'destructive', onPress: logout },
            ]);
          }}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={22} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Name Header */}
        <Text style={styles.userName}>{userProfile.name}</Text>

        {/* Circular Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarBorder}>
            <Image
              source={{ uri: userProfile.avatarUrl }}
              style={styles.avatarImage}
            />
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* User Information Table */}
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

        {/* 3x3 Watch Statistics Grid */}
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
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={isEditing} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
            />

            <Text style={styles.inputLabel}>Birthday</Text>
            <TextInput
              style={styles.modalInput}
              value={editBirthday}
              onChangeText={setEditBirthday}
            />

            <Text style={styles.inputLabel}>Gender</Text>
            <TextInput
              style={styles.modalInput}
              value={editGender}
              onChangeText={setEditGender}
            />

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.modalInput}
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.modalBtnTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnSave]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalBtnTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
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
  logoutButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 16,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.darkGreen,
    textAlign: 'center',
    marginBottom: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarBorder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
    padding: 2,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  editBtn: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  editText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.darkGreen,
    textDecorationLine: 'underline',
  },
  infoTable: {
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  infoRow: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.darkGreen,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  infoText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.darkGreen,
  },
  statsGrid: {
    marginHorizontal: 20,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
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
    borderRightWidth: 1.5,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.darkGreen,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.darkGreen,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.darkGreen,
    marginBottom: 4,
  },
  modalInput: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    color: COLORS.darkGreen,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalBtnCancel: {
    backgroundColor: '#E2E8F0',
  },
  modalBtnSave: {
    backgroundColor: COLORS.primaryDark,
  },
  modalBtnTextCancel: {
    fontFamily: FONTS.semiBold,
    color: COLORS.darkGreen,
  },
  modalBtnTextSave: {
    fontFamily: FONTS.semiBold,
    color: '#FFFFFF',
  },
});
