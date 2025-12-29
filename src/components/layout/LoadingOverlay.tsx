import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constaints/hotelTheme';

interface LoadingOverlayProps {
    visible?: boolean;
    message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible = true, message }) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    message: {
        marginTop: 12,
        color: COLORS.primary,
        fontWeight: '500',
    }
});

export default LoadingOverlay;
