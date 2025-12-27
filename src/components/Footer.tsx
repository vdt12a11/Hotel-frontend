import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

type ScreenName = "login" | "signup" | "search" | "booking" | "history" | "success" | "profile";

interface FooterProps {
  onNavigate: (screen: ScreenName) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('search')}>
        {/* Icon placeholder */}
        <Text style={styles.footerButtonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        {/* Icon placeholder */}
        <Text style={styles.footerButtonText}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('history')}>
        {/* Icon placeholder */}
        <Text style={styles.footerButtonText}>Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('profile')}>
        {/* Icon placeholder */}
        <Text style={styles.footerButtonText}>My account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.1, // Set height to 10% of screen height
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 14, // Increased font size
  },
});

export default Footer;
