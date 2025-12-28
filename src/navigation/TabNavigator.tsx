import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../screens/SearchScreen';
import UserProfileScreen from '../screens/userprofile/UserProfileScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import CheckInScreen from '../screens/CheckInScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import { COLORS, FONTS, SHADOWS } from '../constaints/hotelTheme';
import { User } from '../types';

interface TabNavigatorProps {
    user: User;
    onLogout: () => void;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator: React.FC<TabNavigatorProps> = ({ user, onLogout }) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: any }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderTopColor: COLORS.border,
                    height: Platform.OS === 'ios' ? 88 : 68, // Taller tab bar like Booking.com mobile
                    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
                    paddingTop: 8,
                    elevation: 16, // Stronger Android shadow
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                },
                tabBarLabelStyle: {
                    ...FONTS.body5,
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 2,
                },
                tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
                    let iconName = 'help-outline';

                    if (route.name === 'Home') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'MyBookings') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline'; // "Trips" metaphor
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Icon name={iconName} size={26} color={color} style={{ marginBottom: 2 }} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                options={{ tabBarLabel: "Tìm kiếm" }}
            >
                {(props: any) => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="SearchTab"
                            children={() => (
                                <SearchScreen
                                    {...props}
                                    user={user}
                                    onSelectRoom={(room, search) => props.navigation.navigate('Booking', { room, searchData: search })}
                                    onNavigate={(screen) => props.navigation.navigate(screen)}
                                />
                            )}
                        />
                        <Stack.Screen
                            name="CheckIn"
                            component={CheckInScreen}
                            options={{
                                animationEnabled: true,
                                gestureEnabled: true,
                            }}
                        />
                        <Stack.Screen
                            name="CheckOut"
                            component={CheckOutScreen}
                            options={{
                                animationEnabled: true,
                                gestureEnabled: true,
                            }}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen
                name="MyBookings"
                options={{ tabBarLabel: "Chuyến đi" }}
            >
                {(props: any) => <MyBookingsScreen {...props} user={user} />}
            </Tab.Screen>

            <Tab.Screen
                name="Profile"
                options={{ tabBarLabel: "Cá nhân" }}
            >
                {(props: any) => <UserProfileScreen {...props} user={user} onLogout={onLogout} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TabNavigator;
