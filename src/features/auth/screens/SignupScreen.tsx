import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { COLORS, SIZES, SPACING } from "../../../constaints/hotelTheme";
import AppText from "../../../shared/components/AppText";
import AppInput from "../../../shared/components/AppInput";
import AppButton from "../../../shared/components/AppButton";
import Config from "react-native-config";
type SignupScreenProps = {
  onBackToLogin: () => void;
};

type SignupPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type SignupResponse = {
  message?: string;
};

export default function SignupScreen({
  onBackToLogin
}: SignupScreenProps): React.ReactElement {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignup = async (): Promise<void> => {
    setError("");
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert("Thiếu thông tin", "Không được để trống bất kỳ trường nào");
      return;
    }

    const payload: SignupPayload = { name, email, phone, password };
    setLoading(true);
    try {
      const res = await fetch(`${Config.API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let data: SignupResponse = {};
      try {
        data = await res.json();
      } catch (e) {
        // ignore if cannot parse json
      }
      if (!res.ok) {
        if (res.status === 409) {
          setError("Email đã tồn tại");
          Alert.alert("Lỗi", "tài khoản đã tồn tại");
        } else {
          setError(data.message || "Đăng ký thất bại");
          Alert.alert("Lỗi", data.message || "Đăng ký thất bại");
        }
        setLoading(false);
        return;
      }

      Alert.alert("Thành công", "Tạo tài khoản thành công!", [
        { text: "OK", onPress: onBackToLogin }
      ]);
    } catch (error) {
      setError("Không thể kết nối tới server");
      Alert.alert("Lỗi mạng", "Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

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
            Create a new account
          </AppText>
        </View>

        <View style={styles.form}>
          <AppInput
            label="Full Name"
            placeholder="Nguyễn Văn A"
            value={name}
            onChangeText={setName}
            testID="inputName"
          />

          <AppInput
            label="Email"
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            testID="inputEmail"
          />

          <AppInput
            label="Phone"
            placeholder="0123456789"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            testID="inputPhone"
          />

          <View style={styles.passwordContainer}>
            <AppInput
              label="Password"
              placeholder="••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              testID="inputPassword"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <AppText variant="body" color={COLORS.textLight}>
                {showPassword ? "Ẩn" : "Xem"}
              </AppText>
            </TouchableOpacity>
          </View>

          <AppButton
            title="Sign Up"
            onPress={handleSignup}
            fullWidth
            loading={loading}
            style={{ marginTop: SIZES.padding }}
          />
          {error ? (
            <AppText style={{ color: COLORS.lightBlue, marginTop: 8, textAlign: 'center', fontSize: 14 }}>{error}</AppText>
          ) : null}
        </View>

        <TouchableOpacity onPress={onBackToLogin}>
          <AppText variant="body" color={COLORS.textLight} align="center">
            Đã có tài khoản?{" "}
            <AppText variant="body" color={COLORS.primary} style={{ fontWeight: "600" }}>
              Đăng nhập
            </AppText>
          </AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: "center",
    paddingBottom: 40
  },
  header: { alignItems: "center", marginBottom: SPACING.xxl },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg
  },
  cameraIconShape: {
    width: 32,
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  cameraLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2
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
});
