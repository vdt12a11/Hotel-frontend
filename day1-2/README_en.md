# Hotel Management App - Day 1-2 Complete Implementation

## Project Overview

A comprehensive React Native Hotel Management Application built following the "Mock It Till You Make It" strategy. This app provides a complete booking flow from room search to payment, with a focus on clean architecture and user experience.

---

## Day 1-2 Completion Status

### Day 1: Foundation & Component Library
- Project setup with TypeScript + React Native 0.82.1
- Shared component library (13 reusable components)
- Theme system with consistent colors, spacing, typography
- Type definitions for all data models
- Navigation structure (Stack + Tab Navigators)

### Day 2: Feature Implementation (100% Complete)
- Search Screen - Room search with filters (date, capacity, price)
- Room Detail Screen - Professional showcase with hero image
- Payment Screen - Complete payment flow (credit card/cash)
- Check-in/Check-out Screens - Reception workflows
- My Bookings - Booking history with mock data
- User Profile - Account management
- Authentication - Login/Register flows

---

## Features by Team Member

### Tin (Cashier - Booking & Payment)
Room Detail Screen
- Full-width hero image
- Amenities display (WiFi, AC, Pool, TV)
- Date range picker for booking
- Sticky "Book Now" button

Payment Screen
- Payment method selection (Credit Card / Cash on Arrival)
- Credit card form with validation
- Booking summary with price breakdown
- Mock payment processing

### Tung (Manager - Dashboard & Profile)
User Profile Screen
- Blue gradient header with username (anna_avetisyan)
- White circular avatar icon
- Editable user information fields:
  • Username: anna_avetisyan
  • Phone: 818 123 4567
  • Email: info@aplusdesign.co
  • Password: ••••••• (hidden)
- "Save changes" button (blue, large)
- "Đăng xuất" (Logout) button (red outline with icon)

My Bookings Screen
- Title: "Chuyến đi" (My Trips)
- Booking list with images and information
- Display booking "Mountain Paradise" (Jan 5-8, 2026)
- Status badge: "SẮP TỚI" (Upcoming - blue badge)
- "Pending review" section with past hotels
- Rating icons: Sad, Neutral, Heart, Star, Happy

Authentication Screens
- Login with email/password
- Signup with validation
- Password visibility toggle
- Error handling

### Chau (Receptionist - Check-in/out)
Check-in Screen
- Title: "Check-in Khách Sạn" with arrow-in icon
- Input "Mã Booking" (placeholder: VD: BK001)
- "Tìm Booking" button (blue)
- After search:
  • Alert "Success: Found booking: Bk001"
  • Room info: "Deluxe Room 101"
  • Price: $1500000 / night
  • Capacity: 2 guests
- Stay duration:
  • Check-in date: 30/12/2025
  • Check-out date: 31/12/2025
- Guest information: "John Doe"
- "Xác nhận Check-in" button
- Success modal: "Check-in Thành Công! Guest John Doe has checked in to room Deluxe Room 101"

Check-out Screen
- Title: "Check-out Khách Sạn" with arrow-out icon
- Input "Số Phòng" (placeholder: VD: 201)
- "Tìm Phòng" button (blue)
- After search:
  • Alert "Success: Found room: 201"
  • Room info: "Suite Room 201"
  • Price: $2500000 / night
  • Capacity: 3 guests
- Guest information:
  • Guest: Jane Smith
  • Nights stayed: 3 nights
- Payment details:
  • Price summary: 2,500,000 VND x 3 nights = 7,500,000 VND
  • Total: 7,500,000 VND
  • Additional charges (Minibar, Laundry...): 150,000 VND
  • Grand total (incl. extras): 7,650,000 VND
- "Xác nhận Check-out" button
- Success modal: "Check-out Thành Công! Guest Jane Smith has checked out from Suite Room 201. Total payment: 7,650,000 VND"

### Tue (Concierge - Home & Search)
Search Screen (Home)
- Blue gradient header:
  • Title: "Find Your Perfect Room"
  • Welcome: "Welcome, Guest User"
- 4 Quick Action buttons:
  • Check-In (navigate to Check-in screen)
  • Check-Out (navigate to Check-out screen)
  • Reload Room (reload room list with Alert)
  • View History (view booking history)
- Search filters:
  • Room Name: Input room name (optional)
  • Check-in date: 2025-12-30
  • Check-out date: 2025-12-31
  • Capacity: Dropdown (none, 1, 2, 3, 4)
  • Price Range: Dropdown (none, 100-200, 200-300, 300-500, >500)
- "Tìm phòng" button (blue, shows Alert on click)
- "Recommended Rooms" list with 2-column grid:
  • Deluxe Ocean View: $150/night
  • Superior Garden: $120/night
  • Family Suite: $250/night

---

## Architecture

### Folder Structure
```
Hotel-frontend/
├── src/
│   ├── features/              # Feature-based modules
│   │   ├── auth/
│   │   │   ├── screens/       # LoginScreen, SignupScreen
│   │   │   ├── hooks/         # useLogin hook
│   │   │   └── services/      # AuthService
│   │   ├── booking/
│   │   │   └── screens/       # BookingScreen, MyBookingsScreen, BookingSuccessScreen
│   │   ├── checkinout/
│   │   │   └── screens/       # CheckInScreen, CheckOutScreen
│   │   ├── payment/
│   │   │   └── screens/       # PaymentScreen
│   │   ├── profile/
│   │   │   └── screens/       # UserProfileScreen
│   │   ├── room/
│   │   │   └── screens/       # RoomDetailScreen
│   │   └── search/
│   │       ├── screens/       # SearchScreen
│   │       └── services/      # roomSearchService
│   ├── shared/
│   │   └── components/        # Reusable UI components
│   │       ├── AppButton.tsx
│   │       ├── AppInput.tsx
│   │       ├── AppText.tsx
│   │       ├── RoomCard.tsx
│   │       ├── PriceSummary.tsx
│   │       ├── DateRangePicker.tsx
│   │       ├── GuestCounter.tsx
│   │       ├── dashboard/     # BookingCard, BookingList, BookingStatusBadge
│   │       └── layout/        # ScreenContainer, LoadingOverlay, CustomModal
│   ├── navigation/
│   │   ├── RootNavigator.tsx  # Stack navigator with auth flow
│   │   └── TabNavigator.tsx   # Bottom tabs (Search, MyBookings, Profile)
│   ├── data/                  # Mock data
│   │   ├── mockBookings.ts
│   │   ├── mockRooms.js
│   │   └── mockUsers.js
│   ├── constaints/
│   │   └── hotelTheme.tsx     # Colors, spacing, typography, shadows
│   ├── types.ts               # TypeScript interfaces
│   └── utils/
│       └── calculateNights.ts
├── android/                   # Android native code
├── ios/                       # iOS native code
├── App.tsx                    # Root component
├── package.json
└── tsconfig.json
```

---

## Shared Components (13 Total)

### Input Components
1. AppButton - Primary/secondary buttons with loading states
2. AppInput - Text input with labels and validation
3. DateRangePicker - Check-in/check-out date selector
4. GuestCounter - Increment/decrement guest count

### Display Components
5. AppText - Typography component (title, subtitle, body, caption)
6. RoomCard - Room display card with image, price, amenities
7. PriceSummary - Booking price breakdown
8. BookingCard - Individual booking item
9. BookingList - List of bookings with filtering
10. BookingStatusBadge - Status indicator (Upcoming, Past, Confirmed)

### Layout Components
11. ScreenContainer - Consistent screen wrapper with safe area
12. LoadingOverlay - Full-screen loading indicator
13. CustomModal - Reusable modal for confirmations

---

## Mock Data Strategy

All screens use hardcoded mock data for Day 2 (no real backend integration):

### mockBookings.ts
```typescript
export const mockBookings = [
  { id: '1', hotelName: 'Sandy Hotel', date: 'Dec 15-17, 2025', status: 'past' },
  { id: '2', hotelName: 'Ocean View Resort', date: 'Dec 28-30, 2025', status: 'past' },
  { id: '3', hotelName: 'Mountain Paradise', date: 'Jan 5-8, 2026', status: 'upcoming' }
];
```

### Mock Rooms (CheckInScreen, CheckOutScreen)
```typescript
const mockRooms = [
  { id: '101', name: 'Deluxe Room 101', price: 1500000, capacity: 2 },
  { id: '201', name: 'Suite Room 201', price: 2500000, capacity: 3 }
];
```

### Mock Booking IDs (CheckInScreen)
```typescript
const mockBookings = {
  'BK001': { room: 'Deluxe Room 101', guest: 'John Doe', checkIn: '30/12/2025', checkOut: '31/12/2025' },
  'Bk001': { room: 'Deluxe Room 101', guest: 'John Doe', checkIn: '30/12/2025', checkOut: '31/12/2025' }
};
```

### Mock Booking History (HistoryScreen)
```typescript
const mockBookings = [
  { id: '1', hotelName: 'Sandy Hotel', date: 'Dec 15-17, 2025', status: 'past' },
  { id: '2', hotelName: 'Ocean View Resort', date: 'Dec 28-30, 2025', status: 'past' },
  { id: '3', hotelName: 'Mountain Paradise', date: 'Jan 5-8, 2026', status: 'upcoming' }
];
```

### Hardcoded Values
- Guest names: "John Doe" (Check-in), "Jane Smith" (Check-out), "Guest User" (History)
- Tax rate: 10% (PaymentScreen)
- Additional charges: 150,000 VND (Minibar, Laundry...)
- Nights: 1 night (Deluxe), 3 nights (Suite)
- Room prices:
  • Deluxe Room 101: 1,500,000 VND/night (2 guests)
  • Suite Room 201: 2,500,000 VND/night (3 guests)
- History price: $150/night (per booking)

---

## Navigation Flow

```
Root Navigator (Stack)
├── Auth Stack
│   ├── Login Screen
│   └── Signup Screen
└── Main App Stack
    ├── Tab Navigator (Bottom Tabs)
    │   ├── Search Tab → SearchScreen
    │   ├── MyBookings Tab → MyBookingsScreen
    │   └── Profile Tab → UserProfileScreen
    ├── Check-in Screen
    ├── Check-out Screen
    ├── History Screen
    ├── Room Detail Screen
    ├── Payment Screen
    ├── Booking Screen
    └── Booking Success Screen
```

### Complete Booking Flow
```
SearchScreen → RoomDetailScreen → PaymentScreen → BookingSuccessScreen
     ↓              ↓                   ↓                ↓
  Date picker   Amenities         Credit card      Confirmation
  Filters       Book button       Validation       Navigate home
```

---

## Setup & Installation

### Prerequisites
- Node.js >= 16
- npm or yarn
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)
- Android Emulator or iOS Simulator

### Installation Steps

1. Clone the repository
   ```bash
   cd Hotel-Tin
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Install iOS pods (Mac only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. Start Metro Bundler
   ```bash
   npm start
   ```

5. Run on Android
   ```bash
   # Open new terminal
   npm run android
   ```

6. Run on iOS (Mac only)
   ```bash
   npm run ios
   ```

---

## Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios

# Run tests
npm test

# Type checking
npx tsc --noEmit

# Lint code
npm run lint

# Clean and rebuild
# Android
cd android && ./gradlew clean && cd ..
# iOS
cd ios && pod install && cd ..
```

---

## Theme System

### Colors
```typescript
COLORS = {
  primary: '#007AFF',         // Main brand color
  secondary: '#FF9500',       // Accent color
  background: '#F8F9FA',      // Screen background
  white: '#FFFFFF',
  textDark: '#1C1C1E',
  textLight: '#8E8E93',
  border: '#E5E5EA',
  error: '#FF3B30',
  success: '#34C759'
}
```

### Spacing
```typescript
SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
}
```

### Typography
```typescript
FONTS = {
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' }
}
```

---

## Type Definitions

### Core Interfaces
```typescript
export interface User {
  userID: string;
  name: string;
  email?: string;
}

export interface Room {
  id?: string | number;
  name: string;
  image?: string;
  size?: string;
  bed: string;
  view: string;
  price: number;
  capacity: number;
}

export interface BookingData {
  room: Room;
  formData: BookingFormData;
  totalPrice: number;
}

export interface BookingHistoryItem {
  _id: string;
  room: Room;
  formData: {
    name: string;
    checkIn: string;
    checkOut: string;
  };
  createdAt: string;
  status: string;
}
```

---

## Key Features in Detail

### 1. Search Screen
- Date Selection: DateTimePicker for check-in/check-out
- Filters: Capacity (1-4 guests), Price Range (100-500+)
- Search Button: "Tim phong" triggers room fetch
- Room Grid: 2-column layout with RoomCard
- Quick Actions: Check-In, Check-Out, View History buttons

### 2. Room Detail Screen
- Hero Image: Full-width room photo (40% screen height)
- Amenities: WiFi, AC, Pool, TV with icons
- Date Picker: Inline DateRangePicker component
- Sticky Footer: "Book Now" button always visible
- Navigation: Back button overlay on image

### 3. Payment Screen
- Payment Methods: Credit Card / Cash on Arrival toggle
- Credit Card Form: Cardholder name, card number, expiry, CVV
- Validation: Form validation before submission
- Price Summary: Room price + tax (10%) breakdown
- Mock Processing: Alert confirmation, navigate to success

### 4. Check-in Screen
- Workflow:
  1. Enter booking ID (Bk001)
  2. Click "Tìm Booking" → Alert "Success"
  3. Display room info: Deluxe Room 101, $1500000/night
  4. Display dates: 30/12/2025 - 31/12/2025
  5. Display guest name: John Doe
  6. Click "Xác nhận Check-in" → Success modal
- Mock data: Supports booking IDs "BK001" and "Bk001"
- UI: Arrow-in icon, white cards, blue buttons

### 5. My Bookings Screen
- Tab title: "MyBookings"
- Header: "Chuyến đi" (My Trips, black text)
- Upcoming booking:
  • Image: Mountain Paradise resort
  • Name: "Mountain Paradise"
  • Date: "Jan 5-8, 2026"
  • Badge: "SẮP TỚI" (Upcoming - blue, rounded)
- Past bookings section:
  • Title: "2 Pending review"
  • Sandy Hotel (Dec 15-17, 2025) - Past
  • Ocean View Resort - thumbnail
  • Rating icons: Sad, Neutral, Heart, Star, Happy
- Displays "How was your stay?" for reviews

### 6. Check-out Screen
- Workflow:
  1. Enter room number (201)
  2. Click "Tìm Phòng" → Alert "Success: Found room: 201"
  3. Display information:
     • Suite Room 201
     • Price: $2500000/night, capacity 3 guests
     • Guest: Jane Smith
     • Nights: 3 nights
  4. Payment details:
     • Price summary: 2,500,000 x 3 = 7,500,000 VND
     • Additional charges (Minibar, Laundry): 150,000 VND
     • Grand total: 7,650,000 VND (blue text)
  5. Click "Xác nhận Check-out" → Modal with total payment
- Mock data: Room 201 with guest Jane Smith
- Feature: Auto-calculate total including extras

### 7. Booking History Screen
- Title: "Booking History" with back button
- Header: Display total number of bookings ("3 bookings")
- List of 3 booking cards from mock data:
  1. **Sandy Hotel** - Status: Completed (light green)
     • Guest: Guest User
     • Dates: Dec 15-17, 2025 (from mock data)
     • Booked on: Dec 30, 2025
     • Price per night: $150
     • Total: $150
  
  2. **Ocean View Resort** - Status: Completed (light green)
     • Guest: Guest User
     • Dates: Dec 28-30, 2025 (from mock data)
     • Booked on: Dec 30, 2025
     • Price per night: $150
     • Total: $150
  
  3. **Mountain Paradise** - Status: Upcoming (light gray)
     • Guest: Guest User
     • Dates: Jan 5-8, 2026 (from mock data)
     • Booked on: Dec 30, 2025
     • Price per night: $150
     • Total: $150
- Each card displays:
  • Hotel name
  • Status badge (Completed/Upcoming) with different colors
  • Guest information (Guest name)
  • Check-in/check-out dates
  • Booking date
  • Price per night
  • Total price
- Mock data: Loaded from mockBookings.ts (3 booking history)
- UI: White cards, nice badges, vertical layout

---

## Known Issues & Solutions

### Issue 1: TypeScript Config Error
Problem: moduleResolution: "bundler" not compatible
Solution: Changed to moduleResolution: "node" in tsconfig.json

### Issue 2: Empty My Bookings
Problem: MyBookingsScreen showed empty state
Solution: Added mock data loading in useEffect

### Issue 4: Empty Booking History (FIXED)
Problem: HistoryScreen failed to load data from API backend
Solution: Switched to using mock data from mockBookings.ts, displays 3 booking history entries

- [ ] Backend API integration (replace mock data)
- [ ] Real payment gateway (Stripe, PayPal)
- [ ] Room availability calendar
- [ ] User authentication with JWT
- [ ] Push notifications for bookings
- [ ] Reviews and ratings
- [ ] Admin dashboard
- [ ] Multi-language support

---

## Team Contributions

| Member | Role         | Screens                   | Components         | Status   |
| ------ | ------------ | ------------------------- | ------------------ | -------- |
| Tin    | Cashier      | RoomDetail, Payment       | PriceSummary       | Complete |
| Tung   | Manager      | Profile, MyBookings, Auth | BookingStatusBadge | Complete |
| Chau   | Receptionist | CheckIn, CheckOut         | CustomModal        | Complete |
| Tue    | Concierge    | Search, Home              | RoomCard           | Complete |

---

## Day 2 Definition of Done

All requirements met:
- [x] Navigate from Home → Room → Book → Payment
- [x] Click "Profile" → See user details
- [x] No real data moving (all mock data)
- [x] Looks like a finished app
- [x] All screens accessible via navigation
- [x] Consistent theme and styling
- [x] TypeScript types for all data
- [x] Reusable component library

---


