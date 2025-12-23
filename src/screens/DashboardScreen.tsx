import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { AppText } from '../components';
import { COLORS, SHADOWS, SIZES, SPACING, FONTS } from '../constaints/hotelTheme';

// Mock Data - Upcoming Bookings
const upcomingBookings = [
  {
    id: 1,
    roomName: 'Deluxe King Room',
    checkInDate: '25/12/2025',
    checkOutDate: '28/12/2025',
    status: 'Confirmed',
    price: 150,
    nights: 3,
  },
  {
    id: 2,
    roomName: 'Ocean View Suite',
    checkInDate: '01/01/2026',
    checkOutDate: '05/01/2026',
    status: 'Confirmed',
    price: 250,
    nights: 4,
  },
  {
    id: 3,
    roomName: 'Garden Villa',
    checkInDate: '10/01/2026',
    checkOutDate: '15/01/2026',
    status: 'Pending',
    price: 300,
    nights: 5,
  },
];

// Mock Data - Past Bookings
const pastBookings = [
  {
    id: 101,
    roomName: 'Standard Room',
    checkInDate: '15/12/2025',
    checkOutDate: '18/12/2025',
    status: 'Completed',
    price: 100,
    nights: 3,
  },
  {
    id: 102,
    roomName: 'Premium Double Room',
    checkInDate: '08/12/2025',
    checkOutDate: '12/12/2025',
    status: 'Completed',
    price: 180,
    nights: 4,
  },
  {
    id: 103,
    roomName: 'Family Suite',
    checkInDate: '01/12/2025',
    checkOutDate: '04/12/2025',
    status: 'Completed',
    price: 350,
    nights: 3,
  },
];

interface Booking {
  id: number;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  price: number;
  nights: number;
}

// Booking Card Component
const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return COLORS.success;
      case 'Pending':
        return COLORS.warning;
      case 'Completed':
        return COLORS.secondary;
      default:
        return COLORS.text;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return `${COLORS.success}20`;
      case 'Pending':
        return `${COLORS.warning}20`;
      case 'Completed':
        return `${COLORS.secondary}20`;
      default:
        return COLORS.lightGray;
    }
  };

  const totalPrice = booking.price * booking.nights;

  return (
    <View style={[styles.card, { ...SHADOWS.medium }]}>
      {/* Header: Room Name + Status */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <AppText
            variant="subtitle"
            color={COLORS.textDark}
            style={styles.roomName}
            numberOfLines={2}
          >
            {booking.roomName}
          </AppText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(booking.status) }]}>
          <AppText 
            variant="body" 
            color={getStatusColor(booking.status)} 
            style={styles.statusText}
          >
            {booking.status}
          </AppText>
        </View>
      </View>

      {/* Dates Section */}
      <View style={styles.datesSection}>
        <View style={styles.dateBlock}>
          <AppText variant="body" color={COLORS.textLight} style={styles.dateLabel}>
            Check-in
          </AppText>
          <AppText
            variant="body"
            color={COLORS.textDark}
            style={styles.dateValue}
          >
            {booking.checkInDate}
          </AppText>
        </View>

        <View style={styles.dateArrow}>
          <View style={styles.arrow} />
        </View>

        <View style={styles.dateBlock}>
          <AppText variant="body" color={COLORS.textLight} style={styles.dateLabel}>
            Check-out
          </AppText>
          <AppText
            variant="body"
            color={COLORS.textDark}
            style={styles.dateValue}
          >
            {booking.checkOutDate}
          </AppText>
        </View>

        <View style={styles.nightsBadge}>
          <AppText variant="body" color={COLORS.white} style={styles.nightsText}>
            {booking.nights}N
          </AppText>
        </View>
      </View>

      {/* Price Section */}
      <View style={styles.priceSection}>
        <View>
          <AppText variant="body" color={COLORS.textLight} style={styles.priceLabel}>
            Total Price
          </AppText>
          <AppText
            variant="body"
            color={COLORS.primary}
            style={styles.totalPrice}
          >
            ${totalPrice}
          </AppText>
          <AppText variant="body" color={COLORS.textLight} style={styles.pricePerNight}>
            ${booking.price}/night
          </AppText>
        </View>
      </View>
    </View>
  );
};

const DashboardScreen = () => {
  const { width } = useWindowDimensions();

  const responsive = useMemo(() => {
    const isMobile = width < 600;
    const scale = width / 375;
    return {
      containerPadding: isMobile ? Math.max(12, Math.min(20, 16 * scale)) : SPACING.xl,
      headerPaddingV: isMobile ? SPACING.lg : SPACING.xl,
      sectionMarginTop: isMobile ? SPACING.lg : SPACING.xxl,
      headerFontSize: isMobile ? SIZES.h2 : SIZES.h1,
      sectionTitleSize: isMobile ? SIZES.h4 : SIZES.h3,
    };
  }, [width]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={[
          { type: 'header' },
          { type: 'upcomingTitle' },
          ...upcomingBookings.map((b) => ({ ...b, type: 'upcoming' })),
          { type: 'pastTitle' },
          ...pastBookings.map((b) => ({ ...b, type: 'past' })),
          { type: 'spacer' },
        ]}
        keyExtractor={(item: any, index) => `${item.type}-${item.id ?? index}`}
        renderItem={({ item }: { item: any }) => {
          if (item.type === 'header') {
            return (
              <View style={[styles.headerContainer, { paddingHorizontal: responsive.containerPadding }]}>
                <AppText
                  variant="title"
                  color={COLORS.textDark}
                  style={[styles.mainTitle, { fontSize: responsive.headerFontSize*1.5 }]}
                >
                  My Bookings
                </AppText>
                <AppText variant="body" color={COLORS.textLight} style={styles.subtitle}>
                  {upcomingBookings.length} upcoming, {pastBookings.length} past stays
                </AppText>
              </View>
            );
          }

          if (item.type === 'upcomingTitle') {
            return (
              <View
                style={[
                  styles.sectionHeader,
                  { 
                    paddingHorizontal: responsive.containerPadding,
                    marginTop: responsive.sectionMarginTop,
                  }
                ]}
              >
                <View style={styles.sectionTitleWrapper}>
                  <View style={styles.sectionIndicator} />
                  <AppText
                    variant="subtitle"
                    color={COLORS.textDark}
                    style={[styles.sectionTitle, { fontSize: responsive.sectionTitleSize }]}
                  >
                    Upcoming Stays
                  </AppText>
                </View>
              </View>
            );
          }

          if (item.type === 'pastTitle') {
            return (
              <View
                style={[
                  styles.sectionHeader,
                  { 
                    paddingHorizontal: responsive.containerPadding,
                    marginTop: responsive.sectionMarginTop,
                  }
                ]}
              >
                <View style={styles.sectionTitleWrapper}>
                  <View style={[styles.sectionIndicator, { backgroundColor: COLORS.textLight }]} />
                  <AppText
                    variant="subtitle"
                    color={COLORS.textDark}
                    style={[styles.sectionTitle, { fontSize: responsive.sectionTitleSize }]}
                  >
                    Past Stays
                  </AppText>
                </View>
              </View>
            );
          }

          if (item.type === 'spacer') {
            return <View style={{ height: SPACING.xl }} />;
          }

          if (item.type === 'upcoming' || item.type === 'past') {
            return (
              <View style={{ paddingHorizontal: responsive.containerPadding }}>
                <BookingCard booking={item} />
              </View>
            );
          }

          return null;
        }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flatListContent: {
    paddingBottom: SPACING.xxl*2,
  },
  headerContainer: {
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.md,
    marginTop:SIZES.padding*2
  },
  mainTitle: {
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: SIZES.body3,
  },
  sectionHeader: {
    marginBottom: SPACING.lg,
  },
  sectionTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  roomName: {
    fontWeight: '700',
    fontSize: SIZES.h4,
    lineHeight: 22,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: SIZES.radiusSmall,
  },
  statusText: {
    fontWeight: '600',
    fontSize: SIZES.body4,
  },
  datesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusSmall,
  },
  dateBlock: {
    flex: 1,
  },
  dateLabel: {
    fontSize: SIZES.body4,
    marginBottom: 4,
  },
  dateValue: {
    fontWeight: '600',
    fontSize: SIZES.body2,
  },
  dateArrow: {
    marginHorizontal: SPACING.sm,
  },
  arrow: {
    width: 16,
    height: 2,
    backgroundColor: COLORS.primary,
  },
  nightsBadge: {
    marginLeft: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusSmall,
  },
  nightsText: {
    fontWeight: '700',
    fontSize: SIZES.body4,
  },
  priceSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.lg,
  },
  priceLabel: {
    fontSize: SIZES.body4,
    marginBottom: 4,
  },
  totalPrice: {
    fontWeight: '700',
    fontSize: SIZES.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  pricePerNight: {
    fontSize: SIZES.body4,
  },
});

export default DashboardScreen;
