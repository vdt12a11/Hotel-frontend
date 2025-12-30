# Ứng dụng Quản lý Khách sạn - Hoàn thành Ngày 1-2

## Tổng quan Dự án

Một ứng dụng quản lý khách sạn React Native toàn diện được xây dựng theo chiến lược "Mock It Till You Make It". Ứng dụng này cung cấp quy trình đặt phòng hoàn chỉnh từ tìm kiếm phòng đến thanh toán, với trọng tâm vào kiến trúc sạch và trải nghiệm người dùng.

---

## Trạng thái Hoàn thành Ngày 1-2

### Ngày 1: Nền tảng & Thư viện Thành phần
- Thiết lập dự án với TypeScript + React Native 0.82.1
- Thư viện thành phần chia sẻ (13 thành phần có thể tái sử dụng)
- Hệ thống chủ đề với màu sắc, khoảng cách, kiểu chữ nhất quán
- Định nghĩa kiểu cho tất cả mô hình dữ liệu
- Cấu trúc điều hướng (Stack + Tab Navigators)

### Ngày 2: Triển khai Tính năng (100% Hoàn thành)
- Màn hình Tìm kiếm - Tìm kiếm phòng với bộ lọc (ngày, sức chứa, giá)
- Màn hình Chi tiết Phòng - Giới thiệu chuyên nghiệp với hình ảnh chính
- Màn hình Thanh toán - Quy trình thanh toán hoàn chỉnh (thẻ tín dụng/tiền mặt)
- Màn hình Nhận phòng/Trả phòng - Quy trình làm việc lễ tân
- Đặt phòng của Tôi - Lịch sử đặt phòng với dữ liệu giả
- Hồ sơ Người dùng - Quản lý tài khoản
- Xác thực - Quy trình đăng nhập/đăng ký

---

## Tính năng theo Thành viên Nhóm

### Tin (Thu ngân - Đặt phòng & Thanh toán)
Màn hình Chi tiết Phòng
- Hình ảnh chính toàn chiều rộng
- Hiển thị tiện nghi (WiFi, AC, Hồ bơi, TV)
- Bộ chọn phạm vi ngày cho đặt phòng
- Nút "Đặt ngay" cố định

Màn hình Thanh toán
- Chọn phương thức thanh toán (Thẻ tín dụng / Tiền mặt khi đến)
- Biểu mẫu thẻ tín dụng với xác thực
- Tóm tắt đặt phòng với phân tích giá
- Xử lý thanh toán giả

### Tung (Quản lý - Bảng điều khiển & Hồ sơ)
Màn hình Hồ sơ Người dùng
- Header gradient màu xanh với tên người dùng (anna_avetisyan)
- Avatar icon tròn màu trắng
- Các trường thông tin:
  • Username: anna_avetisyan
  • Phone: 818 123 4567
  • Email: info@aplusdesign.co
  • Password: ••••••• (ẩn)
- Nút "Save changes" (màu xanh, to)
- Nút "Đăng xuất" (màu đỏ, viền đỏ với icon)

Màn hình Đặt phòng của Tôi
- Tiêu đề: "Chuyến đi"
- Danh sách booking với hình ảnh và thông tin
- Hiển thị booking "Mountain Paradise" (Jan 5-8, 2026)
- Badge trạng thái: "SẮP TỚI" (màu xanh)
- Phần "Pending review" với khách sạn đã ở
- Các icon đánh giá: Sad, Neutral, Heart, Star, Happy

Màn hình Xác thực
- Đăng nhập với email/mật khẩu
- Đăng ký với xác thực
- Chuyển đổi hiển thị mật khẩu
- Xử lý lỗi

### Chau (Lễ tân - Nhận phòng/Trả phòng)
Màn hình Nhận phòng
- Tiêu đề: "Check-in Khách Sạn" với icon arrow-in
- Input "Mã Booking" (placeholder: VD: BK001)
- Nút "Tìm Booking" (màu xanh)
- Sau khi tìm:
  • Alert "Thành công: Tìm thấy booking: Bk001"
  • Thông tin phòng: "Deluxe Room 101"
  • Giá: $1500000 / đêm
  • Sức chứa: 2 người
- Thời gian lưu trú:
  • Ngày nhận phòng: 30/12/2025
  • Ngày trả phòng: 31/12/2025
- Thông tin khách: "John Doe"
- Nút "Xác nhận Check-in"
- Modal thành công: "Check-in Thành Công! Khách John Doe đã check-in vào phòng Deluxe Room 101"

Màn hình Trả phòng
- Tiêu đề: "Check-out Khách Sạn" với icon arrow-out
- Input "Số Phòng" (placeholder: VD: 201)
- Nút "Tìm Phòng" (màu xanh)
- Sau khi tìm:
  • Alert "Thành công: Tìm thấy phòng: 201"
  • Thông tin phòng: "Suite Room 201"
  • Giá: $2500000 / đêm
  • Sức chứa: 3 người
- Thông tin khách:
  • Khách: Jane Smith
  • Số đêm: 3 đêm
- Chi tiết thanh toán:
  • Tóm tắt giá: 2.500.000 VND x 3 đêm = 7.500.000 VND
  • Tổng cộng: 7.500.000 VND
  • Phụ phí (Minibar, Giặt ủi...): 150.000 VND
  • Tổng cộng (bao gồm phụ phí): 7.650.000 VND
- Nút "Xác nhận Check-out"
- Modal thành công: "Check-out Thành Công! Khách Jane Smith đã check-out khỏi phòng Suite Room 201. Tổng thanh toán: 7.650.000 VND"

### Tue (Lễ tân - Trang chủ & Tìm kiếm)
Màn hình Tìm kiếm (Trang chủ)
- Header gradient màu xanh:
  • Tiêu đề: "Find Your Perfect Room"
  • Chào mừng: "Welcome, Guest User"
- 4 nút Quick Action:
  • Check-In (điều hướng đến màn hình Nhận phòng)
  • Check-Out (điều hướng đến màn hình Trả phòng)
  • Reload Room (tải lại danh sách phòng với Alert)
  • View History (xem lịch sử đặt phòng)
- Bộ lọc tìm kiếm:
  • Room Name: Nhập tên phòng (optional)
  • Ngày nhận phòng: 2025-12-30
  • Ngày trả phòng: 2025-12-31
  • Capacity: Dropdown (none, 1, 2, 3, 4)
  • Price Range: Dropdown (none, 100-200, 200-300, 300-500, >500)
- Nút "Tìm phòng" (màu xanh, hiển thị Alert khi click)
- Danh sách "Recommended Rooms" với grid 2 cột:
  • Deluxe Ocean View: $150/night
  • Superior Garden: $120/night
  • Family Suite: $250/night

---

## Kiến trúc

### Cấu trúc Thư mục
```
Hotel-frontend/
├── src/
│   ├── features/              # Mô-đun dựa trên tính năng
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
│   │   └── components/        # Thành phần UI có thể tái sử dụng
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
│   │   ├── RootNavigator.tsx  # Stack navigator với luồng xác thực
│   │   └── TabNavigator.tsx   # Tab dưới (Tìm kiếm, Đặt phòng của Tôi, Hồ sơ)
│   ├── data/                  # Dữ liệu giả
│   │   ├── mockBookings.ts
│   │   ├── mockRooms.js
│   │   └── mockUsers.js
│   ├── constaints/
│   │   └── hotelTheme.tsx     # Màu sắc, khoảng cách, kiểu chữ, bóng
│   ├── types.ts               # Giao diện TypeScript
│   └── utils/
│       └── calculateNights.ts
├── android/                   # Mã gốc Android
├── ios/                       # Mã gốc iOS
├── App.tsx                    # Thành phần gốc
├── package.json
└── tsconfig.json
```

---

## Thành phần Chia sẻ (13 Tổng cộng)

### Thành phần Nhập liệu
1. AppButton - Nút chính/phụ với trạng thái tải
2. AppInput - Nhập văn bản với nhãn và xác thực
3. DateRangePicker - Bộ chọn ngày nhận/trả phòng
4. GuestCounter - Tăng/giảm số lượng khách

### Thành phần Hiển thị
5. AppText - Thành phần kiểu chữ (tiêu đề, phụ đề, nội dung, chú thích)
6. RoomCard - Thẻ hiển thị phòng với hình ảnh, giá, tiện nghi
7. PriceSummary - Phân tích giá đặt phòng
8. BookingCard - Mục đặt phòng cá nhân
9. BookingList - Danh sách đặt phòng với lọc
10. BookingStatusBadge - Chỉ báo trạng thái (Sắp tới, Quá khứ, Đã xác nhận)

### Thành phần Bố cục
11. ScreenContainer - Bao bọc màn hình nhất quán với khu vực an toàn
12. LoadingOverlay - Chỉ báo tải toàn màn hình
13. CustomModal - Modal có thể tái sử dụng cho xác nhận

---

## Chiến lược Dữ liệu Giả

Tất cả màn hình sử dụng dữ liệu giả mã hóa cứng cho Ngày 2 (không tích hợp backend thực):

### mockBookings.ts
```typescript
export const mockBookings = [
  { id: '1', hotelName: 'Sandy Hotel', date: 'Dec 15-17, 2025', status: 'past' },
  { id: '2', hotelName: 'Ocean View Resort', date: 'Dec 28-30, 2025', status: 'past' },
  { id: '3', hotelName: 'Mountain Paradise', date: 'Jan 5-8, 2026', status: 'upcoming' }
];
```

### Phòng Giả (CheckInScreen, CheckOutScreen)
```typescript
const mockRooms = [
  { id: '101', name: 'Deluxe Room 101', price: 1500000, capacity: 2 },
  { id: '201', name: 'Suite Room 201', price: 2500000, capacity: 3 }
];
```

### Booking ID Giả (CheckInScreen)
```typescript
const mockBookings = {
  'BK001': { room: 'Deluxe Room 101', guest: 'John Doe', checkIn: '30/12/2025', checkOut: '31/12/2025' },
  'Bk001': { room: 'Deluxe Room 101', guest: 'John Doe', checkIn: '30/12/2025', checkOut: '31/12/2025' }
};
```

### Booking Lịch sử (HistoryScreen)
```typescript
const mockBookings = [
  { id: '1', hotelName: 'Sandy Hotel', date: 'Dec 15-17, 2025', status: 'past' },
  { id: '2', hotelName: 'Ocean View Resort', date: 'Dec 28-30, 2025', status: 'past' },
  { id: '3', hotelName: 'Mountain Paradise', date: 'Jan 5-8, 2026', status: 'upcoming' }
];
```

### Giá trị Mã hóa cứng
- Tên khách: "John Doe" (Check-in), "Jane Smith" (Check-out), "Guest User" (History)
- Thuế suất: 10% (PaymentScreen)
- Phí bổ sung: 150,000 VND (Minibar, Giặt ủi...)
- Số đêm: 1 đêm (Deluxe), 3 đêm (Suite)
- Giá phòng:
  • Deluxe Room 101: 1,500,000 VND/đêm (2 người)
  • Suite Room 201: 2,500,000 VND/đêm (3 người)
- Giá history: $150/night (mỗi booking)

---

## Luồng Điều hướng

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

### Quy trình Đặt phòng Hoàn chỉnh
```
SearchScreen → RoomDetailScreen → PaymentScreen → BookingSuccessScreen
     ↓              ↓                   ↓                ↓
  Bộ chọn ngày   Tiện nghi         Thẻ tín dụng      Xác nhận
  Bộ lọc       Nút đặt phòng       Xác thực       Điều hướng về nhà
```

---

## Thiết lập & Cài đặt

### Điều kiện Tiên quyết
- Node.js >= 16
- npm hoặc yarn
- React Native CLI
- Android Studio (cho Android) hoặc Xcode (cho iOS)
- Android Emulator hoặc iOS Simulator

### Các Bước Cài đặt

1. Sao chép kho lưu trữ
   ```bash
   cd Hotel-frontend
   ```

2. Cài đặt phụ thuộc
   ```bash
   npm install
   ```

3. Cài đặt iOS pods (Chỉ Mac)
   ```bash
   cd ios && pod install && cd ..
   ```

4. Khởi động Metro Bundler
   ```bash
   npm start
   ```

5. Chạy trên Android
   ```bash
   # Mở terminal mới
   npm run android
   ```

6. Chạy trên iOS (Chỉ Mac)
   ```bash
   npm run ios
   ```

---

## Lệnh Phát triển

```bash
# Khởi động Metro bundler
npm start

# Chạy trên emulator Android
npm run android

# Chạy trên simulator iOS
npm run ios

# Chạy kiểm tra
npm test

# Kiểm tra kiểu
npx tsc --noEmit

# Lint mã
npm run lint

# Làm sạch và xây dựng lại
# Android
cd android && ./gradlew clean && cd ..
# iOS
cd ios && pod install && cd ..
```

---

## Hệ thống Chủ đề

### Màu sắc
```typescript
COLORS = {
  primary: '#007AFF',         // Màu thương hiệu chính
  secondary: '#FF9500',       // Màu nhấn mạnh
  background: '#F8F9FA',      // Nền màn hình
  white: '#FFFFFF',
  textDark: '#1C1C1E',
  textLight: '#8E8E93',
  border: '#E5E5EA',
  error: '#FF3B30',
  success: '#34C759'
}
```

### Khoảng cách
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

### Kiểu chữ
```typescript
FONTS = {
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' }
}
```

---

## Định nghĩa Kiểu

### Giao diện Cốt lõi
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

## Tính năng Chính Chi tiết

### 1. Màn hình Tìm kiếm
- Chọn Ngày: DateTimePicker cho nhận/trả phòng
- Bộ lọc: Sức chứa (1-4 khách), Phạm vi giá (100-500+)
- Nút Tìm kiếm: "Tìm phòng" kích hoạt tìm phòng
- Lưới Phòng: Bố cục 2 cột với RoomCard
- Hành động Nhanh: Nhận phòng, Trả phòng, Xem Lịch sử

### 2. Màn hình Chi tiết Phòng
- Hình ảnh Chính: Ảnh phòng toàn chiều rộng (40% chiều cao màn hình)
- Tiện nghi: WiFi, AC, Hồ bơi, TV với biểu tượng
- Bộ chọn Ngày: Thành phần DateRangePicker nội tuyến
- Chân trang Cố định: Nút "Đặt ngay" luôn hiển thị
- Điều hướng: Nút quay lại phủ trên hình ảnh

### 3. Màn hình Thanh toán
- Phương thức Thanh toán: Chuyển đổi Thẻ tín dụng / Tiền mặt khi đến
- Biểu mẫu Thẻ tín dụng: Tên chủ thẻ, số thẻ, hạn sử dụng, CVV
- Xác thực: Xác thực biểu mẫu trước khi gửi
- Tóm tắt Giá: Giá phòng + thuế (10%) phân tích
- Xử lý Giả: Xác nhận cảnh báo, điều hướng đến thành công

### 4. Màn hình Nhận phòng
- Workflow:
  1. Nhập mã booking (Bk001)
  2. Click "Tìm Booking" → Alert "Thành công"
  3. Hiển thị thông tin phòng: Deluxe Room 101, $1500000/đêm
  4. Hiển thị ngày: 30/12/2025 - 31/12/2025
  5. Hiển thị tên khách: John Doe
  6. Click "Xác nhận Check-in" → Modal thành công
- Mock data: Hỗ trợ booking ID "BK001" và "Bk001"
- Giao diện: Icon arrow-in, card trắng, nút xanh

### 5. Màn hình Đặt phòng của Tôi
- Tab title: "MyBookings"
- Header: "Chuyến đi" (màu đen)
- Upcoming booking:
  • Hình ảnh: Mountain Paradise resort
  • Tên: "Mountain Paradise"
  • Ngày: "Jan 5-8, 2026"
  • Badge: "SẮP TỚI" (màu xanh, rounded)
- Past bookings section:
  • Title: "2 Pending review"
  • Sandy Hotel (Dec 15-17, 2025) - Past
  • Ocean View Resort - thumbnail
  • Rating icons: Sad, Neutral, Heart, Star, Happy
- Hiển thị "How was your stay?" cho đánh giá

---

### 6. Màn hình Trả phòng
- Workflow:
  1. Nhập số phòng (201)
  2. Click "Tìm Phòng" → Alert "Thành công: Tìm thấy phòng: 201"
  3. Hiển thị thông tin:
     • Suite Room 201
     • Giá: $2500000/đêm, sức chứa 3 người
     • Khách: Jane Smith
     • Số đêm: 3 đêm
  4. Chi tiết thanh toán:
     • Tóm tắt giá: 2,500,000 x 3 = 7,500,000 VND
     • Phụ phí (Minibar, Giặt ủi): 150,000 VND
     • Tổng cộng: 7,650,000 VND (màu xanh)
  5. Click "Xác nhận Check-out" → Modal với tổng thanh toán
- Mock data: Phòng 201 với guest Jane Smith
- Tính năng: Tự động tính tổng tiền bao gồm phụ phí

### 7. Màn hình Lịch sử Đặt phòng
- Tiêu đề: "Booking History" với back button
- Header: Hiển thị tổng số booking ("3 bookings")
- Danh sách 3 booking cards từ mock data:
  1. **Sandy Hotel** - Status: Completed (màu xanh nhạt)
     • Guest: Guest User
     • Dates: Dec 15-17, 2025 (từ mock data)
     • Booked on: Dec 30, 2025
     • Price per night: $150
     • Total: $150
  
  2. **Ocean View Resort** - Status: Completed (màu xanh nhạt)
     • Guest: Guest User
     • Dates: Dec 28-30, 2025 (từ mock data)
     • Booked on: Dec 30, 2025
     • Price per night: $150
     • Total: $150
  
  3. **Mountain Paradise** - Status: Upcoming (màu xám)
     • Guest: Guest User
     • Dates: Jan 5-8, 2026 (từ mock data)
     • Booked on: Dec 30, 2025
     • Price per night: $150
     • Total: $150
- Mỗi card hiển thị:
  • Tên khách sạn
  • Status badge (Completed/Upcoming) với màu khác nhau
  • Thông tin khách (Guest name)
  • Ngày đặt/trả phòng
  • Ngày đặt
  • Giá mỗi đêm
  • Tổng giá
- Mock data: Tải từ mockBookings.ts (3 booking lịch sử)
- UI: Card trắng, badge đẹp, layout dọc

---

## Vấn đề Đã biết & Giải pháp

### Vấn đề 1: Lỗi Cấu hình TypeScript
Vấn đề: moduleResolution: "bundler" không tương thích
Giải pháp: Thay đổi thành moduleResolution: "node" trong tsconfig.json

### Vấn đề 2: Đặt phòng của Tôi Trống
Vấn đề: MyBookingsScreen hiển thị trạng thái trống
Giải pháp: Thêm tải dữ liệu giả trong useEffect

### Vấn đề 4: Lịch sử Đặt phòng Trống (ĐÃ SỬA)
Vấn đề: HistoryScreen không tải dữ liệu từ API backend
Giải pháp: Chuyển sang sử dụng mock data từ mockBookings.ts, hiển thị 3 booking lịch sử

- [ ]  hợp API Backend (thay thế dữ liệu giả)
- [ ] Cổng thanh toán thực (Stripe, PayPal)
- [ ] Lịch sẵn có phòng
- [ ] Xác thực người dùng với JWT
- [ ] Thông báo đẩy cho đặt phòng
- [ ] Đánh giá và xếp hạng
- [ ] Bảng điều khiển quản trị
- [ ] Hỗ trợ đa ngôn ngữ

---

## Đóng góp Nhóm

| Thành viên | Vai trò  | Màn hình                  | Thành phần         | Trạng thái     |
| ---------- | -------- | ------------------------- | ------------------ | -------------- |
| Tin        | Thu ngân | RoomDetail, Payment       | PriceSummary       | Hoàn thành     |
| Tung       | Quản lý  | Profile, MyBookings, Auth | BookingStatusBadge | Hoàn thành     |
| Chau       | Lễ tân   | CheckIn, CheckOut         | CustomModal        | Hoàn thành     |
| Tue        | Lễ tân   | Search, Home              | RoomCard           | Hoàn thTíchành |

---

## Định nghĩa Hoàn thành Ngày 2

Tất cả yêu cầu được đáp ứng:
- [x] Điều hướng từ Trang chủ → Phòng → Đặt → Thanh toán
- [x] Nhấp "Hồ sơ" → Xem chi tiết người dùng
- [x] Không có dữ liệu thực di chuyển (tất cả dữ liệu giả)
- [x] Trông như ứng dụng hoàn chỉnh
- [x] Tất cả màn hình có thể truy cập qua điều hướng
- [x] Chủ đề và kiểu dáng nhất quán
- [x] Kiểu TypeScript cho tất cả dữ liệu
- [x] Thư viện thành phần có thể tái sử dụng

---

