import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import SearchScreen from "../screens/SearchScreen";
import BookingScreen from "../screens/BookingScreen";
import BookingSuccessScreen from "../screens/BookingSuccessScreen";
import HistoryScreen from "../screens/HistoryScreen";
import SignupScreen from "../screens/SignupScreen";


export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    console.log("Logged in user:", user);
    setCurrentScreen("search");
  };
   const handleSignup = () => {
    setCurrentScreen("login");
  };
  const handleSelectRoom = (room, search) => {
    setSelectedRoom(room);
    setSearchData(search);
    setCurrentScreen("booking");
  };

  const handleConfirmBooking =async (booking) => {
    setBookingData(booking);
    try 
    {
      console.log(booking)
      const res = await fetch("http://10.0.2.2:3000/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...booking,
          userID: currentUser.userID,
          date: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }
      console.log("Tạo booking thành công", data);
    } catch (err) 
    {
        console.log("Lỗi booking:", err);
    }
    setCurrentScreen("success");
  };
  const resetApp = () => {
    setSelectedRoom(null);
    setSearchData(null);
    setBookingData(null);
    setCurrentScreen("search");
  };

  return (
    <>
      {currentScreen === "login" && (
        <LoginScreen onLogin={handleLogin}
          onSignup={() => setCurrentScreen("signup")} />
      )}
      {currentScreen === "signup" && (
        <SignupScreen
          onBackToLogin={() => setCurrentScreen("login")}
           
        />
      )}
      {currentScreen === "search" && (
        <SearchScreen
          user={currentUser}
          onSelectRoom={handleSelectRoom}
          onNavigate={setCurrentScreen} 
        />
      )}

      {currentScreen === "booking" && (
        <BookingScreen
          room={selectedRoom}
          searchData={searchData}
          onConfirm={handleConfirmBooking}
          onBack={() => setCurrentScreen("search")}
        />
      )}
      {currentScreen === "history" && (
        <HistoryScreen
          user={currentUser}
          onBack={() => setCurrentScreen("search")}
        />
      )}

      {currentScreen === "success" && (
        <BookingSuccessScreen
          booking={bookingData}
          onReset={resetApp}
        />
      )}
    </>
  );
}
