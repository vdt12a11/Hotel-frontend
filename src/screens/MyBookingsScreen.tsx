import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import AppText from '../components/AppText';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constaints/hotelTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { User, BookingHistoryItem } from '../types';
import ScreenContainer from '../components/layout/ScreenContainer';

interface MyBookingsScreenProps {
  user: User | null;
}

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ user }) => {
  // In a real app, you would fetch "active" or "upcoming" bookings here.
  // For now, we can reuse the history type or a similar structure.
  // Mock data or empty state for now.
  const [upcomingBookings, setUpcomingBookings] = useState<BookingHistoryItem[]>([]);

  // Placeholder fetch (replace with real API call later)
  useEffect(() => {
    // Simulate fetching
    // setUpcomingBookings([...]);
  }, []);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="calendar-outline" size={80} color={COLORS.textLight} />
      <AppText variant="subtitle" style={{ marginTop: SPACING.md, color: COLORS.text }}>Sắp tới</AppText>
      <AppText variant="body" style={{ color: COLORS.textLight, marginTop: SPACING.sm, textAlign: 'center' }}>
        Các chuyến đi sắp tới của bạn sẽ hiện ở đây.
      </AppText>
    </View>
  );

  const renderItem = ({ item }: { item: BookingHistoryItem }) => (
    <View style={[styles.card, { ...SHADOWS.light }]}>
      <View style={{ flexDirection: 'row', marginBottom: SPACING.sm }}>
        <Image
          source={{ uri: item.room.image || "https://via.placeholder.com/100" }}
          style={{ width: 80, height: 80, borderRadius: SIZES.radiusSmall, marginRight: SPACING.md }}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppText variant="body" style={{ fontWeight: "600" }}>{item.room.name}</AppText>
          <AppText variant="caption" color={COLORS.textLight}>{item.formData.checkIn} - {item.formData.checkOut}</AppText>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <View style={[styles.badge, { backgroundColor: COLORS.secondary }]}>
              <AppText variant="caption" style={{ color: COLORS.white, fontSize: 10 }}>SẮP TỚI</AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenContainer withScroll={false}>
      <View style={styles.header}>
        <AppText variant="title">Chuyến đi</AppText>
      </View>

      {upcomingBookings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={upcomingBookings}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Push down a bit
  },
  listContent: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  }
});

export default MyBookingsScreen;
