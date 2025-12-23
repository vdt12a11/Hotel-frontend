import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import SearchScreen from '../screens/SearchScreen';
import UserProfileScreen from '../screens/userprofile/UserProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
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
      name: 'Bookings',
      component: DashboardScreen,
    },
    {
      name: 'Profile',
      component: UserProfileScreen,
    },
  ];

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          initialParams={
            tab.name === 'Search' ? { onSelectRoom, currentUser, onNavigate } : undefined
          }
          options={tab.props}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
