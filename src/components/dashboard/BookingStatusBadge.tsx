import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../../components/AppText';
import { COLORS, SIZES, SPACING } from '../../constaints/hotelTheme';

interface BookingStatusBadgeProps {
  status: 'upcoming' | 'past';
}

const statusMap = {
  upcoming: {
    label: 'Upcoming',
    color: COLORS.white,
    background: COLORS.lightBlue,
  },
  past: {
    label: 'Past',
    color: COLORS.textDark,
    background: COLORS.border,
  },
};

const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const { label, color, background } = statusMap[status];
  return (
    <View style={[styles.badge, { backgroundColor: background }]}> 
      <AppText variant="caption" style={{ color, fontWeight: 'bold' }}>{label}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: SIZES.radiusSmall,
    paddingHorizontal: SPACING.md,
    paddingVertical: 2,
    marginBottom: SPACING.xs,
  },
});

export default BookingStatusBadge;
