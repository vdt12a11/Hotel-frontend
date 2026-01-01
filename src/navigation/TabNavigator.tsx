import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constaints/hotelTheme';
import SearchScreen from '../features/search/screens/SearchScreen';
import UserProfileScreen from '../features/profile/screens/UserProfileScreen';
import PlaceholderScreen from '../features/profile/screens/PlaceholderScreen';

const Tab = createBottomTabNavigator();

interface User {
  userID: string;
  name: string;
}

interface Room {
  id?: string | number;
  name: string;
  image?: string;
  size?: string;
  bed?: string;
  view?: string;
  price: number;
  capacity?: number;
}

interface BottomTabNavigatorProps {
  onSelectRoom?: (room: Room, search: { capacity: string }) => void;
  currentUser?: User;
  onLogout?: () => void;
  onNavigate?: (screen: string) => void;
}

interface TabConfig {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ onSelectRoom, currentUser, onLogout, onNavigate }) => {
  // debug
  console.log('TabNavigator currentUser:', currentUser);

  // Explicitly render some screens so we can forward `currentUser` as a prop
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'ellipse-outline';
          switch (route.name) {
            case 'Search':
              iconName = 'search-outline';
              break;
            case 'History':
              iconName = 'time-outline';
              break;
            case 'Saved':
              iconName = 'heart-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          if (focused) {
            return (
              <View style={styles.iconCircle}>
                <Ionicons name={iconName as never} size={22} color={COLORS.primary} />
              </View>
            );
          }
          return <Ionicons name={iconName as never} size={22} color={COLORS.textLight} />;
        },
      })}
    >
      <Tab.Screen name="Search">
        {(props: any) => (
          <SearchScreen
            {...props}
            user={currentUser}
            onSelectRoom={onSelectRoom}
            onNavigate={onNavigate}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Saved">
        {(props: any) => <PlaceholderScreen {...props} />}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {(props: any) => <UserProfileScreen {...props} onLogout={onLogout} user={currentUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: SIZES.base * 8,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    borderRadius: SIZES.base * 4,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  tabBarLabel: {
    fontSize: SIZES.body4,
    marginBottom: SIZES.base,
    color: COLORS.text,
  },
  iconCircle: {
    width: SIZES.base * 4 + 4,
    height: SIZES.base * 4 + 4,
    borderRadius: (SIZES.base * 4 + 4) / 2,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});