import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText, AppInput, AppButton, RoomCard, ScreenContainer, CustomModal, PriceSummary } from '../components';
import { COLORS, SPACING, SHADOWS, SIZES } from '../constaints/hotelTheme';
import { Room } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock data - Day 2 strategy: "Mock It Till You Make It"
const mockCheckOutRooms: Room[] = [
    {
        id: '201',
        name: 'Suite Room 201',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
        size: '50m²',
        bed: '1 King Bed + Sofa',
        view: 'Sea View',
        price: 2500000,
        capacity: 3
    }
];

const CheckOutScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    // State management - hardcoded for Day 2
    const [roomNumber, setRoomNumber] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [guestName, setGuestName] = useState<string>('');
    const [nights, setNights] = useState<number>(0);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [additionalCharges, setAdditionalCharges] = useState<number>(0);

    // Mock search function - Day 2
    const handleSearchRoom = () => {
        if (!roomNumber.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập số phòng');
            return;
        }

        // Mock: Tự động load thông tin phòng
        setSelectedRoom(mockCheckOutRooms[0]);
        setGuestName('Jane Smith'); // Hardcoded
        setNights(3); // Hardcoded 3 nights
        setAdditionalCharges(150000); // Mock minibar/laundry charges
        Alert.alert('Thành công', `Tìm thấy phòng: ${roomNumber}`);
    };

    // Mock check-out function - Day 2
    const handleCheckOut = () => {
        if (!selectedRoom) {
            Alert.alert('Lỗi', 'Vui lòng tìm phòng trước');
            return;
        }

        // Mock success
        setShowSuccessModal(true);
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        // Reset form
        setRoomNumber('');
        setSelectedRoom(null);
        setGuestName('');
        setNights(0);
        setAdditionalCharges(0);
        // Navigate back to Home tab
        navigation.goBack();
    };

    const totalAmount = selectedRoom ? (selectedRoom.price * nights) + additionalCharges : 0;

    return (
        <ScreenContainer withScroll={true}>
            <View style={[styles.container, { paddingTop: 40 }]}> {/* Thêm paddingTop để tránh dính sát phần trên */}
                {/* Header */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    hitSlop={{top:10, left:10, right:10, bottom:10}}
                    style={styles.backCircle}
                >
                    <Icon name="arrow-back" size={28} color={COLORS.primary} />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Icon name="log-out-outline" size={40} color={COLORS.primary} />
                    <AppText variant="title" style={styles.title}>Check-out Khách Sạn</AppText>
                    <AppText variant="body" style={styles.subtitle}>
                        Nhập số phòng để tiến hành check-out
                    </AppText>
                </View>

                {/* Room Number Input */}
                <View style={styles.section}>
                    <AppInput
                        label="Số Phòng"
                        placeholder="Nhập số phòng (VD: 201)"
                        value={roomNumber}
                        onChangeText={setRoomNumber}
                        keyboardType="numeric"
                    />
                    <AppButton
                        title="Tìm Phòng"
                        onPress={handleSearchRoom}
                        style={styles.searchButton}
                    />
                </View>

                {/* Room Information */}
                {selectedRoom && (
                    <>
                        <View style={styles.section}>
                            <AppText variant="subtitle" style={styles.sectionTitle}>Thông tin phòng</AppText>
                            <RoomCard
                                room={selectedRoom}
                                onPress={() => { }}
                            />
                        </View>

                        {/* Guest Information */}
                        <View style={styles.section}>
                            <AppText variant="subtitle" style={styles.sectionTitle}>Thông tin khách</AppText>
                            <View style={styles.infoCard}>
                                <View style={styles.infoRow}>
                                    <Icon name="person-outline" size={20} color={COLORS.primary} />
                                    <AppText variant="body" style={styles.infoText}>
                                        Khách: <AppText variant="body" style={styles.infoBold}>{guestName}</AppText>
                                    </AppText>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name="moon-outline" size={20} color={COLORS.primary} />
                                    <AppText variant="body" style={styles.infoText}>
                                        Số đêm: <AppText variant="body" style={styles.infoBold}>{nights} đêm</AppText>
                                    </AppText>
                                </View>
                            </View>
                        </View>

                        {/* Price Summary */}
                        <View style={styles.section}>
                            <AppText variant="subtitle" style={styles.sectionTitle}>Chi tiết thanh toán</AppText>
                            <PriceSummary
                                pricePerNight={selectedRoom.price}
                                nights={nights}
                            />

                            {/* Additional Charges */}
                            {additionalCharges > 0 && (
                                <View style={styles.additionalCharges}>
                                    <View style={styles.chargeRow}>
                                        <AppText variant="body" style={styles.chargeLabel}>
                                            Phụ phí (Minibar, Giặt ủi...)
                                        </AppText>
                                        <AppText variant="body" style={styles.chargeValue}>
                                            {additionalCharges.toLocaleString('vi-VN')} VND
                                        </AppText>
                                    </View>
                                    <View style={styles.divider} />
                                    <View style={styles.chargeRow}>
                                        <AppText variant="subtitle" style={styles.totalLabel}>Tổng cộng (bao gồm phụ phí)</AppText>
                                        <AppText variant="title" style={styles.totalValue}>
                                            {totalAmount.toLocaleString('vi-VN')} VND
                                        </AppText>
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* Check-out Button */}
                        <AppButton
                            title="Xác nhận Check-out"
                            onPress={handleCheckOut}
                            style={styles.checkOutButton}
                        />
                    </>
                )}

                {/* Success Modal */}
                <CustomModal
                    visible={showSuccessModal}
                    title="Check-out Thành Công!"
                    message={`Khách ${guestName} đã check-out khỏi phòng ${selectedRoom?.name}. Tổng thanh toán: ${totalAmount.toLocaleString('vi-VN')} VND`}
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
    checkOutButton: {
        marginTop: SPACING.md,
    },
    infoCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        ...SHADOWS.medium,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    infoText: {
        marginLeft: SPACING.sm,
        color: COLORS.text,
    },
    infoBold: {
        fontWeight: '600',
        color: COLORS.textDark,
    },
    additionalCharges: {
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
        padding: SPACING.md,
        marginTop: SPACING.sm,
    },
    chargeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SPACING.xs,
    },
    chargeLabel: {
        color: COLORS.text,
    },
    chargeValue: {
        color: COLORS.textDark,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.sm,
    },
    totalLabel: {
        color: COLORS.textDark,
        fontWeight: 'bold',
    },
    totalValue: {
        color: COLORS.danger,
        fontWeight: 'bold',
    },
});

export default CheckOutScreen;
