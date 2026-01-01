
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { calculateNights } from "../../../utils/calculateNights";
import { COLORS, SIZES, SPACING } from "../../../constaints/hotelTheme";
import { AppButton, AppText } from "../../../shared/components";
import Config from "react-native-config";
interface Room {
  name: string;
  price: number;
}

interface BookingFormData {
  name: string;
  checkIn: string;
  checkOut: string;
}

interface BookingData {
  room: Room;
  formData: BookingFormData;
  totalPrice: number;
}


type PaymentStatus = 'pending' | 'booked' | 'failed';

interface BookingSuccessScreenProps {
  booking: BookingData;
  onReset: () => void;
  orderId?: string |null;
}


const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ booking, onReset,orderId }) => {
  const { room, formData } = booking;
  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const finalTotalPrice = (nights > 0 ? nights : 1) * room.price;
  // Giả lập bookingId, thực tế nên lấy từ backend
  const mockBookingID = "BK" + Math.random().toString(36).substr(2, 9).toUpperCase();

  // State cho trạng thái thanh toán
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [bookingId] = useState<string|null|undefined>(orderId); // bookingId nên lấy từ backend khi tạo booking
  // Sửa lỗi NodeJS.Timeout: dùng number cho intervalRef (React Native)
  const intervalRef = useRef<number | null>(null);
  // Đếm số lần polling để mock trạng thái
  const pollingCountRef = useRef<number>(0);

  // Hàm kiểm tra trạng thái thanh toán
  const checkPaymentStatus = async () => {
    // TODO: Gọi API thật ở đây, ví dụ:
    const res = await fetch(`${Config.API_URL}/payment/status/${bookingId}`);
    console.log("booking Id",bookingId);
    const data = await res.json();
    setPaymentStatus(data.status); // status: 'pending' | 'success' | 'failed'

    // Mock API: random trạng thái sau 2 lần polling
    // Xoá đoạn này khi dùng API thật
  };

  // Polling mỗi 5s
  useEffect(() => {
    if (paymentStatus === 'pending') {
      pollingCountRef.current = 0; // reset count mỗi lần retry
      checkPaymentStatus(); // Gọi lần đầu
      intervalRef.current = setInterval(checkPaymentStatus, 5000) as unknown as number;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paymentStatus]);

  // Khi chuyển sang success/failed thì dừng polling
  useEffect(() => {
    if (paymentStatus !== 'pending' && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [paymentStatus]);

  // UI cho từng trạng thái
  const renderHeader = () => {
    if (paymentStatus === 'pending') {
      return (
        <View style={styles.headerContainer}>
          <View style={[styles.iconCircle, { backgroundColor: COLORS.primary + '20' }]}> 
            <ActivityIndicator size={40} color={COLORS.primary} />
          </View>
          <AppText variant="title" color={COLORS.textDark}>
            Processing payment…
          </AppText>
          <AppText variant="body" color={COLORS.lightBlack} align="center" style={{ marginTop: SPACING.md }}>
            Payment is being processed
          </AppText>
        </View>
      );
    }
    if (paymentStatus === 'booked') {
      return (
        <View style={styles.headerContainer}>
          <View style={[styles.iconCircle, { backgroundColor: COLORS.success + '20' }]}> 
            <AppText variant="title" color={COLORS.success}>
              ✓
            </AppText>
          </View>
          <AppText variant="title" color={COLORS.textDark}>
            Booking Confirmed!
          </AppText>
          <AppText variant="body" color={COLORS.lightBlack} align="center" style={{ marginTop: SPACING.md }}>
            Your reservation has been successfully placed
          </AppText>
        </View>
      );
    }
    if (paymentStatus === 'failed') {
      const errorColor = '#FF0000';
      return (
        <View style={styles.headerContainer}>
          <View style={[styles.iconCircle, { backgroundColor: errorColor + '20' }]}> 
            <AppText variant="title" color={errorColor}>
              ❌
            </AppText>
          </View>
          <AppText variant="title" color={errorColor}>
            Payment failed. Please try again
          </AppText>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderHeader()}

        {paymentStatus === 'booked' && (
          <View style={[styles.card, { backgroundColor: COLORS.lightGray }]}> 
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.text}>
                Booking ID:
              </AppText>
              <AppText variant="caption" color={COLORS.primary} style={{ fontWeight: "bold" }}>
                {bookingId}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.text}>
                Guest:
              </AppText>
              <AppText variant="caption" color={COLORS.textDark} style={{ fontWeight: "600" }}>
                {formData?.name || "Guest"}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.text}>
                Room:
              </AppText>
              <AppText variant="caption" color={COLORS.textDark} style={{ fontWeight: "600", maxWidth: "60%", textAlign: "right" }} numberOfLines={1}>
                {room?.name || "Room Name"}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.text}>
                Check-in:
              </AppText>
              <AppText variant="caption" color={COLORS.textDark} style={{ fontWeight: "600" }}>
                {formData?.checkIn || "TBD"}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.text}>
                Check-out:
              </AppText>
              <AppText variant="caption" color={COLORS.textDark} style={{ fontWeight: "600" }}>
                {formData?.checkOut || "TBD"}
              </AppText>
            </View>
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.text}>
                Duration:
              </AppText>
              <AppText variant="caption" color={COLORS.textDark} style={{ fontWeight: "600" }}>
                {nights} night(s)
              </AppText>
            </View>
            <View style={[styles.divider, { backgroundColor: COLORS.border }]} />
            <View style={styles.row}>
              <AppText variant="caption" color={COLORS.primary} style={{ fontWeight: "600",fontSize:20 }}>
                Total:
              </AppText>
              <AppText variant="subtitle" color={COLORS.primary}>
                ${finalTotalPrice}
              </AppText>
            </View>
          </View>
        )}

        {paymentStatus === 'booked' && (
          <View style={styles.buttonGroup}>
            <AppButton
              title="Book Another Room"
              onPress={onReset}
              fullWidth
              style={styles.outlineButton}
            />
          </View>
        )}

        {paymentStatus === 'failed' && (
          <View style={styles.buttonGroup}>
            <AppButton
              title="Retry"
              onPress={() => {
                // Reset lại trạng thái để thử lại
                setPaymentStatus('pending');
                pollingCountRef.current = 0;
              }}
              fullWidth
              style={styles.outlineButton}
            />
            <AppButton
              title="Back"
              onPress={onReset}
              fullWidth
              style={styles.outlineButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.padding, alignItems: "center", paddingTop: SPACING.xxl*2, paddingBottom: SPACING.xxl },
  headerContainer: { alignItems: "center", marginBottom: SPACING.xxl },
  iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: "center", alignItems: "center", marginBottom: SPACING.lg },
  title: { marginBottom: SPACING.md },
  card: { width: "100%", borderRadius: SIZES.radiusLarge, padding: SIZES.padding, marginBottom: SPACING.xxl },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.md, alignItems: "center" },
  divider: { height: 1, marginVertical: SPACING.md },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  buttonGroup: { width: "100%", gap: SPACING.md },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});

export default BookingSuccessScreen;
