import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constaints/hotelTheme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  style?: any;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading,
  fullWidth,
  style,
}) => (
  <TouchableOpacity
    style={[styles.button, fullWidth && styles.fullWidth, style]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.text}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
