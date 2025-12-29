import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";
import { AppText } from "../../../shared/components/AppText";
import { AppInput } from "../../../shared/components/AppInput";
import { AppButton } from "../../../shared/components/AppButton";
import { COLORS, SIZES, SHADOWS, FONTS, SPACING } from "../../../shared/constaints/hotelTheme";
import { useLogin } from '../hooks/useLogin';
import { AuthService } from '../services/AuthService';

interface LoginScreenProps {
  onLogin: (user: any) => void;
  onSignup: () => void;
}

const authService = new AuthService();
export default function LoginScreen({ onLogin, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useLogin(authService);

  const handleLogin = useCallback(() => {
    if (!email.trim() || !password) {
      Alert.alert("Lỗi", "Không được để trống thông tin");
      return;
    }
    login(email, password);
  }, [email, password, login]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}> 
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: COLORS.border }]}>
            <View style={[styles.cameraIconShape, { backgroundColor: COLORS.primary }]}>
              <View style={[styles.cameraLens, { backgroundColor: COLORS.white, borderColor: COLORS.primary }]} />
            </View>
          </View>
          <AppText variant="title" align="center">Hotel Manager</AppText>
          <AppText variant="body" color={COLORS.textLight} align="center" style={styles.subtitle}>
            Sign in to your account
          </AppText>
        </View>

        <View style={styles.form}>
          <AppInput
            label="Email"
            placeholder="admin@hotel.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            testID="inputEmail"
          />

          <View style={styles.passwordContainer}>
            <AppInput
              label="Password"
              placeholder="••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              testID="inputPassword"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <AppText variant="body" color={COLORS.textLight}>
                {showPassword ? "Ẩn" : "Xem"}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            title="Sign In"
            onPress={handleLogin}
            fullWidth
            loading={loading}
            style={{ marginTop: SIZES.padding }}
          />
          {error && <Text>{error}</Text>}
        </View>

        <View style={[styles.signupPrompt, { marginTop: SPACING.xl }]}>
          <AppText variant="body" color={COLORS.textLight}>
            Chưa có tài khoản?{" "}
          </AppText>
          <TouchableOpacity onPress={onSignup}>
            <AppText variant="body" color={COLORS.primary} style={{ fontWeight: "600" }}>
              Đăng ký
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={[styles.demoBox, { backgroundColor: COLORS.lightGray, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.lightBlue }]}>
          <AppText variant="body" color={COLORS.textDark} style={{ fontWeight: "600", marginBottom: SPACING.xs }}>
            Demo Credentials:
          </AppText>
          <AppText variant="body" color={COLORS.text}>
            Email: admin@hotel.com
          </AppText>
          <AppText variant="body" color={COLORS.text}>
            Password: 123456
          </AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: "center",
    paddingBottom: 40,
  },
  header: { alignItems: "center", marginBottom: SPACING.xxl },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  cameraIconShape: {
    width: 32,
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
  },
  subtitle: { marginTop: SPACING.md },
  form: { marginBottom: SPACING.xl },
  passwordContainer: { position: "relative", justifyContent: "center" },
  eyeButton: {
    position: "absolute",
    right: SIZES.padding * 0.8,
    top: SIZES.base * 5.5,
    paddingHorizontal: SPACING.sm,
  },
  signupPrompt: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  demoBox: {
    borderRadius: SIZES.radiusSmall,
    marginTop: SPACING.sm,
  },
});

