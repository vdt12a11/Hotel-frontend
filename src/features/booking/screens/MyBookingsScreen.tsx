import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import { COLORS, SIZES, SPACING, SHADOWS } from '../../../constaints/hotelTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { User, BookingHistoryItem } from '../../../types';
import { AppText } from '../../../shared/components';
import ScreenContainer from '../../../shared/components/layout/ScreenContainer';
import { mockBookings } from '../../../data/mockBookings';

interface MyBookingsScreenProps {
  user: User | null;
}

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ user }) => {
  // In a real app, you would fetch "active" or "upcoming" bookings here.
  // For now, we can reuse the history type or a similar structure.
  // Mock data or empty state for now.
  const [upcomingBookings, setUpcomingBookings] = useState<BookingHistoryItem[]>([]);

  // Load mock bookings data
  useEffect(() => {
    // Convert mockBookings to BookingHistoryItem format for demo
    const mockData: BookingHistoryItem[] = mockBookings
      .filter(booking => booking.status === 'upcoming')
      .map((booking, index) => ({
        _id: booking.id,
        room: {
          id: booking.id,
          name: booking.hotelName,
          image: booking.image,
          bed: '1 King Bed',
          view: 'Ocean View',
          price: 1500000,
          capacity: 2,
        },
        formData: {
          name: 'Guest',
          checkIn: booking.date.split('-')[0],
          checkOut: booking.date.split('-')[1],
        },
        createdAt: new Date().toISOString(),
        status: booking.status,
      }));
    setUpcomingBookings(mockData);
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
    <View style={[styles.card, { ...SHADOWS.medium }]}>
      {/* Card Image */}
      <Image
        source={{ uri: item.room.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=200&fit=crop" }}
        style={styles.cardImage}
      />

      {/* Card Content */}
      <View style={styles.cardContent}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.md }}>
          <View style={{ flex: 1 }}>
            <AppText variant="subtitle" style={{ fontWeight: "700", marginBottom: SPACING.xs }}>{item.room.name}</AppText>
            <AppText variant="caption" color={COLORS.textLight}>📅 {item.formData.checkIn} → {item.formData.checkOut}</AppText>
          </View>
          <View style={[styles.badge, { backgroundColor: COLORS.success }]}>
            <AppText variant="caption" style={{ color: COLORS.white, fontSize: 10, fontWeight: '600' }}>SẮP TỚI</AppText>
          </View>
        </View>

        {/* Room Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Icon name="bed-outline" size={16} color={COLORS.primary} />
            <AppText variant="caption" color={COLORS.textLight} style={{ marginLeft: SPACING.xs }}>
              {item.room.bed}
            </AppText>
          </View>
          <View style={styles.detailItem}>
            <Icon name="eye-outline" size={16} color={COLORS.primary} />
            <AppText variant="caption" color={COLORS.textLight} style={{ marginLeft: SPACING.xs }}>
              {item.room.view}
            </AppText>
          </View>
        </View>

        {/* Price */}
        <View style={{ marginTop: SPACING.md, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border }}>
          <AppText variant="caption" color={COLORS.textLight}>Giá mỗi đêm</AppText>
          <AppText variant="body" style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: SIZES.h4 }}>
            ${item.room.price.toLocaleString()}
          </AppText>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.screenBackGround }]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <AppText variant="title" color={COLORS.white} style={{ fontWeight: 'bold' }}>Chuyến đi</AppText>
        <AppText variant="body" color={COLORS.primaryLight} style={{ marginTop: SPACING.xs }}>
          Các chuyến đi sắp tới của bạn
        </AppText>
      </View>

      {upcomingBookings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={upcomingBookings}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? SPACING.lg * 2 : SPACING.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  listContent: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    backgroundColor: COLORS.lightGray,
  },
  cardContent: {
    padding: SPACING.lg,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: SIZES.radiusSmall,
  }
});

export default MyBookingsScreen;
