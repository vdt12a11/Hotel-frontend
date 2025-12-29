import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, AppInput, AppButton, DateRangePicker, RoomCard, ScreenContainer, CustomModal } from '../../../components';
import { COLORS, SPACING, SHADOWS, SIZES } from '../../../constaints/hotelTheme';
import { Room } from '../../../types';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock data - Day 2 strategy: "Mock It Till You Make It"
const mockRooms: Room[] = [
    {
        id: '101',
        name: 'Deluxe Room 101',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
        size: '35m²',
        bed: '1 King Bed',
        view: 'Ocean View',
        price: 1500000,
        capacity: 2
    },
    {
        id: '102',
        name: 'Standard Room 102',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        size: '25m²',
        bed: '2 Single Beds',
        view: 'City View',
        price: 1000000,
        capacity: 2
    }
];

const CheckInScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    // State management - hardcoded values for Day 2
    const [bookingId, setBookingId] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [checkInDate, setCheckInDate] = useState<Date>(new Date());
    const [checkOutDate, setCheckOutDate] = useState<Date>(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });
    const [guestName, setGuestName] = useState<string>('');
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    // Mock search function - Day 2: không gọi API, chỉ tìm trong mock data
    const handleSearchBooking = () => {
        if (!bookingId.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập mã booking');
            return;
        }

        // Mock: Tự động chọn phòng đầu tiên khi search
        setSelectedRoom(mockRooms[0]);
        setGuestName('John Doe'); // Hardcoded guest name
        Alert.alert('Thành công', `Tìm thấy booking: ${bookingId}`);
    };

    // Mock check-in function - Day 2: chỉ hiển thị modal, không lưu DB
    const handleCheckIn = () => {
        if (!selectedRoom) {
            Alert.alert('Lỗi', 'Vui lòng tìm booking trước');
            return;
        }

        if (!guestName.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên khách');
            return;
        }

        // Mock success - show modal
        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        // Reset form
        setBookingId('');
        setSelectedRoom(null);
        setGuestName('');
        // Navigate back to Home tab
        navigation.goBack();
    };

    return (
        <ScreenContainer withScroll={true}>
            <View style={[styles.container, { paddingTop: 40 }]}> 
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    hitSlop={{top:10, left:10, right:10, bottom:10}}
                    style={styles.backCircle}
                >
                    <Icon name="arrow-back-outline" size={28} color={COLORS.primary} />
                </TouchableOpacity>             
                <View style={styles.header}>
                    <Icon name="log-in-outline" size={40} color={COLORS.primary} />
                    <AppText variant="title" style={styles.title}>Check-in Khách Sạn</AppText>
                    <AppText variant="body" style={styles.subtitle}>
                        Nhập mã booking để bắt đầu check-in
                    </AppText>
                </View>

                <View style={styles.section}>
                    <AppInput
                        label="Mã Booking"
                        placeholder="Nhập mã booking (VD: BK001)"
                        value={bookingId}
                        onChangeText={setBookingId}
                    />
                    <AppButton
                        title="Tìm Booking"
                        onPress={handleSearchBooking}
                        style={styles.searchButton}
                    />
                </View>

                {selectedRoom && (
                    <>
                        <View style={styles.section}>
                            <AppText variant="subtitle" style={styles.sectionTitle}>Thông tin phòng</AppText>
                            <RoomCard
                                room={selectedRoom}
                                onPress={() => { }}
                            />
                        </View>

                        <View style={styles.section}>
                            <AppText variant="subtitle" style={styles.sectionTitle}>Thời gian lưu trú</AppText>
                            <DateRangePicker
                                checkIn={checkInDate}
                                checkOut={checkOutDate}
                                onCheckInChange={setCheckInDate}
                                onCheckOutChange={setCheckOutDate}
                            />
                        </View>

                        <View style={styles.section}>
                            <AppText variant="subtitle" style={styles.sectionTitle}>Thông tin khách</AppText>
                            <AppInput
                                label="Tên khách hàng"
                                placeholder="Nhập tên khách hàng"
                                value={guestName}
                                onChangeText={setGuestName}
                            />
                        </View>

                        <AppButton
                            title="Xác nhận Check-in"
                            onPress={handleCheckIn}
                            style={styles.checkInButton}
                        />
                    </>
                )}

                <CustomModal
                    visible={showSuccessModal}
                    title="Check-in Thành Công!"
                    message={`Khách ${guestName} đã check-in vào phòng ${selectedRoom?.name}`}
                    onConfirm={handleModalClose}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: SPACING.xl,
        paddingTop: SPACING.xl,
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
        // Có thể thêm shadow nếu muốn nổi bật hơn:
        ...SHADOWS.medium,
    },
    header: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...SHADOWS.medium,
    },
    title: {
        marginTop: SPACING.sm,
        marginBottom: SPACING.xs,
        color: COLORS.textDark,
    },
    subtitle: {
        color: COLORS.textLight,
        textAlign: 'center',
    },
    section: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        marginBottom: SPACING.sm,
        color: COLORS.textDark,
    },
    searchButton: {
        marginTop: SPACING.sm,
    },
    checkInButton: {
        marginTop: SPACING.md,
    },
});

export default CheckInScreen;
