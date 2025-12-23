import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import { calculateNights } from "../utils/calculateNights";
import { COLORS, SIZES, SPACING } from "../constaints/hotelTheme";

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

interface BookingSuccessScreenProps {
  booking: BookingData;
  onReset: () => void;
}

const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ booking, onReset }) => {
  const { room, formData } = booking;
  const nights = calculateNights(formData.checkIn, formData.checkOut);
  const finalTotalPrice = (nights > 0 ? nights : 1) * room.price;
  const mockBookingID = "BK" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.white }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View style={[styles.iconCircle, { backgroundColor: COLORS.success + "20" }]}>
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

        <View style={[styles.card, { backgroundColor: COLORS.lightGray }]}>
          <View style={styles.row}>
            <AppText variant="caption" color={COLORS.text}>
              Booking ID:
            </AppText>
            <AppText variant="caption" color={COLORS.primary} style={{ fontWeight: "bold" }}>
              {mockBookingID}
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

        <View style={styles.buttonGroup}>
          <AppButton
            title="Book Another Room"
            onPress={onReset}
            fullWidth
            style={styles.outlineButton}
          />
        </View>
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
