import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import BookingList from "../../../shared/components/dashboard/BookingList";
import { getAvailableRooms } from '../services/room.service';
import { COLORS, SIZES, SPACING, SHADOWS } from "../../../constaints/hotelTheme";
import type { ScreenName, User } from "../../../types";
import { AppButton, AppInput, AppText } from "../../../shared/components";
import Config from "react-native-config";
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40 - 15) / 2;

interface Room {
  _id?: string ;
  name: string;
  image: string;
  size: string;
  amenities?: string[];
  bed: string;
  view: string;
  price: number;
  capacity?: number;
}



interface SearchScreenProps {
  user?: User;
  onSelectRoom?: (room: Room, search: { capacity: string }) => void;
  onNavigate?: (screen: ScreenName) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ user, onSelectRoom, onNavigate }) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  console.log('SearchScreen props.user:', user, 'route.params.currentUser:', route?.params?.currentUser);
   const routeOnSelectRoom = route?.params?.onSelectRoom;
   const routeCurrentUser = route?.params?.currentUser;
   const routeOnNavigate = route?.params?.onNavigate;

  const API_URL = (Config && Config.API_URL) ? Config.API_URL : 'http://10.0.2.2:3000';

  const [bookingList, setBookingList] = useState<any[]>([]);
  const mockUser: User = { userID: '1', name: 'Guest User', email: 'guest@example.com' };
  const currentUser = user || routeCurrentUser || null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  const [recommendedRooms, setRecommendedRooms] = useState<Room[]>([]);
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [showCheckInPicker, setShowCheckInPicker] = useState<boolean>(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[] | null>(null);
  // Hàm xử lý tìm phòng
  const linkWallet = async () => {
    try {
      const cu = user || routeCurrentUser || null;
      if (!cu) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập để liên kết ví");
        return;
      }
      console.log('linkWallet user:', cu);
      const url = `${API_URL}/payment/link-wallet`;
      console.log('POST', url);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: cu.userID, email: cu.email }),
      });

      const contentType = (res.headers.get?.('content-type') || '').toLowerCase();
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          Alert.alert("Error", data?.message || JSON.stringify(data));
          return;
        }
        console.log('linkWallet json response', data);
        if (data?.deeplink) Linking.openURL(data.deeplink);
        Alert.alert("Success", "Wallet linked");
      } else {
        const text = await res.text();
        console.log('linkWallet text response', text);
        if (!res.ok) {
          Alert.alert("Error", text || `Request failed (${res.status})`);
          return;
        }
        Alert.alert("Success", "Wallet linked (non-JSON response)");
      }
    } catch (err) {
      console.log("testApi error:", err);
      Alert.alert("API Error", `Cannot reach API at ${API_URL}\n${String(err)}`);
    }
  };
  const handleSearchRoom = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert("Lỗi", "Vui lòng chọn ngày nhận và trả phòng");
      return;
    }
    if (checkOut <= checkIn) {
      Alert.alert("Lỗi", "Ngày trả phòng phải sau ngày nhận phòng");
      return;
    }

    setSearchLoading(true);
    try {
      const checkInDate = checkIn.toISOString().split("T")[0];
      const checkOutDate = checkOut.toISOString().split("T")[0];
      const rooms = await getAvailableRooms(checkInDate, checkOutDate);
      const resUpcoming = await fetch(`${Config.API_URL}/history/upcoming/${user?.userID}`);
      const dataUpcoming = await resUpcoming.json();
      const mapped = dataUpcoming.map((room: any, idx: number) => ({
        id: room._id || String(idx),
        name: room.name || "No name",
        image: room.image || "https://via.placeholder.com/80",
        date: `${checkInDate} - ${checkOutDate}`,
        status: "available",
      }));
      setBookingList(mapped);

      const checkInTime = new Date(checkInDate).getTime();
      const checkOutTime = new Date(checkOutDate).getTime();
      const availableRecommendedRooms = rooms.filter((room: any) => {
        if (!room.bookings || !Array.isArray(room.bookings) || room.bookings.length === 0) return true;
        return !room.bookings.some((b: any) => {
          const bIn = new Date(b.checkIn).getTime();
          const bOut = new Date(b.checkOut).getTime();
          return bIn < checkOutTime && bOut > checkInTime;
        });
      });
      setRecommendedRooms(availableRecommendedRooms);
      if (!rooms || rooms.length === 0) {
        Alert.alert("Thông báo", "Phòng không tồn tại");
      }
    } catch (err) {
      Alert.alert("Lỗi", `${Config.API_URL}Không thể lấy danh sách phòng`);
    } finally {
      setSearchLoading(false);
    }
  };
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [showCapacityDropdown, setShowCapacityDropdown] = useState<boolean>(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState<boolean>(false);

  const fetchRooms = async (): Promise<void> => {
    try {
      const res = await fetch(`${Config.API_URL}/room`);
      const data = await res.json();
      // const resUpcoming = await fetch(`${Config.API_URL}/history/upcoming/${user?.userID}`);
      // const dataUpcoming = await resUpcoming.json();
      if (!res.ok) {
        Alert.alert("Lỗi", (data as { message?: string }).message || `Lấy phòng thất bại`);
        return;
      }
      setRooms(data as Room[]);
      // setBookingList(
      //   (dataUpcoming as any[]).map((room: any, idx) => ({
      //     id: room._id || String(idx),
      //     hotelName: room.room.name,
      //     image: room.room.image,
      //     date: room.formData.checkIn,
      //     //status: "available",
      //   }))
      // );
    } catch (err) {
      console.log("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (rooms.length > 0) {
    console.log("Rooms fetched:", rooms.length);
  }

  const filteredRooms: Room[] = recommendedRooms.length > 0 ? recommendedRooms.filter((r) => {
    let matchCapacity = true;
    if (capacity !== "none") {
      const roomCapacity = r.capacity ?? 0;
      matchCapacity = roomCapacity >= Number(capacity);
    }
    const matchName = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchPrice = true;
    if (priceRange !== "none") {
      if (priceRange.includes("-")) {
        const [min, max] = priceRange.split("-").map(Number);
        matchPrice = r.price >= min && r.price <= max;
      }
      if (priceRange.startsWith(">")) {
        const min = Number(priceRange.replace(">", ""));
        matchPrice = r.price > min;
      }
    }
    return matchCapacity && matchName && matchPrice;
  }) : [];

  const handleSelectRoom = (room: Room) => {
    navigation.navigate('Booking', {
      room,
      searchData: { capacity },
      onBookingSuccess: () => setRecommendedRooms([]), 
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
    });
  };

  const testApi = async () => {
    try {
      console.log('Testing API at', API_URL);
      const res = await fetch(`${API_URL}/room`);
      const data = await res.json();
      if (!res.ok) {
        Alert.alert("API Error", (data as { message?: string }).message || "Request failed");
        return;
      }
      Linking.openURL(data.deeplink);
      Alert.alert("API OK", `Fetched ${Array.isArray(data) ? data.length : JSON.stringify(data)}`);
    } catch (err) {
      console.log("testApi error:", err);
      Alert.alert("API Error", `Cannot reach API at ${API_URL}\n${String(err)}`);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.screenBackGround }]}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <View style={styles.headerContent}>
          <AppText variant="title" color={COLORS.white}>
            Find Your Perfect Room
          </AppText>
          <AppText variant="body" color={COLORS.primaryLight} style={{ marginTop: SPACING.sm }}>
            Welcome, {currentUser?.name ?? "Guest"}
          </AppText>
          <View style={[styles.buttonRow, { marginTop: SPACING.md }]}>
            <AppButton
              title="Reload Room"
              onPress={fetchRooms}
              style={styles.reloadButton}
            />
            <AppButton
              title="Link momo"
              onPress={linkWallet}
              style={styles.reloadButton}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.searchCard, { ...SHADOWS.medium }]}>
          <View>
            <AppInput
              label="Room Name"
              placeholder="Nhập tên phòng..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.dateRow}>
            <View style={styles.dateCol}>
              <AppText variant="caption" color={COLORS.textLight} style={{ marginBottom: SPACING.xs, fontWeight: "500" }}>
                Ngày nhận phòng
              </AppText>
              <TouchableOpacity onPress={() => setShowCheckInPicker(true)} style={[styles.dateInput, { backgroundColor: COLORS.lightGray, justifyContent: 'center', paddingHorizontal: SPACING.md }]}>
                <AppText variant="body" color={COLORS.textDark}>
                  {checkIn.toISOString().split("T")[0]}
                </AppText>
              </TouchableOpacity>
              {showCheckInPicker && (
                <DateTimePicker
                  value={checkIn}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    setShowCheckInPicker(Platform.OS === "ios");
                    if (selectedDate) setCheckIn(selectedDate);
                  }}
                  minimumDate={new Date()}
                />
              )}
            </View>
            <View style={styles.dateCol}>
              <AppText variant="caption" color={COLORS.textLight} style={{ marginBottom: SPACING.xs, fontWeight: "500" }}>
                Ngày trả phòng
              </AppText>
              <TouchableOpacity onPress={() => setShowCheckOutPicker(true)} style={[styles.dateInput, { backgroundColor: COLORS.lightGray, justifyContent: 'center', paddingHorizontal: SPACING.md }]}>
                <AppText variant="body" color={COLORS.textDark}>
                  {checkOut.toISOString().split("T")[0]}
                </AppText>
              </TouchableOpacity>
              {showCheckOutPicker && (
                <DateTimePicker
                  value={checkOut}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                    setShowCheckOutPicker(Platform.OS === "ios");
                    if (selectedDate) setCheckOut(selectedDate);
                  }}
                  minimumDate={checkIn}
                />
              )}
            </View>
          </View>

          <View style={[styles.row, { zIndex: 100 }]}>
            <View style={[styles.col, { marginRight: SPACING.md, zIndex: showCapacityDropdown ? 2000 : 1 }]}>
              <AppText variant="caption" color={COLORS.textLight} style={{ marginBottom: SPACING.xs, fontWeight: "500" }}>
                Capacity
              </AppText>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setShowCapacityDropdown(!showCapacityDropdown);
                  setShowPriceDropdown(false);
                }}
              >
                <AppText variant="body" color={COLORS.textDark}>
                  {capacity || "Select capacity"}
                </AppText>
                <AppText variant="caption">▼</AppText>
              </TouchableOpacity>
              {showCapacityDropdown && (
                <View style={[styles.dropdownList, { ...SHADOWS.medium }]}>
                  {["none", "1", "2", "3", "4"].map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCapacity(c);
                        setShowCapacityDropdown(false);
                      }}
                    >
                      <AppText variant="body" color={COLORS.textDark}>
                        {c}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={[styles.col, { zIndex: showPriceDropdown ? 2000 : 1 }]}>
              <AppText variant="caption" color={COLORS.textLight} style={{ marginBottom: SPACING.xs, fontWeight: "500" }}>
                Price Range
              </AppText>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setShowPriceDropdown(!showPriceDropdown);
                  setShowCapacityDropdown(false);
                }}
              >
                <AppText variant="body" color={COLORS.textDark}>
                  {priceRange || "Select range"}
                </AppText>
                <AppText variant="caption">▼</AppText>
              </TouchableOpacity>
              {showPriceDropdown && (
                <View style={[styles.dropdownList, { ...SHADOWS.medium }]}>
                  {["none", "100-200", "200-300", "300-500", ">500"].map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setPriceRange(r);
                        setShowPriceDropdown(false);
                      }}
                    >
                      <AppText variant="body" color={COLORS.textDark}>
                        {r}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <AppButton
            title={searchLoading ? "Đang tìm..." : "Tìm phòng"}
            onPress={handleSearchRoom}
            disabled={searchLoading}
            style={{
              marginTop: SPACING.md,
              alignSelf: 'stretch',
              minWidth: 120,
              paddingVertical: SPACING.md,
              paddingHorizontal: SPACING.lg,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radiusSmall,
              marginLeft: 0,
              opacity: searchLoading ? 0.6 : 1,
            }}
          />
        </View>

        <BookingList bookings={bookingList} todayStr={todayStr} />

        <AppText variant="subtitle" color={COLORS.textDark} style={{ marginBottom: SPACING.md }}>
          Recommended Rooms
        </AppText>
        {filteredRooms.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredRooms.map((room) => (
              <View key={room._id ?? room.name} style={[styles.roomCard, { ...SHADOWS.light }]}>
                <Image source={{ uri: room.image }} style={styles.roomImage} />
                <View style={styles.roomContent}>
                  <AppText variant="body" color={COLORS.textDark} numberOfLines={1} style={{ fontWeight: "600" }}>
                    {room.name}
                  </AppText>
                  <View style={styles.roomMetaContainer}>
                    <AppText variant="caption" color={COLORS.textLight}>
                      📍 {room.size}
                    </AppText>
                    <AppText variant="caption" color={COLORS.textLight}>
                      🛏️ {room.bed}
                    </AppText>
                    <AppText variant="caption" color={COLORS.textLight}>
                      👁️ {room.view}
                    </AppText>
                  </View>
                  <View style={styles.footerRow}>
                    <AppText variant="body" color={COLORS.primary} style={{ fontWeight: "bold" }}>
                      ${room.price}
                      <AppText variant="caption" color={COLORS.textLight}>
                        /night
                      </AppText>
                    </AppText>
                    <AppButton
                      title="Select"
                      onPress={() => handleSelectRoom(room)}
                      style={styles.selectButton}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <AppText variant="title" color={COLORS.textLight} style={{ marginBottom: SPACING.md }}>
              🔍
            </AppText>
            <AppText variant="subtitle" color={COLORS.textDark}>
              Phòng không tồn tại
            </AppText>
            <AppText variant="body" color={COLORS.textLight} style={{ marginTop: SPACING.xs }}>
              Vui lòng thử từ khóa khác
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: SIZES.padding, paddingTop: Platform.OS === "android" ? SPACING.lg * 2 : SPACING.sm, justifyContent: "flex-start", paddingBottom: SPACING.lg },
  headerContent: { marginTop: SPACING.lg },
  buttonRow: { flexDirection: "row", marginTop: SPACING.md, gap: SPACING.md },
  reloadButton: { flex: 1, paddingVertical: SPACING.md, backgroundColor: COLORS.lightBlue, borderWidth: 1, borderColor: COLORS.transparent },
  historyButton: { flex: 1, paddingVertical: SPACING.md, backgroundColor: COLORS.lightBlue, borderWidth: 1, borderColor: COLORS.transparent },
  scrollContent: { paddingHorizontal: SIZES.padding, paddingBottom: SPACING.xxl * 2.5, paddingTop: SIZES.padding * 2 },
  searchCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusLarge, padding: SIZES.padding, marginTop: -SPACING.lg, marginBottom: SPACING.xl, zIndex: 10 },
  dateRow: { flexDirection: 'row', gap: SPACING.md },
  dateCol: { flex: 1 },
  dateInput: { height: SIZES.base * 5.5, borderWidth: 1, borderRadius: SIZES.radiusSmall, borderColor: COLORS.border },
  row: { flexDirection: "row" },
  col: { flex: 1 },
  dropdown: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.radiusSmall, paddingHorizontal: SPACING.md, height: SIZES.base * 5.5, backgroundColor: COLORS.white },
  dropdownList: { position: "absolute", top: SIZES.base * 5.75, left: 0, right: 0, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.radiusSmall, zIndex: 999, elevation: 10, maxHeight: 180, overflow: "hidden" },
  dropdownItem: { paddingVertical: SPACING.md, paddingHorizontal: SPACING.md },
  roomCard: { width: CARD_WIDTH, backgroundColor: COLORS.white, borderRadius: SIZES.radiusLarge, marginBottom: SPACING.lg, overflow: "hidden" },
  roomImage: { width: "100%", height: 120, resizeMode: "cover" },
  roomContent: { padding: SPACING.md },
  roomMetaContainer: { marginBottom: SPACING.md },
  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: SPACING.xs },
  selectButton: { paddingVertical: SPACING.xs, paddingHorizontal: SPACING.md, borderRadius: SIZES.radiusSmall },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: SPACING.xxl },
});

export default SearchScreen;
