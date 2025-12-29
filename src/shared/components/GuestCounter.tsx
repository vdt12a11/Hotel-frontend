import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../../constaints/hotelTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import AppText from './AppText';

interface GuestCounterProps {
    count: number;
    minCount?: number;
    maxCount?: number;
    onCountChange: (count: number) => void;
    label?: string;
}

const GuestCounter: React.FC<GuestCounterProps> = ({
    count,
    minCount = 1,
    maxCount = 10,
    onCountChange,
    label = 'Số khách'
}) => {
    const handleDecrement = () => {
        if (count > minCount) {
            onCountChange(count - 1);
        }
    };

    const handleIncrement = () => {
        if (count < maxCount) {
            onCountChange(count + 1);
        }
    };

    return (
        <View style={styles.container}>
            <AppText variant="body" style={styles.label}>{label}</AppText>

            <View style={styles.counterContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        count <= minCount && styles.buttonDisabled
                    ]}
                    onPress={handleDecrement}
                    disabled={count <= minCount}
                >
                    <Icon
                        name="remove"
                        size={20}
                        color={count <= minCount ? COLORS.textLight : COLORS.primary}
                    />
                </TouchableOpacity>

                <View style={styles.countContainer}>
                    <AppText variant="title" style={styles.countText}>{count}</AppText>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        count >= maxCount && styles.buttonDisabled
                    ]}
                    onPress={handleIncrement}
                    disabled={count >= maxCount}
                >
                    <Icon
                        name="add"
                        size={20}
                        color={count >= maxCount ? COLORS.textLight : COLORS.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SPACING.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    label: {
        color: COLORS.textDark,
        fontWeight: '500',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    buttonDisabled: {
        backgroundColor: COLORS.lightGray,
        borderColor: COLORS.border,
    },
    countContainer: {
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        color: COLORS.textDark,
        fontWeight: 'bold',
    },
});

export default GuestCounter;
