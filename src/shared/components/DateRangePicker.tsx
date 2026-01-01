import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AppText from './AppText';
import { COLORS, SPACING, SHADOWS } from '../../constaints/hotelTheme';
import Icon from 'react-native-vector-icons/Ionicons';

interface DateRangePickerProps {
    checkIn: Date;
    checkOut: Date;
    onCheckInChange: (date: Date) => void;
    onCheckOutChange: (date: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    checkIn,
    checkOut,
    onCheckInChange,
    onCheckOutChange
}) => {
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleCheckInChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowCheckInPicker(Platform.OS === 'ios');
        if (selectedDate) {
            onCheckInChange(selectedDate);
            // Ensure check-out is after check-in
            if (selectedDate >= checkOut) {
                const nextDay = new Date(selectedDate);
                nextDay.setDate(nextDay.getDate() + 1);
                onCheckOutChange(nextDay);
            }
        }
    };

    const handleCheckOutChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowCheckOutPicker(Platform.OS === 'ios');
        if (selectedDate) {
            onCheckOutChange(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowCheckInPicker(true)}
                >
                    <View style={styles.dateContent}>
                        <Icon name="calendar-outline" size={20} color={COLORS.primary} />
                        <View style={styles.dateTextContainer}>
                            <AppText variant="caption" style={styles.dateLabel}>Ngày nhận phòng</AppText>
                            <AppText variant="body" style={styles.dateValue}>{formatDate(checkIn)}</AppText>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity
                    style={styles.dateButton}
                    onPress={() => setShowCheckOutPicker(true)}
                >
                    <View style={styles.dateContent}>
                        <Icon name="calendar-outline" size={20} color={COLORS.primary} />
                        <View style={styles.dateTextContainer}>
                            <AppText variant="caption" style={styles.dateLabel}>Ngày trả phòng</AppText>
                            <AppText variant="body" style={styles.dateValue}>{formatDate(checkOut)}</AppText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {showCheckInPicker && (
                <DateTimePicker
                    value={checkIn}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleCheckInChange}
                    minimumDate={new Date()}
                />
            )}

            {showCheckOutPicker && (
                <DateTimePicker
                    value={checkOut}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleCheckOutChange}
                    minimumDate={checkIn}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: SPACING.sm,
    },
    dateContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        overflow: 'hidden',
        ...SHADOWS.medium,
    },
    dateButton: {
        padding: SPACING.md,
    },
    dateContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateTextContainer: {
        marginLeft: SPACING.sm,
        flex: 1,
    },
    dateLabel: {
        color: COLORS.textLight,
        marginBottom: 4,
    },
    dateValue: {
        color: COLORS.textDark,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.md,
    },
});

export default DateRangePicker;
