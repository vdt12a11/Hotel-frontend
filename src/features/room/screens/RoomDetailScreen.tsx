import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING, SHADOWS } from '../../../constaints/hotelTheme';
import { Room } from '../../../types';
import { AppText, AppButton, DateRangePicker } from '../../../shared/components';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  RoomDetail: { room: Room };
  Payment: { room: Room; checkIn: Date; checkOut: Date };
};

type RoomDetailScreenRouteProp = RouteProp<RootStackParamList, 'RoomDetail'>;
type RoomDetailScreenNavigationProp = StackNavigationProp<any, 'RoomDetail'>;

interface RoomDetailScreenProps {
  route: RoomDetailScreenRouteProp;
  navigation: RoomDetailScreenNavigationProp;
}

const RoomDetailScreen: React.FC<RoomDetailScreenProps> = ({ route, navigation }) => {
  const { room } = route.params;

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  // Mock amenities - in real app, this would come from room data
  const amenities = [
    { name: 'WiFi', icon: 'wifi-outline' },
    { name: 'AC', icon: 'snow-outline' },
    { name: 'Pool', icon: 'water-outline' },
    { name: 'TV', icon: 'tv-outline' },
  ];

  // Mock description - in real app, this would come from room data
  const description = `${room.name} offers a comfortable stay with ${room.bed} and ${room.view} view. Perfect for ${room.capacity} guests with modern amenities.`;

  const handleBookNow = () => {
    navigation.navigate('Payment', {
      room,
      checkIn,
      checkOut,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Image with Back Button */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: room.image || 'https://via.placeholder.com/400x300' }}
            style={styles.roomImage}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <AppText variant="title" style={styles.roomName}>
            {room.name}
          </AppText>
          <AppText variant="subtitle" color={COLORS.primary} style={styles.price}>
            ${room.price} / night
          </AppText>

          {/* Amenities */}
          <View style={styles.amenitiesContainer}>
            {amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Icon name={amenity.icon as any} size={24} color={COLORS.amenities} />
                <AppText variant="caption" style={styles.amenityText}>
                  {amenity.name}
                </AppText>
              </View>
            ))}
          </View>

          {/* Description */}
          <AppText variant="body" style={styles.description}>
            {description}
          </AppText>
        </View>

        {/* Selection Section */}
        <View style={styles.selectionContainer}>
          <AppText variant="subtitle" style={styles.sectionTitle}>
            Select Dates
          </AppText>
          <DateRangePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <AppButton
          title="Book Now"
          onPress={handleBookNow}
          fullWidth
        />
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
    paddingBottom: SPACING.xxl * 2, // Space for footer
  },
  imageContainer: {
    position: 'relative',
  },
  roomImage: {
    width: width,
    height: height * 0.4,
  },
  backButton: {
    position: 'absolute',
    top: SPACING.xl,
    left: SPACING.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: SPACING.sm,
  },
  infoContainer: {
    padding: SPACING.lg,
  },
  roomName: {
    marginBottom: SPACING.sm,
  },
  price: {
    marginBottom: SPACING.lg,
    fontWeight: 'bold',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  amenityItem: {
    alignItems: 'center',
  },
  amenityText: {
    marginTop: SPACING.xs,
    color: COLORS.textLight,
  },
  description: {
    lineHeight: 24,
  },
  selectionContainer: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
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
});

export default RoomDetailScreen;