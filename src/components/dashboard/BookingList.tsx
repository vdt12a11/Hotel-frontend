import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AppText from '../AppText';
import BookingCard from './BookingCard';
import { COLORS, SIZES, SPACING } from '../../constaints/hotelTheme';
import { Booking } from '../../data/mockBookings';

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const pastBookingsCount = bookings.filter(b => b.status === 'past').length;
  const hasPastBookings = pastBookingsCount > 0;

  return (
    <View style={styles.container}>
      {hasPastBookings && (
        <AppText variant="caption" color={COLORS.lightBlack} style={styles.title}>
          {pastBookingsCount} Pending review
        </AppText>
      )}
      <FlatList
        data={bookings}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingCard booking={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl
  },
  title: {
    marginBottom: SPACING.md,
    fontWeight: '700',
    fontSize: SIZES.h3,
    paddingVertical: SPACING.md
  },
  listContent: {
    paddingRight: SPACING.md,
    paddingBottom: SPACING.md
  }
});

export default BookingList;
