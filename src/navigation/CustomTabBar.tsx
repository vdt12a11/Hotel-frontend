import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

interface TabConfig {
  name: string;
  icon: string;
  activeColor: string;
  inactiveColor: string;
}

const TAB_CONFIG: TabConfig[] = [
  { name: 'Search', icon: '🔍', activeColor: '#2563EB', inactiveColor: '#9CA3AF' },
  { name: 'Saved', icon: '❤️', activeColor: '#2563EB', inactiveColor: '#9CA3AF' },
  { name: 'Bookings', icon: '📅', activeColor: '#2563EB', inactiveColor: '#9CA3AF' },
  { name: 'Profile', icon: '👤', activeColor: '#2563EB', inactiveColor: '#9CA3AF' },
];

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tabInfo = TAB_CONFIG.find((t) => t.name === route.name);
          const icon = tabInfo?.icon || '•';
          const color = isFocused ? (tabInfo?.activeColor || '#2563EB') : (tabInfo?.inactiveColor || '#9CA3AF');

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeIconContainer]}
            >
              <Text style={{ fontSize: 24, color: isFocused ? '#FFFFFF' : '#9CA3AF' }}>
                {icon}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 25,
    width,
    alignItems: 'center',
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 320,
    height: 60,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#2563EB',
  },
});

export default CustomTabBar;
