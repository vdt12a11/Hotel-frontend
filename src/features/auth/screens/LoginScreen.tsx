import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";

import { COLORS, SIZES, SPACING } from "../../../constaints/hotelTheme";
import { useLogin } from '../hooks/useLogin';
import { AuthService } from '../services/AuthService';
import AppText from "../../../shared/components/AppText";
import AppInput from "../../../shared/components/AppInput";
import AppButton from "../../../shared/components/AppButton";
import Config from "react-native-config";
interface LoginScreenProps {
  onLogin: (user: any) => void;
  onSignup: () => void;
}

const authService = new AuthService();

export default function LoginScreen({ onLogin, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = useCallback(async () => {
    setError("");
    if (!email.trim() || !password) {
      Alert.alert("Lỗi", "Không được để trống thông tin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${Config.API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Đăng nhập thất bại");
        Alert.alert("Lỗi", data.message || "Đăng nhập thất bại");
        setLoading(false);
        return;
      }
      console.log(data);
      // data should contain user info or token
      onLogin({ userID: data.userID || data.id || email, name: data.name || email,email:data.email });
    } catch (err) {
      setError("Không thể kết nối tới server");
      Alert.alert("Lỗi mạng", `${Config.API_URL}Không thể kết nối tới server`);
    } finally {
      setLoading(false);
    }
  }, [email, password, onLogin]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <View style={styles.cameraIconShape}>
              <View style={styles.cameraLens} />
            </View>
          </View>
          <AppText variant="title" align="center" style={styles.title}>Hotel Manager</AppText>
          <AppText variant="body" color={COLORS.textLight} align="center" style={styles.subtitle}>
            Sign in to your account
          </AppText>
        </View>
        <View style={styles.form}>
          
          <AppText style={styles.label}>Email</AppText>
          <AppInput
            value={email}
            onChangeText={setEmail}
            placeholder="admin@hotel.com"
            autoCapitalize="none"
            keyboardType="email-address"
            testID="inputEmail"
          />
          <AppText style={[styles.label, { marginTop: 18 }]}>Password</AppText>
          <View style={styles.passwordWrapper}>
            <AppInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              testID="inputPassword"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((v) => !v)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <AppText style={styles.eyeText}>{showPassword ? "Ẩn" : "Hiện mật khẩu"}</AppText>
            </TouchableOpacity>
          </View>
          <AppButton
            title="Sign In"
            onPress={handleLogin}
            fullWidth
            loading={loading}
            style={styles.button}
          />
          {error ? <AppText style={styles.error}>{error}</AppText> : null}
        </View>
        <View style={styles.signupRow}>
          <AppText style={styles.signupText}>Chưa có tài khoản?</AppText>
          <TouchableOpacity onPress={onSignup}>
            <AppText style={styles.signupLink}>Đăng ký</AppText>
          </TouchableOpacity>
        </View>     
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cameraIconShape: {
    width: 36,
    height: 24,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    marginBottom: 18,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 2,
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: 0,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 12,
    zIndex: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  eyeText: {
    fontSize: 13,
    color: COLORS.primary,
  },
  button: {
    marginTop: 28,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  error: {
    color: COLORS.lightBlue,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  signupText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  demoBox: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  demoLine: {
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 2,
  },
});

