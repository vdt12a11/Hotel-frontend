import React from 'react';
import { TextInput, View, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { COLORS, SIZES } from '../constaints/hotelTheme';

interface AppInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  testID?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  testID,
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      testID={testID}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: SIZES.base },
  label: { color: COLORS.text, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SIZES.base,
    color: COLORS.text,
    backgroundColor: COLORS.inputBg,
  },
});
