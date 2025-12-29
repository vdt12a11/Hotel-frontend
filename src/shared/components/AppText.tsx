import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constaints/hotelTheme';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  style,
  numberOfLines,
  color,
  align = 'left',
}) => {
  const variantStyle = styles[variant];
  const colorStyle = color ? { color } : {};
  const alignStyle = { textAlign: align };
  return (
    <Text
      style={[variantStyle, colorStyle, alignStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    fontFamily: FONTS.medium,
  },
  body: {
    fontSize: SIZES.base,
    fontFamily: FONTS.regular,
  },
  caption: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    fontFamily: FONTS.light,
  },
});
