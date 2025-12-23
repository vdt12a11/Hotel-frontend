import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { COLORS, SIZES, SPACING } from "../constaints/hotelTheme";

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

  const handleSignup = async (): Promise<void> => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert("Thiếu thông tin", "Không được để trống bất kỳ trường nào");
      return;
    }

    const payload: SignupPayload = { name, email, phone, password };

    try {
      const res = await fetch("http://10.0.2.2:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data: SignupResponse = await res.json();
      console.log("Signup response data:", data);

      if (!res.ok) {
        Alert.alert("Lỗi", data.message || "Đăng ký thất bại");
        return;
      }

      Alert.alert("Thành công", "Tạo tài khoản thành công!", [
        { text: "OK", onPress: onBackToLogin }
      ]);
    } catch (error) {
      console.log("Signup error:", error);
      Alert.alert("Lỗi mạng", "Không thể kết nối tới server");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}>
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
            
            style={{ marginTop: SIZES.padding }}
          />
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
