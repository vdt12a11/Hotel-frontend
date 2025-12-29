import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS, SPACING } from '../constaints/hotelTheme';
import SearchScreen from '../screens/SearchScreen';
import UserProfileScreen from '../screens/userprofile/UserProfileScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

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
  onNavigate?: (screen: string) => void;
}

interface TabConfig {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ onSelectRoom, currentUser, onNavigate }) => {
  const TAB_CONFIG: TabConfig[] = [
    {
      name: 'Search',
      component: SearchScreen,
    },
    {
      name: 'Saved',
      component: () => <PlaceholderScreen title="Saved" />,
    },
    {
      name: 'Profile',
      component: UserProfileScreen,
    },
  ];

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
          // Map route name to Ionicons outline icons
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

          // Active: icon inside a light-gray circular background
          if (focused) {
            return (
              <View style={styles.iconCircle}>
                <Ionicons name={iconName as never} size={22} color={COLORS.primary} />
              </View>
            );
          }

          // Inactive: icon only, no background
          return <Ionicons name={iconName as never} size={22} color={COLORS.textLight} />;
        },
      })}
    >
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          initialParams={
            tab.name === 'Search'
              ? { onSelectRoom, currentUser, onNavigate }
              : tab.name === 'History'
              ? { user: currentUser }
              : undefined
          }
          options={tab.props}
        />
      ))}
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