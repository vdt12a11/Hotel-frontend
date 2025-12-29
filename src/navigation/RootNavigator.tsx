import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignupScreen from '../features/auth/screens/SignupScreen';
import TabNavigator from './TabNavigator';
import BookingScreen from '../features/booking/screens/BookingScreen';
import BookingSuccessScreen from '../features/booking/screens/BookingSuccessScreen';
import CheckInScreen from '../features/Check-in-out/screens/CheckInScreen';
import CheckOutScreen from '../features/Check-in-out/screens/CheckOutScreen';
import HistoryScreen from '../features/History/screens/HistoryScreen';
import { User, BookingData } from '../types';
import { Alert } from 'react-native';

interface RootNavigatorProps {
    user: User | null;
    onLogin: (user: User) => void;
    onLogout: () => void;
}

const Stack = createStackNavigator();

const RootNavigator: React.FC<RootNavigatorProps> = ({ user, onLogin, onLogout }) => {

    const handleConfirmBooking = async (booking: BookingData, navigation: any) => {
        try {
            console.log("Processing booking:", booking);
            const res = await fetch("http://10.0.2.2:3000/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...booking,
                    userID: user?.userID,
                    date: new Date().toISOString()
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error((data as { message?: string }).message || "Booking failed");
            }
            console.log("Tạo booking thành công", data);
            navigation.navigate('BookingSuccess', { booking });
        } catch (err) {
            console.log("Lỗi booking:", err);
            Alert.alert("Lỗi", "Đặt phòng thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                // Auth Stack
                <Stack.Group>
                    <Stack.Screen name="Login">
                        {(props: any) => (
                            <LoginScreen
                                {...props}
                                onLogin={onLogin}
                                onSignup={() => props.navigation.navigate('Signup')}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Signup">
                        {(props: any) => (
                            <SignupScreen
                                {...props}
                                onBackToLogin={() => props.navigation.navigate('Login')}
                            />
                        )}
                    </Stack.Screen>
                </Stack.Group>
            ) : (
                // Main App Stack
                <>
                    <Stack.Screen name="Main">
                        {(props: any) => <TabNavigator {...props} user={user} onLogout={onLogout} />}
                    </Stack.Screen>
                    <Stack.Screen name="CheckIn" component={CheckInScreen} />
                    <Stack.Screen name="CheckOut" component={CheckOutScreen} />
                    <Stack.Screen name="History">
                        {(props: any) => (
                            <HistoryScreen
                                {...props}
                                user={user!}
                                onBack={() => props.navigation.goBack()}
                            />
                        )}
                    </Stack.Screen>

                    <Stack.Group screenOptions={{ presentation: 'modal' }}>
                        <Stack.Screen name="Booking">
                            {(props: any) => {
                                const { room, searchData } = (props.route.params as any) || {};
                                if (!room) return null; // Should handle error
                                return (
                                    <BookingScreen
                                        room={room}
                                        searchData={searchData}
                                        onBack={() => props.navigation.goBack()}
                                        onConfirm={(booking) => handleConfirmBooking(booking, props.navigation)}
                                    />
                                );
                            }}
                        </Stack.Screen>
                        <Stack.Screen name="BookingSuccess">
                            {(props: any) => {
                                const { booking } = (props.route.params as any) || {};
                                return (
                                    <BookingSuccessScreen
                                        booking={booking}
                                        onReset={() => props.navigation.popToTop()}
                                    />
                                );
                            }}
                        </Stack.Screen>
                    </Stack.Group>
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
