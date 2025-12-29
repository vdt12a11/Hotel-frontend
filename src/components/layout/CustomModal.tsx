import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constaints/hotelTheme';

interface CustomModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, title, message, onConfirm, onCancel }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {message && <Text style={styles.message}>{message}</Text>}
                    <View style={styles.buttonRow}>
                        {onCancel && (
                            <TouchableOpacity style={styles.button} onPress={onCancel}>
                                <Text style={styles.buttonText}>Huỷ</Text>
                            </TouchableOpacity>
                        )}
                        {onConfirm && (
                            <TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
                                <Text style={[styles.buttonText, { color: COLORS.textOnPrimary }]}>Xác nhận</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 24,
        minWidth: 280,
        alignItems: 'center',
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.textDark,
    },
    message: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    confirm: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.text,
        fontWeight: 'bold',
    },
});

export default CustomModal;
