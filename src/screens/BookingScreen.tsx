import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AppText from "../components/AppText";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { calculateNights } from "../utils/calculateNights";
import { COLORS, SIZES, SPACING, SHADOWS } from "../constaints/hotelTheme";

interface Room {
  name: string;
  price: number;
  image?: string;
  size?: string;
  bed?: string;
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
}

interface BookingData {
  room: Room;
  formData: BookingFormData;
  totalPrice: number;
}

interface BookingScreenProps {
  room: Room;
  searchData: { capacity: string } | null;
  onConfirm: (booking: BookingData) => void;
  onBack: () => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ room, searchData, onConfirm, onBack }) => {
  const [name, setName] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [showCheckInPicker, setShowCheckInPicker] = useState<boolean>(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const onChangeCheckIn = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    setShowCheckInPicker(Platform.OS === "ios");
    if (selectedDate) {
      setCheckIn(selectedDate);
    }
  };

  const onChangeCheckOut = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    setShowCheckOutPicker(Platform.OS === "ios");
    if (selectedDate) {
      setCheckOut(selectedDate);
    }
  };

  const isValidEmail = (val: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(val);
  };

  const handleConfirm = (): void => {
    if (checkOut <= checkIn) {
      Alert.alert("Ngày không hợp lệ", "Ngày trả phòng phải sau ngày nhận phòng. Vui lòng chọn lại!");
      return;
    }
    if (!phone || !email || !name) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đủ số điện thoại và email vaf tên!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Email không hợp lệ", "Vui lòng nhập đúng định dạng email");
      return;
    }

    const strCheckIn = formatDate(checkIn);
    const strCheckOut = formatDate(checkOut);
    const nights = calculateNights(strCheckIn, strCheckOut);

    onConfirm({
      room,
      formData: { name, phone, email, checkIn: strCheckIn, checkOut: strCheckOut },
      totalPrice: nights * room.price
    });
  };

  const strCheckIn = formatDate(checkIn);
  const strCheckOut = formatDate(checkOut);
  const nightsPreview = calculateNights(strCheckIn, strCheckOut);
  const isValidPreview = nightsPreview > 0;
  const totalPricePreview = isValidPreview ? nightsPreview * room.price : 0;
  const capacityPreview = searchData?.capacity || "2";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#FAFAF9" }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText variant="title" color={COLORS.textDark} style={{ marginBottom: SPACING.lg }}>
          Booking Details
        </AppText>

        <View style={[styles.card, { backgroundColor: COLORS.primaryLight, ...SHADOWS.light }]}>
          <Image source={{ uri: room.image || "https://via.placeholder.com/100" }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <AppText variant="body" color={COLORS.textDark} numberOfLines={2} style={{ fontWeight: "600", marginBottom: SPACING.xs }}>
              {room.name}
            </AppText>
            <AppText variant="caption" color={COLORS.textLight}>
              {room.size || "45m²"} • {room.bed || "King Bed"}
            </AppText>
            <AppText variant="caption" color={COLORS.textLight} style={{ marginBottom: SPACING.md }}>
              {capacityPreview} adults
            </AppText>
            <AppText variant="subtitle" color={COLORS.primary} style={{ fontWeight: "bold" }}>
              ${totalPricePreview}
              <AppText variant="caption" color={COLORS.textLight} style={{ fontWeight: "400" }}>
                /night
              </AppText>
            </AppText>
          </View>
        </View>

        <View style={{ marginTop: SPACING.xl }}>
          <AppText variant="body" color={COLORS.textDark} style={{ fontWeight: "600", marginBottom: SPACING.md }}>
            Thông tin khách hàng
          </AppText>
          <AppInput           
            placeholder="Tên khách"
            value={name}
            onChangeText={setName}
          />
          <AppInput
            placeholder="Số điện thoại"
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
          <AppInput
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <AppText variant="body" color={COLORS.textDark} style={{ fontWeight: "600" }}>
            Ngày nhận phòng
          </AppText>
          <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={[styles.dateInput, { backgroundColor: COLORS.lightGray }]}>
            <AppText variant="body" color={COLORS.textDark}>
              {formatDate(checkIn)}
            </AppText>
          </TouchableOpacity>

          {showCheckInPicker && (
            <DateTimePicker
              value={checkIn}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeCheckIn}
              minimumDate={new Date()}
            />
          )}

          <AppText variant="body" color={COLORS.textDark} style={{ fontWeight: "600" }}>
            Ngày trả phòng
          </AppText>
          <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={[styles.dateInput, { backgroundColor: COLORS.lightGray }]}>
            <AppText variant="body" color={COLORS.textDark}>
              {formatDate(checkOut)}
            </AppText>
          </TouchableOpacity>

          {showCheckOutPicker && (
            <DateTimePicker
              value={checkOut}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeCheckOut}
              minimumDate={new Date()}
            />
          )}

          <View style={styles.buttonGroup}>
            <AppButton
              title="Xác nhận"
              onPress={handleConfirm}
              fullWidth
              style={{ marginTop: SPACING.xl }}
            />
            <AppButton
              title="Quay lại"
              onPress={onBack}
              fullWidth
              style={{ marginTop: SPACING.md }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: SPACING.xl*2, paddingHorizontal: SIZES.padding, paddingBottom: SPACING.xxl },
  card: {
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: { width: 80, height: 80, borderRadius: SIZES.radiusSmall, backgroundColor: COLORS.border },
  cardContent: { flex: 1, marginLeft: SPACING.md, justifyContent: "center" },
  dateInput: {
    padding: SPACING.md,
    borderRadius: SIZES.radiusSmall,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  buttonGroup: {  },
});

export default BookingScreen;
