import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import SearchScreen from '../screens/SearchScreen';
import UserProfileScreen from '../screens/userprofile/UserProfileScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Tab = createBottomTabNavigator();

interface TabConfig {
  name: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

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
    component: () => <PlaceholderScreen title="Bookings" />,
  },
  {
    name: 'Profile',
    component: UserProfileScreen,
  },
];

const BottomTabNavigator = () => {
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
          options={tab.props}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
