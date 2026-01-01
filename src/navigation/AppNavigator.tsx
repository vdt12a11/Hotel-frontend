import React, { useState } from "react";
import LoginScreen from "../features/auth/screens/LoginScreen";
import SearchScreen from "../features/search/screens/SearchScreen";
import BookingScreen from "../features/booking/screens/BookingScreen";
import BookingSuccessScreen from "../features/booking/screens/BookingSuccessScreen";
import HistoryScreen from "../features/History/screens/HistoryScreen";
import SignupScreen from "../features/auth/screens/SignupScreen";
import { Linking } from "react-native";
import Config from "react-native-config";
import { Room, BookingData, ScreenName, User } from "../types";

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("login");
  const [previousScreen, setPreviousScreen] = useState<ScreenName | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchData, setSearchData] = useState<{ capacity: string } | null>(
    null
  );
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null); // new state

  const navigateTo = (screen: ScreenName) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const handleLogin = (user: User): void => {
    setCurrentUser(user);
    console.log("Logged in user:", user);
    navigateTo("search");
  };

  const handleSignup = (): void => {
    navigateTo("login");
  };

  const handleSelectRoom = (
    room: Room,
    search: { capacity: string }
  ): void => {
    setSelectedRoom(room);
    setSearchData(search);
    navigateTo("booking");
  };

  const handleConfirmBooking = async (booking: BookingData): Promise<void> => {
    setBookingData(booking);
    try {
      console.log(booking);
      const res = await fetch(`${Config.API_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          userID: currentUser?.userID,
          date: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      const createdOrderId = data.orderId ?? data.id ?? data._id ?? null;

      if (createdOrderId) setOrderId(String(createdOrderId));
      if (!res.ok) {
        throw new Error(
          (data as { message?: string }).message || "Booking failed"
        );
      }

      console.log("Tạo booking thành công", data);
    } catch (err) {
      console.log("Lỗi booking:", err);
    }
    navigateTo("success");
  };

  const resetApp = (): void => {
    setSelectedRoom(null);
    setSearchData(null);
    setBookingData(null);
    setOrderId(null);
    navigateTo("search");
  };

  const handleBack = () => {
    setCurrentScreen(previousScreen || "search");
  };

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen
          onLogin={handleLogin}
          onSignup={() => navigateTo("signup")}
        />
      )}

      {currentScreen === "signup" && (
        <SignupScreen onBackToLogin={() => navigateTo("login")} />
      )}

      {currentScreen === "search" && currentUser && (
        <SearchScreen
          user={currentUser}
          onSelectRoom={
            handleSelectRoom as (room: any, search: { capacity: string }) => void
          }
          onNavigate={(screen: ScreenName) => {
            // Only allow valid ScreenName values
            if (
              [
                "login",
                "signup",
                "search",
                "booking",
                "history",
                "success",
                "profile",
                "MyBookings",
              ].includes(screen)
            ) {
              navigateTo(screen);
            }
          }}
        />
      )}

      {currentScreen === "booking" && selectedRoom && (
        <BookingScreen
          room={selectedRoom}
          searchData={searchData}
          onConfirm={handleConfirmBooking}
          onBack={handleBack}
        />
      )}

      {currentScreen === "history" && currentUser && (
        <HistoryScreen user={currentUser} onBack={() => setCurrentScreen("search")} />
      )}

      {currentScreen === "success" && bookingData && (
        <BookingSuccessScreen
          booking={bookingData}
          onReset={resetApp}
          orderId={orderId}
        />
      )}
    </>
  );
};

export default AppNavigator;
