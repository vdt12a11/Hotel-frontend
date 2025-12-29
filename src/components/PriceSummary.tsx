import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { COLORS, SPACING, SHADOWS } from '../constaints/hotelTheme';

interface PriceSummaryProps {
    pricePerNight: number;
    nights: number;
    tax?: number;
    discount?: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ pricePerNight, nights, tax = 0, discount = 0 }) => {
    const subtotal = pricePerNight * nights;
    const taxAmount = subtotal * (tax / 100);
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal + taxAmount - discountAmount;

    return (
        <View style={styles.container}>
            <AppText variant="subtitle" style={styles.title}>Tóm tắt giá</AppText>

            <View style={styles.row}>
                <AppText variant="body" style={styles.label}>
                    {pricePerNight.toLocaleString('vi-VN')} VND x {nights} đêm
                </AppText>
                <AppText variant="body" style={styles.value}>
                    {subtotal.toLocaleString('vi-VN')} VND
                </AppText>
            </View>

            {tax > 0 && (
                <View style={styles.row}>
                    <AppText variant="body" style={styles.label}>Thuế ({tax}%)</AppText>
                    <AppText variant="body" style={styles.value}>
                        {taxAmount.toLocaleString('vi-VN')} VND
                    </AppText>
                </View>
            )}

            {discount > 0 && (
                <View style={styles.row}>
                    <AppText variant="body" style={[styles.label, { color: COLORS.success }]}>
                        Giảm giá ({discount}%)
                    </AppText>
                    <AppText variant="body" style={[styles.value, { color: COLORS.success }]}>
                        -{discountAmount.toLocaleString('vi-VN')} VND
                    </AppText>
                </View>
            )}

            <View style={styles.divider} />

            <View style={styles.row}>
                <AppText variant="subtitle" style={styles.totalLabel}>Tổng cộng</AppText>
                <AppText variant="title" style={styles.totalValue}>
                    {total.toLocaleString('vi-VN')} VND
                </AppText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SPACING.md,
        ...SHADOWS.medium,
    },
    title: {
        marginBottom: SPACING.sm,
        color: COLORS.textDark,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: SPACING.xs,
    },
    label: {
        color: COLORS.text,
    },
    value: {
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
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default PriceSummary;
