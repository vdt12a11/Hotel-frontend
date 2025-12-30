import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, SIZES, SPACING, SHADOWS } from '../../../constaints/hotelTheme';
import BookingStatusBadge from './BookingStatusBadge';
import AppText from '../AppText';

interface BookingCardProps {
  booking: {
    id: string;
    hotelName: string;
    image: string;
    date: string; // e.g. '2025-12-30 - 2026-01-01' or '2025-12-30'
    status?: string;
  };
}
const today = new Date();
today.setHours(0, 0, 0, 0);
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}-${mm}-${dd}`;
console.log(todayStr); // Sẽ ra đúng ngày local, ví dụ: "2025-12-30"
const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  console.log('BookingCard booking:', booking);
  console.log('BookingCard hotelName:', booking.hotelName);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const ratingIcons = [
    { name: 'sad-outline', value: 1 },
    { name: 'happy-outline', value: 2 },
    { name: 'heart-outline', value: 3 },
    { name: 'star-outline', value: 4 },
  ];
  // Determine status based on check-in date
  let computedStatus: 'past' | 'upcoming' = 'upcoming';
  // Extract check-in date from booking.date (format: 'YYYY-MM-DD - YYYY-MM-DD' or 'YYYY-MM-DD')
  let checkInDateStr = booking.date?.split(' - ')[0];
  if (checkInDateStr) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const checkInDate = new Date(checkInDateStr);
    checkInDate.setHours(0,0,0,0);
    if (checkInDate < today) {
      computedStatus = 'past';
    } else {
      computedStatus = 'upcoming';
    }
  }
  return (
    <View style={[styles.card, { ...SHADOWS.medium }]}> 
      <View style={styles.cardContent}>
              <Image source={{ uri: booking.image || 'https://via.placeholder.com/80' }} style={styles.image} />
        <View style={styles.info}>
          <BookingStatusBadge status={computedStatus} />
                <AppText variant="body" color={COLORS.textDark} style={styles.hotelName} numberOfLines={1}>
                  {booking.hotelName || 'No name'}
                </AppText>
                <AppText variant="caption" color={COLORS.textLight} style={styles.date}>
                  {booking.date || ''}
                </AppText>
        </View>
      </View>
      
      {computedStatus === 'past' && (
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