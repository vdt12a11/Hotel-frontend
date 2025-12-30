import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, SHADOWS } from '../../../constaints/hotelTheme';
import { Room, BookingData } from '../../../types';
import { calculateNights } from '../../../utils/calculateNights';
import { AppText, AppButton, AppInput, PriceSummary } from '../../../shared/components';

type RootStackParamList = {
  RoomDetail: { room: Room };
  Payment: { room: Room; checkIn: Date; checkOut: Date };
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = StackNavigationProp<any, 'Payment'>;

interface PaymentScreenProps {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route, navigation }) => {
  const { room, checkIn, checkOut } = route.params;

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash'>('credit_card');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const nights = calculateNights(
    checkIn.toISOString().split('T')[0],
    checkOut.toISOString().split('T')[0]
  );

  const handlePayNow = () => {
    // Basic validation
    if (paymentMethod === 'credit_card') {
      if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
        Alert.alert('Error', 'Please fill in all credit card details');
        return;
      }
    }

    // Mock payment processing
    Alert.alert(
      'Payment Successful',
      'Your booking has been confirmed!',
      [
        {
          text: 'OK',
          onPress: () => {
            const booking: BookingData = {
              room,
              formData: {
                name: cardHolderName || 'Guest',
                phone: '',
                email: '',
                checkIn: checkIn.toISOString().split('T')[0],
                checkOut: checkOut.toISOString().split('T')[0],
              },
              totalPrice: room.price * nights,
            };
            navigation.navigate('BookingSuccess', { booking });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Booking Summary */}
        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.sectionTitle}>
            Booking Summary
          </AppText>
          <PriceSummary
            pricePerNight={room.price}
            nights={nights}
            tax={10} // Mock tax
          />
        </View>

        {/* Payment Method Selection */}
        <View style={styles.section}>
          <AppText variant="subtitle" style={styles.sectionTitle}>
            Payment Method
          </AppText>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'credit_card' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('credit_card')}
            >
              <Icon
                name="card-outline"
                size={24}
                color={paymentMethod === 'credit_card' ? COLORS.primary : COLORS.textLight}
              />
              <AppText
                variant="body"
                style={[
                  styles.paymentMethodText,
                  paymentMethod === 'credit_card' && styles.paymentMethodTextSelected,
                ]}
              >
                Credit Card
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'cash' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('cash')}
            >
              <Icon
                name="cash-outline"
                size={24}
                color={paymentMethod === 'cash' ? COLORS.primary : COLORS.textLight}
              />
              <AppText
                variant="body"
                style={[
                  styles.paymentMethodText,
                  paymentMethod === 'cash' && styles.paymentMethodTextSelected,
                ]}
              >
                Cash on Arrival
              </AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Credit Card Form */}
        {paymentMethod === 'credit_card' && (
          <View style={styles.section}>
            <AppText variant="subtitle" style={styles.sectionTitle}>
              Card Details
            </AppText>
            <AppInput
              label="Card Holder Name"
              placeholder="John Doe"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />
            <AppInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <View style={styles.cardRow}>
              <AppInput
                label="Expiry Date"
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={setExpiryDate}
                containerStyle={styles.cardInput}
              />
              <AppInput
                label="CVV"
                placeholder="123"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                containerStyle={styles.cardInput}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <AppButton
          title="Pay Now"
          onPress={handlePayNow}
          fullWidth
        />
        <View style={styles.securePayment}>
          <Icon name="lock-closed-outline" size={16} color={COLORS.textLight} />
          <AppText variant="caption" color={COLORS.textLight} style={styles.secureText}>
            Secure Payment
          </AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl * 2,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  paymentMethod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  paymentMethodSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  paymentMethodText: {
    marginLeft: SPACING.sm,
    color: COLORS.text,
  },
  paymentMethodTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  cardRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  cardInput: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    ...SHADOWS.large,
  },
  securePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
  },
  secureText: {
    marginLeft: SPACING.xs,
  },
});

export default PaymentScreen;