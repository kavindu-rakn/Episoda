import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { EpisodaLogo } from '../components/EpisodaLogo';
import { COLORS, FONTS } from '../constants/theme';

export const AuthScreen: React.FC = () => {
  const { login, setActiveOverlay } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('John Doe');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleAuthSubmit = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Required', 'Please enter your username and password.');
      return;
    }
    login();
  };

  return (
    <View style={styles.container}>
      {/* Top Back Button */}
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={() => setActiveOverlay('onboarding')}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color={COLORS.darkGreen} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Logo */}
        <View style={styles.logoWrapper}>
          <EpisodaLogo size="medium" />
        </View>

        {/* Title */}
        <Text style={styles.title}>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</Text>
        <Text style={styles.subtitle}>
          {isSignUp ? 'Create your account to start tracking' : 'Enter Your Username & Password'}
        </Text>

        {/* Username Field */}
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color={COLORS.darkGreen} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color={COLORS.darkGreen} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Remember Me & Forgot Password Row */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Feather name="check" size={14} color={COLORS.darkGreen} />}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert('Reset Password', 'A reset link would be sent to your email.')}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Main Action Button (LOGIN / SIGN UP) */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleAuthSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.loginButtonText}>
            {isSignUp ? 'SIGN UP' : 'LOGIN'}
          </Text>
        </TouchableOpacity>

        {/* Toggle Sign In / Sign Up */}
        <TouchableOpacity
          style={styles.toggleRow}
          onPress={() => setIsSignUp(!isSignUp)}
          activeOpacity={0.7}
        >
          <Text style={styles.togglePrompt}>
            {isSignUp ? 'Already have an account? ' : 'New to EpiSoda? '}
          </Text>
          <Text style={styles.toggleLink}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* Horizontal Separator */}
        <View style={styles.separatorBar} />

        {/* Social Login: Facebook */}
        <TouchableOpacity
          style={[styles.socialButton, styles.facebookButton]}
          onPress={login}
          activeOpacity={0.85}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FFFFFF">
            <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </Svg>
          <Text style={styles.socialTextWhite}>Continue with Facebook</Text>
        </TouchableOpacity>

        {/* Social Login: Google */}
        <TouchableOpacity
          style={[styles.socialButton, styles.googleButton]}
          onPress={login}
          activeOpacity={0.85}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#EA4335" />
            <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </Svg>
          <Text style={styles.socialTextDark}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Social Login: Apple */}
        <TouchableOpacity
          style={[styles.socialButton, styles.appleButton]}
          onPress={login}
          activeOpacity={0.85}
        >
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FFFFFF">
            <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.62-.75 1.04-1.8 0.93-2.87-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.76 1.01.08 2.02-.49 2.64-1.24" />
          </Svg>
          <Text style={styles.socialTextWhite}>Continue with Apple</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topRow: {
    paddingTop: 44,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.darkGreen,
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: 48,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.darkGreen,
  },
  optionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
  },
  rememberText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  forgotText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.darkGreen,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#000000',
    borderWidth: 2.5,
    borderColor: COLORS.primary,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  loginButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  togglePrompt: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.darkGreen,
  },
  toggleLink: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.primaryDark,
    textDecorationLine: 'underline',
  },
  separatorBar: {
    width: '100%',
    height: 3,
    backgroundColor: COLORS.primary,
    marginBottom: 20,
  },
  socialButton: {
    width: '100%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 12,
    gap: 12,
  },
  facebookButton: {
    backgroundColor: COLORS.facebook,
    borderColor: COLORS.primary,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.primary,
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: COLORS.primary,
  },
  socialTextWhite: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  socialTextDark: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
});
