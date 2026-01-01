import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignupScreen from '../features/auth/screens/SignupScreen';
import TabNavigator from './TabNavigator';
import BookingScreen from '../features/booking/screens/BookingScreen';
import BookingSuccessScreen from '../features/booking/screens/BookingSuccessScreen';
import HistoryScreen from '../features/History/screens/HistoryScreen';
import { User, BookingData } from '../types';
import { Alert } from 'react-native';
import { Linking } from 'react-native';
import Config from 'react-native-config';
interface RootNavigatorProps {
    user: User | null;
    onLogin: (user: User) => void;
    onLogout: () => void;
}

const Stack = createStackNavigator();

const RootNavigator: React.FC<RootNavigatorProps> = ({ user, onLogin, onLogout }) => {
  console.log('RootNavigator user:', user);

    // accept current user explicitly to avoid stale/undefined closure values
    const handleConfirmBooking = async (booking: BookingData, navigation: any, currentUser: User | null) => {
        if (!currentUser) {
            console.warn('handleConfirmBooking called without a user');
            Alert.alert("Lỗi", "Vui lòng đăng nhập trước khi đặt phòng");
            return;
        }
        try {
            console.log("Processing booking:", booking, "user:", currentUser);
            const res = await fetch(`${Config.API_URL}/booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...booking,
                    userID: currentUser.userID,
                    date: new Date().toISOString()
                })
            });
             const data = await res.json();
             if (!res.ok) {
                 throw new Error((data as { message?: string }).message || "Booking failed");
             }
             const createdOrderId = data.orderId ?? data.id ?? data._id ?? null;
             console.log("Tạo booking thành công", data, "orderId:", createdOrderId);
             Linking.openURL(data.deeplink);
             navigation.navigate('BookingSuccess', { booking, orderId: createdOrderId ?? undefined });
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
                        {(props: any) => <TabNavigator {...props} currentUser={user} onLogout={onLogout} />}
                    </Stack.Screen>
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
                                        // pass the current user explicitly when confirming
                                        onConfirm={(booking) => handleConfirmBooking(booking, props.navigation, user)}
                                        // also pass userID directly to BookingScreen so its internal submit (if used) has the correct user
                                        userID={user?.userID}
                                    />
                                );
                            }}
                        </Stack.Screen>
                        <Stack.Screen name="BookingSuccess">
                            {(props: any) => {
                                const { booking,orderId } = (props.route.params as any) || {};
                                return (
                                    <BookingSuccessScreen
                                        booking={booking}
                                        orderId={orderId}
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
