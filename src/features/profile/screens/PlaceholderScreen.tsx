import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components';
import { COLORS } from '../../../constaints/hotelTheme';

interface PlaceholderScreenProps {
  title: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <AppText variant="title" color={COLORS.textDark}>
        {title}
      </AppText>
      <AppText variant="body" color={COLORS.textLight} style={styles.subtitle}>
        Coming soon...
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  subtitle: {
    marginTop: 12,
  },
});

export default PlaceholderScreen;
