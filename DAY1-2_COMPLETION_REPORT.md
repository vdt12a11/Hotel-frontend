#  Hotel-frontend Day 1-2
## 

---

##  TÓM TẮT CÔNG VIỆC ĐÃ THỰC HIỆN


#### 1. **Layout Components** (Foundation)
-  Tạo thư mục `src/components/layout/`
-  Copy **ScreenContainer.tsx** từ Hotel-Chau
-  Copy **LoadingOverlay.tsx** từ Hotel-Chau
-  Copy **CustomModal.tsx** từ Hotel-Chau
- **Lý do:** Đồng bộ UI foundation, đảm bảo SafeArea, padding, keyboard handling thống nhất

#### 2. **Type Definitions** (Data Contract)
-  Tạo `src/types.ts`
-  Đồng bộ interfaces: User, Room, BookingData, BookingFormData, BookingHistoryItem
- **Lý do:** Đảm bảo navigation và screens dùng chung data model, tránh conflict

#### 3. **Navigation Refactoring** (Architecture)
-  Copy **RootNavigator.tsx** từ Hotel-Chau
-  Copy **TabNavigator.tsx** từ Hotel-Chau → sửa dùng UserProfileScreen
-  Xóa **AppNavigator.tsx** (navigation cũ)
-  Xóa **BottomTabNavigator.tsx** (navigation cũ)
- **Lý do:** Chuẩn hóa navigation flow: Login → TabNavigator → Modal screens

#### 4. **Components của Tín** (Reusable UI)
-  **PriceSummary.tsx** - Hiển thị breakdown giá phòng + thuế + giảm giá
-  **DateRangePicker.tsx** - Wrapper DateTimePicker với check-in/check-out
-  **GuestCounter.tsx** - Counter component với nút +/-
-  Cập nhật `components/index.ts` để export tất cả
- **Lý do:** Day 2 các màn hình Payment, Check-in, Check-out cần components này

#### 5. **UserProfileScreen Upgrade** (Profile Tab)
-  Thêm interface props: `user`, `onLogout`
-  Merge nội dung logout từ ProfileScreen
-  Wrap toàn bộ màn hình với ScreenContainer
-  Hiển thị user.name và user.email từ props
-  Thêm nút "Đăng xuất" với icon
- **Lý do:** Làm Profile chính thức trong TabNavigator, thay thế ProfileScreen cũ

#### 6. **App.tsx Refactoring** (Entry Point)
-  Thay AppNavigator bằng RootNavigator
-  Thêm state management: `user`, `handleLogin`, `handleLogout`
-  Wrap với GestureHandlerRootView + SafeAreaProvider
-  Sử dụng NavigationContainer
- **Lý do:** Chuẩn entry point, hỗ trợ auth flow và gesture navigation

#### 7. **Check-in/Check-out Screens** (Day 2 Assembly - Châu)
-  **CheckInScreen.tsx** - Mock check-in flow
  - Input: Booking ID
  - Components: DateRangePicker, AppInput, RoomCard, CustomModal
  - Mock data: hardcoded rooms + guest info
  
-  **CheckOutScreen.tsx** - Mock check-out flow
  - Input: Room number
  - Components: PriceSummary, RoomCard, CustomModal
  - Mock calculation: room price + additional charges
  
- **Chiến lược Day 2:** "Mock It Till You Make It" - không gọi API, chỉ hardcode data

---

## 📂 CẤU TRÚC PROJECT SAU KHI HOÀN THÀNH

```
Hotel-Tung/
├── App.tsx                          ✅ Refactored - NavigationContainer + RootNavigator
├── src/
│   ├── types.ts                     ✅ NEW - Type definitions
│   ├── components/
│   │   ├── index.ts                 ✅ Updated - Export tất cả components
│   │   ├── AppText.tsx              ✅ Tùng's component
│   │   ├── AppButton.tsx            ✅ Tùng's component
│   │   ├── AppInput.tsx             ✅ Tùng's component
│   │   ├── RoomCard.tsx             ✅ Tín's component
│   │   ├── BookingStatusBadge.tsx   ✅ Tín's component
│   │   ├── PriceSummary.tsx         ✅ NEW - Tín's component
│   │   ├── DateRangePicker.tsx      ✅ NEW - Tín's component
│   │   ├── GuestCounter.tsx         ✅ NEW - Tín's component
│   │   └── layout/                  ✅ NEW - Layout components
│   │       ├── ScreenContainer.tsx  ✅ Copied from Hotel-Chau
│   │       ├── LoadingOverlay.tsx   ✅ Copied from Hotel-Chau
│   │       └── CustomModal.tsx      ✅ Copied from Hotel-Chau
│   ├── navigation/
│   │   ├── RootNavigator.tsx        ✅ Copied from Hotel-Chau
│   │   └── TabNavigator.tsx         ✅ Copied & Modified (uses UserProfileScreen)
│   │   ├── ❌ AppNavigator.tsx      🗑️ DELETED
│   │   └── ❌ BottomTabNavigator.tsx 🗑️ DELETED
│   ├── screens/
│   │   ├── CheckInScreen.tsx        ✅ NEW - Day 2 (Châu)
│   │   ├── CheckOutScreen.tsx       ✅ NEW - Day 2 (Châu)
│   │   ├── LoginScreen.tsx          ✅ Existing
│   │   ├── SignupScreen.tsx         ✅ Existing
│   │   ├── SearchScreen.tsx         ✅ Existing
│   │   ├── BookingScreen.tsx        ✅ Existing
│   │   ├── BookingSuccessScreen.tsx ✅ Existing
│   │   ├── MyBookingsScreen.tsx     ✅ Existing
│   │   └── userprofile/
│   │       └── UserProfileScreen.tsx ✅ UPGRADED - Added props, logout, ScreenContainer
│   ├── constaints/
│   │   └── hotelTheme.tsx           ✅ Existing (same as Hotel-Chau)
│   ├── data/
│   │   ├── mockRooms.js             ✅ Existing
│   │   ├── mockUsers.js             ✅ Existing
│   │   └── mockBookings.ts          ✅ Existing
│   └── utils/
│       └── calculateNights.js       ✅ Existing
```

---

## 🎯 DEFINITION OF DONE - DAY 1

### ✅ Checklist - Tất cả đã hoàn thành

- [x] Layout components (ScreenContainer, LoadingOverlay, CustomModal) đã được copy
- [x] types.ts đã được tạo và đồng bộ với Hotel-Chau
- [x] Navigation đã được refactor: RootNavigator + TabNavigator
- [x] Navigation cũ đã được xóa: AppNavigator, BottomTabNavigator
- [x] 3 components của Tín đã được tạo: PriceSummary, DateRangePicker, GuestCounter
- [x] UserProfileScreen đã được nâng cấp: props user/onLogout, wrap ScreenContainer
- [x] App.tsx đã được cập nhật: NavigationContainer + auth state
- [x] Check-in/Check-out screens đã được tạo cho Day 2 (Châu)
- [x] Tất cả components đã được export trong index.ts
- [x] Code đã sử dụng hotelTheme.tsx thống nhất

---

## 🚀 DAY 2 - ASSEMBLY DAY PLAN
### Chiến lược: "Mock It Till You Make It"

### 📋 Phân công công việc Day 2

#### 1. **Châu - Lễ Tân (Check-in / Check-out)** ✅ READY
**Màn hình:**
- ✅ CheckInScreen.tsx - Đã tạo
- ✅ CheckOutScreen.tsx - Đã tạo

**Components được sử dụng:**
- DateRangePicker (từ Tín)
- AppInput (từ Tùng)
- RoomCard (từ Tín)
- CustomModal (layout)
- PriceSummary (từ Tín - cho check-out)

**Chiến thuật:**
- Mock booking lookup bằng hardcoded data
- Không gọi API, chỉ Alert + Modal
- Dữ liệu giả: `mockRooms[]` trong file









