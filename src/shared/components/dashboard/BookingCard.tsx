import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, SIZES, SPACING, SHADOWS } from '../../../constaints/hotelTheme';
import { Booking } from '../../../data/mockBookings';
import BookingStatusBadge from './BookingStatusBadge';
import AppText from '../AppText';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const ratingIcons = [
    { name: 'sad-outline', value: 1 },
    { name: 'happy-outline', value: 2 },
    { name: 'heart-outline', value: 3 },
    { name: 'star-outline', value: 4 },
  ];
  return (
    <View style={[styles.card, { ...SHADOWS.medium }]}> 
      <View style={styles.cardContent}>
        <Image source={{ uri: booking.image }} style={styles.image} />
        <View style={styles.info}>
          <BookingStatusBadge status={booking.status} />
          <AppText variant="body" color={COLORS.textDark} style={styles.hotelName} numberOfLines={1}>
            {booking.hotelName}
          </AppText>
          <AppText variant="caption" color={COLORS.textLight} style={styles.date}>
            {booking.date}
          </AppText>
        </View>
      </View>
      
      {booking.status === 'past' && (
        <>
          <View style={styles.divider} />
          <View style={styles.footer}>
            <AppText variant="caption" color={COLORS.textLight} style={styles.footerText}>
              How was your stay?
            </AppText>
            <View style={styles.ratingIcons}>
              {ratingIcons.map((icon, idx) => (
                <React.Fragment key={icon.value}>
                  <TouchableOpacity
                    onPress={() => setSelectedRating(icon.value)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={icon.name as any}
                      size={26}
                      color={selectedRating === icon.value ? COLORS.primary : COLORS.textLight}
                    />
                  </TouchableOpacity>
                  {idx < ratingIcons.length - 1 && <View style={styles.iconDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    marginRight: SPACING.md,
    // overflow: 'hidden', // Removed to show shadow
    borderWidth: 1.5,
    borderColor: COLORS.border
  },
  cardContent: {
    flexDirection: 'row',
    padding: SPACING.md
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius,
    resizeMode: 'cover'
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
    justifyContent: 'center'
  },
  hotelName: {
    fontWeight: '700',
    fontSize: SIZES.base * 1.8,
    marginBottom: SPACING.xs
  },
  date: {
    fontSize: SIZES.base * 1.4
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md
  },
  footer: {
    padding: SPACING.md
  },
  footerText: {
    marginBottom: SPACING.sm,
    fontSize: SIZES.base * 1.3
  },
  ratingIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border
  }
});

export default BookingCard;