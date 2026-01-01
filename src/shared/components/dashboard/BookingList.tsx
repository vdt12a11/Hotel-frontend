import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


import { COLORS, SIZES, SPACING } from '../../../constaints/hotelTheme';
import AppText from '../AppText';
import BookingCard from './BookingCard';

interface BookingListProps {
  bookings: any[];
  todayStr?: string;
}


const BookingList: React.FC<BookingListProps> = ({ bookings, todayStr }) => {
  // Helper to get check-in date from booking.date
  const getCheckInDate = (dateStr: string) => {
    if (!dateStr) return null;
    const checkIn = dateStr.split(' - ')[0];
    // date string có thể là YYYY-MM-DD hoặc các format khác, nên cố gắng parse đúng
    // Ưu tiên parse YYYY-MM-DD, nếu không thì trả về null
    if (/\d{4}-\d{2}-\d{2}/.test(checkIn)) {
      const d = new Date(checkIn);
      d.setHours(0,0,0,0);
      return d;
    }
    return null;
  };

  // Dùng todayStr nếu có, nếu không thì lấy ngày hôm nay local
  let today: Date;
  if (todayStr) {
    today = new Date(todayStr);
    today.setHours(0,0,0,0);
  } else {
    today = new Date();
    today.setHours(0,0,0,0);
  }

  // Lọc 3 booking có check-in date lớn hơn todayStr (gần nhất)
  const futureBookings = bookings
    .map(b => ({ ...b, checkIn: getCheckInDate(b.date) }))
    .filter(b => b.checkIn && b.checkIn > today)
    .sort((a, b) => (a.checkIn as Date).getTime() - (b.checkIn as Date).getTime())
    .slice(0, 3);

  // Nếu chưa đủ 3, lấy thêm các booking cũ nhất (checkIn <= today)
  let displayBookings = futureBookings;
  if (displayBookings.length < 3) {
    const pastBookings = bookings
      .map(b => ({ ...b, checkIn: getCheckInDate(b.date) }))
      .filter(b => b.checkIn && b.checkIn <= today)
      .sort((a, b) => (b.checkIn as Date).getTime() - (a.checkIn as Date).getTime())
      .slice(0, 3 - displayBookings.length);
    displayBookings = displayBookings.concat(pastBookings);
  }

  const pastBookingsCount = bookings.filter(b => {
    const d = getCheckInDate(b.date);
    return d && d < today;
  }).length;
  const hasPastBookings = pastBookingsCount > 0;

  return (
    <View style={styles.container}>
      {hasPastBookings && (
        <AppText variant="caption" color={COLORS.lightBlack} style={styles.title}>
          {pastBookingsCount} Pending review
        </AppText>
      )}
      <FlatList
        data={displayBookings}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Đảm bảo luôn có hotelName cho BookingCard
          const booking = {
            ...item,
            hotelName: item.hotelName || item.name || 'No name',
          };
          return <BookingCard booking={booking} />;
        }}
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
