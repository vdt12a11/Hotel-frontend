import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import BookingScreen from "../screens/BookingScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";
import SignupScreen from "../screens/SignupScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Room, BookingData, ScreenName, User } from "../types";

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("login");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchData, setSearchData] = useState<{ capacity: string } | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleLogin = (user: User): void => {
    setCurrentUser(user);
    console.log("Logged in user:", user);
    setCurrentScreen("search");
  };

  const handleSignup = (): void => {
    setCurrentScreen("login");
  };

  const handleSelectRoom = (room: Room, search: { capacity: string }): void => {
    setSelectedRoom(room);
    setSearchData(search);
    setCurrentScreen("booking");
  };

  const handleConfirmBooking = async (booking: BookingData): Promise<void> => {
    setBookingData(booking);
    try {
      console.log(booking);
      const res = await fetch("http://10.0.2.2:3000/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          userID: currentUser?.userID,
          date: new Date().toISOString()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error((data as { message?: string }).message || "Booking failed");
      }
      console.log("Tạo booking thành công", data);
    } catch (err) {
      console.log("Lỗi booking:", err);
    }
    setCurrentScreen("success");
  };

  const resetApp = (): void => {
    setSelectedRoom(null);
    setSearchData(null);
    setBookingData(null);
    setCurrentScreen("search");
  };

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen onLogin={handleLogin} onSignup={() => setCurrentScreen("signup")} />
      )}

      {currentScreen === "signup" && (
        <SignupScreen onBackToLogin={() => setCurrentScreen("login")} />
      )}

      {currentScreen === "search" && currentUser && (
        <SearchScreen
          user={currentUser}
          onSelectRoom={handleSelectRoom as (room: any, search: { capacity: string }) => void}
          onNavigate={(screen) => {
            // Only allow valid ScreenName values
            if (["login", "signup", "search", "booking", "history", "success", "profile", "MyBookings"].includes(screen)) {
              setCurrentScreen(screen as ScreenName);
            }
          }}
        />
      )}

      {currentScreen === "booking" && selectedRoom && (
        <BookingScreen
          room={selectedRoom}
          searchData={searchData}
          onConfirm={handleConfirmBooking}
          onBack={() => setCurrentScreen("search")}
        />
      )}

      {currentScreen === "history" && currentUser && (
        <HistoryScreen user={currentUser} onBack={() => setCurrentScreen("search")} />
      )}

      {currentScreen === "MyBookings" && currentUser && (
        <ProfileScreen user={currentUser} onNavigate={(screen) => {
          if (["login", "signup", "search", "booking", "history", "success", "MyBookings"].includes(screen)) {
            setCurrentScreen(screen as ScreenName);
          }
        }} />
      )}

      {currentScreen === "success" && bookingData && (
        <BookingSuccessScreen booking={bookingData} onReset={resetApp} />
      )}
    </>
  );
};

export default AppNavigator;
