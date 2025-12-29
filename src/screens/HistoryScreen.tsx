import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, useWindowDimensions, StatusBar, Platform } from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { COLORS, SIZES, SPACING, SHADOWS } from '../constaints/hotelTheme';

interface User {
  userID: string;
  name: string;
}

interface Room {
  name: string;
  price: number;
}

interface FormData {
  name: string;
  checkIn?: string;
  checkOut?: string;
}

interface BookingRecord {
  _id: string;
  room: Room;
  formData: FormData;
  createdAt: string;
  status: string;
  totalPrice?: number;
}

interface HistoryScreenProps {
  onBack: () => void;
  user: User;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack, user }) => {
  const { width } = useWindowDimensions();
  const [history, setHistory] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const responsive = {
    headerPaddingH: Math.max(15, Math.min(25, 20 * (width / 375))),
  };

  console.log(user.userID);

  const fetchHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`http://10.0.2.2:3000/history/${user.userID}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error((data as { message?: string }).message || 'Get history failed');
      }
      console.log(data);
      setHistory(data as BookingRecord[]);
    } catch (error) {
      console.log('Lỗi lấy lịch sử:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'cancelled':
        return COLORS.danger;
      default:
        return COLORS.secondary;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return `${COLORS.success}20`;
      case 'pending':
        return `${COLORS.warning}20`;
      case 'cancelled':
        return `${COLORS.danger}20`;
      default:
        return `${COLORS.secondary}20`;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const renderItem = ({ item }: { item: BookingRecord }) => (
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
            {item.room.name}
          </AppText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(item.status) }]}>
          <AppText 
            variant="body" 
            color={getStatusColor(item.status)} 
            style={styles.statusText}
          >
            {item.status}
          </AppText>
        </View>
      </View>

      {/* Guest & Dates Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <AppText variant="caption" color={COLORS.textLight}>
            👤 Guest
          </AppText>
          <AppText 
            variant="body" 
            color={COLORS.textDark} 
            style={{ fontWeight: '600' }}
          >
            {item.formData.name}
          </AppText>
        </View>

        {item.formData.checkIn && item.formData.checkOut && (
          <View style={styles.infoRow}>
            <AppText variant="caption" color={COLORS.textLight}>
              📅 Dates
            </AppText>
            <AppText 
              variant="body" 
              color={COLORS.textDark} 
              style={{ fontWeight: '500' }}
            >
              {formatDate(item.formData.checkIn)} → {formatDate(item.formData.checkOut)}
            </AppText>
          </View>
        )}

        <View style={styles.infoRow}>
          <AppText variant="caption" color={COLORS.textLight}>
            📅 Booked on
          </AppText>
          <AppText 
            variant="body" 
            color={COLORS.textDark} 
            style={{ fontWeight: '500' }}
          >
            {formatDate(item.createdAt)}
          </AppText>
        </View>
      </View>

      {/* Price Section */}
      <View style={styles.priceSection}>
        <View>
          <AppText variant="caption" color={COLORS.textLight}>
            Price per night
          </AppText>
          <AppText 
            variant="body" 
            color={COLORS.primary} 
            style={{ fontWeight: 'bold', fontSize: SIZES.body1 }}
          >
            ${item.room.price}
          </AppText>
        </View>
        {item.totalPrice && (
          <View style={styles.totalPriceBox}>
            <AppText variant="caption" color={COLORS.textLight}>
              Total
            </AppText>
            <AppText 
              variant="body" 
              color={COLORS.primary} 
              style={{ fontWeight: '700', fontSize: SIZES.h4 }}
            >
              ${item.totalPrice}
            </AppText>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary, paddingHorizontal: responsive.headerPaddingH }]}>
        <View style={styles.headerTop}>
          <AppButton
            title="Back"
            onPress={onBack}
            style={styles.backButton}
          />
        </View>
        <AppText 
          variant="title" 
          color={COLORS.white}
          style={styles.headerTitle}
        >
          Booking History
        </AppText>
        <AppText 
          variant="body" 
          color={COLORS.primaryLight}
          style={{ marginTop: SPACING.xs }}
        >
          {history.length} {history.length === 1 ? 'booking' : 'bookings'}
        </AppText>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <AppText variant="body" color={COLORS.textLight}>
            Loading...
          </AppText>
        </View>
      ) : history.length > 0 ? (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={[styles.listContent, { paddingHorizontal: responsive.headerPaddingH }]}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AppText variant="title" color={COLORS.textLight} style={{ marginBottom: SPACING.md }}>
            📋
          </AppText>
          <AppText variant="subtitle" color={COLORS.textDark}>
            No bookings yet
          </AppText>
          <AppText variant="body" color={COLORS.textLight} style={{ marginTop: SPACING.xs }}>
            Start exploring and book your first room
          </AppText>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    paddingVertical: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? SPACING.lg * 2 : SPACING.lg,
  },
  headerTop: {
    marginBottom: SPACING.md,
  },
  backButton: { 
    backgroundColor: COLORS.lightBlue,
    width: 100,
    borderWidth: 1,
    borderColor: COLORS.transparent,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.h2,
    marginBottom: SPACING.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  listContent: { 
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
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
  infoSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceBox: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'flex-end',
  },
});

export default HistoryScreen;
