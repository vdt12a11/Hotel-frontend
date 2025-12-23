import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import { COLORS, SIZES, SPACING, SHADOWS } from "../constaints/hotelTheme";

export default function RoomCard({ room, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { ...SHADOWS.medium }]}
      onPress={onPress}
    >
      <AppText variant="subtitle" color={COLORS.textDark} style={{ fontWeight: "600" }}>
        {room.name}
      </AppText>
      <AppText variant="body" color={COLORS.primary} style={{ marginTop: SPACING.md, fontWeight: "600" }}>
        Giá: ${room.price} / đêm
      </AppText>
      <AppText variant="body" color={COLORS.text} style={{ marginTop: SPACING.sm }}>
        Sức chứa: {room.capacity} người
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
    borderRadius: SIZES.radiusLarge,
  },
});
