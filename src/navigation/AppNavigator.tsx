import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import BookingScreen from "../screens/BookingScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";
import SignupScreen from "../screens/SignupScreen";
import BottomTabNavigator from "./BottomTabNavigator";

type ScreenName = "login" | "signup" | "search" | "booking" | "history" | "success" | "tabs";

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

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
}

interface BookingData {
  room: Room;
  formData: BookingFormData;
  totalPrice: number;
}

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("login");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchData, setSearchData] = useState<{ capacity: string } | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleLogin = (user: User): void => {
    setCurrentUser(user);
    console.log("Logged in user:", user);
    setCurrentScreen("tabs");
  };

  const handleSignup = (): void => {
    setCurrentScreen("login");
  };

  const handleSelectRoom = (room: Room, search: { capacity: string }): void => {
    console.log("AppNavigator handleSelectRoom called with:", room.name);
    setSelectedRoom(room);
    setSearchData(search);
    setCurrentScreen("booking");
  };

  const handleConfirmBooking = (booking: BookingData): void => {
    setBookingData(booking);
    void (async () => {
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
    })();
  };

  const resetApp = (): void => {
    setSelectedRoom(null);
    setSearchData(null);
    setBookingData(null);
    setCurrentScreen("tabs");
  };

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen onLogin={handleLogin} onSignup={() => setCurrentScreen("signup")} />
      )}

      {currentScreen === "signup" && (
        <SignupScreen onBackToLogin={() => setCurrentScreen("login")} />
      )}

      {currentScreen === "tabs" && currentUser && (
        <BottomTabNavigator 
          onSelectRoom={handleSelectRoom} 
          currentUser={currentUser}
          onNavigate={(screen) => setCurrentScreen(screen as ScreenName)}
        />
      )}

      {currentScreen === "search" && currentUser && (
        <SearchScreen user={currentUser} onSelectRoom={handleSelectRoom} onNavigate={(screen) => setCurrentScreen(screen as ScreenName)} />
      )}

      {currentScreen === "booking" && selectedRoom && (
        <BookingScreen
          room={selectedRoom}
          searchData={searchData}
          onConfirm={handleConfirmBooking}
          onBack={() => setCurrentScreen("tabs")}
        />
      )}

      {currentScreen === "history" && currentUser && (
        <HistoryScreen user={currentUser} onBack={() => setCurrentScreen("tabs")} />
      )}

      {currentScreen === "success" && bookingData && (
        <BookingSuccessScreen booking={bookingData} onReset={resetApp} />
      )}
    </>
  );
};

export default AppNavigator;
