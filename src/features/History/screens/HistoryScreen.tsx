import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, useWindowDimensions, StatusBar, Platform, RefreshControl, Modal, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AppText from "../../../shared/components/AppText";
import AppButton from "../../../shared/components/AppButton";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SPACING, SHADOWS } from '../../../constaints/hotelTheme';
import Config from 'react-native-config';
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
  phone?: string;
  email?: string;
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
  user: User;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ user }) => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [history, setHistory] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [checkedInBookings, setCheckedInBookings] = useState<Set<string>>(new Set());
  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [modalAction, setModalAction] = useState<'checkin' | 'checkout'>('checkin');

  const responsive = {
    headerPaddingH: Math.max(15, Math.min(25, 20 * (width / 375))),
  };

  console.log(user.userID);

  const fetchHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`${Config.API_URL}/history/${user.userID}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error((data as { message?: string }).message || 'Get history failed');
      }
      console.log(data);
      // Sắp xếp theo ngày mới nhất lên trước
      const sortedData = (data as BookingRecord[]).sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Giảm dần (mới nhất lên trước)
      });
      setHistory(sortedData);
    } catch (error) {
      console.log('Lỗi lấy lịch sử:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Fetch lại dữ liệu khi quay lại screen
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
      return () => {};
    }, [user.userID])
  );

  // Pull-to-refresh handler
  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchHistory().finally(() => setRefreshing(false));
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

  const handleCheckIn = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    console.log("handle checkin",bookingId);
    setModalAction('checkin');
    setIsCheckInModalVisible(true);
  };

  const handleConfirmModal = async () => {
    if (!selectedBookingId) return;

    try {
      if (modalAction === 'checkin') {
        const res = await fetch(`${Config.API_URL}/booking/${selectedBookingId}/checkin`, { method: "PATCH" });
        if (!res.ok) {
          console.log("Check-in thất bại", res.status);
          Alert.alert('Lỗi', 'Check-in thất bại. Vui lòng thử lại.');
        } else {
          setCheckedInBookings(prev => {
            const next = new Set(prev);
            next.add(selectedBookingId);
            return next;
          });
          console.log('Check-in confirmed for', selectedBookingId);
        }
      } else {
        const res = await fetch(`${Config.API_URL}/booking/${selectedBookingId}/checkout`, { method: "PATCH" });
        if (!res.ok) {
          console.log("Check-out thất bại", res.status);
          Alert.alert('Lỗi', 'Check-out thất bại. Vui lòng thử lại.');
        } else {
          setCheckedInBookings(prev => {
            const next = new Set(prev);
            next.delete(selectedBookingId);
            return next;
          });
          console.log('Check-out confirmed for', selectedBookingId);
        }
      }
    } catch (error) {
      console.log('Network error', error);
      Alert.alert('Lỗi', 'Có lỗi mạng. Vui lòng thử lại.');
    } finally {
      setIsCheckInModalVisible(false);
      setSelectedBookingId(null);
    }
  };

  const handleCancelCheckIn = () => {
    setIsCheckInModalVisible(false);
    setSelectedBookingId(null);
  };

  const handleCheckOut = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setModalAction('checkout');
    setIsCheckInModalVisible(true);
  };

  const renderItem = ({ item }: { item: BookingRecord }) => {
    const isCheckedIn = checkedInBookings.has(item._id);
    const canCheckOut = isCheckedIn;
    console.log("item id",item._id);
    // Check if today is within check-in and check-out dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const checkInDate = item.formData.checkIn ? new Date(item.formData.checkIn) : null;
    const checkOutDate = item.formData.checkOut ? new Date(item.formData.checkOut) : null;
    
    if (checkInDate) {
      checkInDate.setHours(0, 0, 0, 0);
    }
    if (checkOutDate) {
      checkOutDate.setHours(0, 0, 0, 0);
    }
    
    // Chỉ hiển thị button nếu hôm nay nằm trong khoảng check-in và check-out
    const isWithinBookingDates = 
      checkInDate && checkOutDate &&
      today >= checkInDate && 
      today <= checkOutDate;
    
    const isPending = item.status?.toLowerCase() === 'pending';
    const shouldShowButtons = isWithinBookingDates && !isPending;

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
            {item.room?.name || 'No name'}
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

        {item.formData.phone ? (
          <View style={styles.infoRow}>
            <AppText variant="caption" color={COLORS.textLight}>
              📞 Phone
            </AppText>
            <AppText 
              variant="body" 
              color={COLORS.textDark} 
              style={{ fontWeight: '500' }}
            >
              {item.formData.phone}
            </AppText>
          </View>
        ) : null}

        {item.formData.email ? (
          <View style={styles.infoRow}>
            <AppText variant="caption" color={COLORS.textLight}>
              ✉️ Email
            </AppText>
            <AppText 
              variant="body" 
              color={COLORS.textDark} 
              style={{ fontWeight: '500' }}
            >
              {item.formData.email}
            </AppText>
          </View>
        ) : null}

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
            {item.room?.price !== undefined ? `$${item.room.price}` : '--'}
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

      {shouldShowButtons && (
        <View style={styles.actionsRow}>
          <AppButton
            title="Check-in"
            onPress={() => handleCheckIn(item._id)}
            style={styles.actionButton}
            disabled={isCheckedIn}
          />
          <AppButton
            title="Check-out"
            onPress={() => handleCheckOut(item._id)}
            style={[
              styles.actionButton, 
              styles.checkOutButton,
              !canCheckOut && styles.disabledButton
            ]}
            disabled={!canCheckOut}
          />
        </View>
      )}
    </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary, paddingHorizontal: responsive.headerPaddingH }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            hitSlop={{top:10, left:10, right:10 }}
            style={styles.backCircle}
          >
            <Icon name="arrow-back-outline" size={28} color={COLORS.primary} />
          </TouchableOpacity>
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

      {/* Check-in Modal */}
      <Modal
        visible={isCheckInModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelCheckIn}
        statusBarTranslucent
        presentationStyle="overFullScreen"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText variant="title" color={COLORS.textDark} style={{ marginBottom: SPACING.lg }}>
              Xác nhận đặt phòng
            </AppText>
            <AppText
              variant="body"
              color={COLORS.textLight}
              style={{ marginBottom: SPACING.xl, fontSize: SIZES.body1 }}
            >
              {modalAction === 'checkin' ? 'Bạn đã nhận phòng chứ?' : 'Bạn muốn trả phòng chứ?'}
            </AppText>
            
            <View style={styles.modalButtonGroup}>
              <AppButton
                title="Hủy"
                onPress={handleCancelCheckIn}
                style={[styles.modalButton, styles.disabledButton]}
                textStyle={{ color: COLORS.textLight }}
              />
              <AppButton
                title="Đồng ý"
                onPress={handleConfirmModal}
                style={[styles.modalButton, { backgroundColor: COLORS.primary }]}
              />
            </View>
          </View>
        </View>
      </Modal>

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.primary}
            />
          }
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
    marginTop: SPACING.xl,
  },
  backButton: { 
    backgroundColor: COLORS.lightBlue,
    width: 100,
    borderWidth: 1,
    borderColor: COLORS.transparent,
  },
  backCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    alignSelf: 'flex-start',
    ...SHADOWS.medium,
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
    paddingBottom: SPACING.xxl * 2.5,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.xxl,
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
  actionsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  actionButton: {
    flex: 1,
  },
  checkOutButton: {
    backgroundColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
  totalPriceBox: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: SIZES.radiusSmall,
    alignItems: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SPACING.lg,
    width: '80%',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.md,
  },
});

export default HistoryScreen;