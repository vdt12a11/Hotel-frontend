import React, { useMemo, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from '@react-native-vector-icons/ionicons';
import { AppText, AppInput } from '../../components';
import { COLORS, SHADOWS, FONTS, SIZES } from '../../constaints/hotelTheme';

const UserProfileScreen = () => {
  const { width, height } = useWindowDimensions();
  
  // Responsive calculations based on screen width
  const responsive = useMemo(() => {
    const scale = width / 375; // Base design width (iPhone 11/12)
    const circleSize = width * 2;
    const avatarSize = Math.max(80, Math.min(120, 100 * scale));
    const headerHeight = Math.max(190, 230 * scale);
    
    return {
      circleSize,
      headerHeight,
      circleTop: -circleSize + (240 * scale),
      avatarSize,
      avatarBottom: -(avatarSize / 2) - 95, // add extra gap between name and avatar
      iconSize: Math.max(40, Math.min(60, 50 * scale)),
      headerTitleSize: Math.max(20, Math.min(36, 30 * scale)),
      infoIconSize: Math.max(20, Math.min(28, 24 * scale)),
      infoValueSize: Math.max(14, Math.min(18, 16 * scale)),
      refreshIconSize: Math.max(16, Math.min(24, 20 * scale)),
      paddingH: Math.max(15, Math.min(30, 25 * scale)),
      btnPaddingH: Math.max(25, Math.min(50, 40 * scale)),
      btnPaddingV: Math.max(12, Math.min(18, 15 * scale)),
      btnTextSize: Math.max(14, Math.min(18, 16 * scale)),
      topBarPaddingH: Math.max(15, Math.min(25, 20 * scale)),
      topBarPaddingV: Math.max(10, Math.min(18, 14 * scale)),
      topBarMarginTop: Math.max(12, Math.min(24, 18 * scale)),
      formMarginTop: Math.max(50, Math.min(70, 60 * scale)),
      titleBottom: Math.max(70, Math.min(100, 85 * scale)),
    };
  }, [width]);
  const initialProfile = useMemo(() => ({
    username: 'anna_avetisyan',
    phone: '818 123 4567',
    email: 'info@aplusdesign.co',
    password: '••••••••',
  }), []);

  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);

  const handleSave = useCallback(() => {
    const hasChanges = JSON.stringify(profile) !== JSON.stringify(savedProfile);
    if (!hasChanges) return;

    Alert.alert(
      'Xác nhận thay đổi',
      'Bạn có chắc chắn muốn lưu các thay đổi hiện tại?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đồng ý', onPress: () => setSavedProfile(profile) },
      ],
    );
  }, [profile, savedProfile]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header Section */}
        <View style={[styles.headerContainer, { height: responsive.headerHeight }]}>
          <View style={[styles.circleWrapper, { 
            width: responsive.circleSize, 
            height: responsive.circleSize-30,
            borderRadius: responsive.circleSize / 2,
            top: responsive.circleTop,
            left: -(responsive.circleSize - width) / 2,
          }]}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.lightBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0.6, 1]}
              style={styles.circle}
            />
          </View>

          <SafeAreaView style={styles.headerContent}>
            <View style={[styles.topBar, { paddingHorizontal: responsive.topBarPaddingH, paddingTop: responsive.topBarPaddingV, marginTop: responsive.topBarMarginTop }]}>
              <AppText style={[styles.headerTitle, { fontSize: responsive.headerTitleSize, lineHeight: responsive.headerTitleSize * 1.2 }]}>{profile.username}</AppText>
            </View>

            <View style={[styles.avatarContainer, { bottom: responsive.avatarBottom }]}>
              <View style={[styles.avatar, { 
                width: responsive.avatarSize, 
                height: responsive.avatarSize, 
                borderRadius: responsive.avatarSize / 2 
              }]}>
                <Ionicons name="person-outline" size={responsive.iconSize} color={COLORS.primary} />
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Form Section */}
        <View style={[styles.formSection, { paddingHorizontal: responsive.paddingH, marginTop: responsive.formMarginTop }]}>
          <AppInput
            label="Username"
            placeholder="Enter username"
            value={profile.username}
            onChangeText={(text) => setProfile((prev) => ({ ...prev, username: text }))}
            containerStyle={styles.inputItem}
          />
          <AppInput
            label="Phone"
            placeholder="818 123 4567"
            keyboardType="phone-pad"
            value={profile.phone}
            onChangeText={(text) => setProfile((prev) => ({ ...prev, phone: text }))}
            containerStyle={styles.inputItem}
          />
          <AppInput
            label="Email"
            placeholder="info@aplusdesign.co"
            keyboardType="email-address"
            autoCapitalize="none"
            value={profile.email}
            onChangeText={(text) => setProfile((prev) => ({ ...prev, email: text }))}
            containerStyle={styles.inputItem}
          />
          <AppInput
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            autoCorrect={false}
            value={profile.password}
            onChangeText={(text) => setProfile((prev) => ({ ...prev, password: text }))}
            containerStyle={styles.inputItem}
          />
        </View>

        <TouchableOpacity style={[styles.btnWrapper, { marginHorizontal: responsive.btnPaddingH }]} onPress={handleSave}>
          <LinearGradient
            colors={[COLORS.primary, `${COLORS.primary}B3`]}
            style={[styles.btn, { paddingVertical: responsive.btnPaddingV }]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <AppText style={[styles.btnText, { fontSize: responsive.btnTextSize }]}>Save changes</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.screenBackGround, 
    paddingBottom: SIZES.padding*3
  },
  headerContainer: { 
    alignItems: 'center',
  },
  circleWrapper: {
    position: 'absolute',
    overflow: 'hidden',
  },
  circle: { 
    flex: 1 
  },
  headerContent: { 
    width: '100%', 
    alignItems: 'center',
    paddingTop: 60
  },
  topBar: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%', 
    marginTop: 10
  },
  headerTitle: { 
    ...FONTS.h2,
    color: COLORS.textOnPrimary, 
    fontWeight: '700' as const,
    textAlign: 'center',
  },
  avatarContainer: {
    position: 'absolute',
  },
  avatar: {
    backgroundColor: COLORS.white, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  formSection: {},
  inputItem: {
    width: '100%',
  },
  btnWrapper: { 
    marginVertical: 30,
  },
  btn: { 
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { 
    fontFamily: FONTS.body1.fontFamily,
    color: COLORS.textOnPrimary, 
    fontWeight: '700' as const,
  }
});

export default UserProfileScreen;