import React, { useEffect, useState } from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import BookingList from "../../../shared/components/dashboard/BookingList";
import { mockBookings } from "../../../data/mockBookings";
import { fetchAvailableRooms } from '../services/roomSearchService';
import { COLORS, SIZES, SPACING, SHADOWS } from "../../../constaints/hotelTheme";
import type { ScreenName } from "../../../types";
import { AppButton, AppInput, AppText } from "../../../shared/components";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40 - 15) / 2;

interface User {
  userID: string;
  name: string;
}

interface Room {
  id?: string | number;
  name: string;
  image: string;
  size: string;
  amenities?: string[]; // Added amenities for future use
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
  const routeOnSelectRoom = route?.params?.onSelectRoom;
  const routeCurrentUser = route?.params?.currentUser;
  const routeOnNavigate = route?.params?.onNavigate;

  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [showCheckInPicker, setShowCheckInPicker] = useState<boolean>(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const mockUser = { userID: '1', name: 'Guest User' };
  const currentUser = user || routeCurrentUser || mockUser;
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [showCapacityDropdown, setShowCapacityDropdown] = useState<boolean>(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState<boolean>(false);

  const fetchRooms = async (): Promise<void> => {
    try {
      const res = await fetch("http://10.0.2.2:3000/room");
      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Lỗi", (data as { message?: string }).message || "Lay phong that bai");
        return;
      }
      setRooms(data as Room[]);
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

  const filteredRooms: Room[] = rooms.length > 0 ? rooms.filter((r) => {
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

  // Handle room selection: chuyển sang BookingScreen
  const handleSelectRoom = (room: Room) => {
    navigation.navigate('Booking', {
      room,
      searchData: { capacity },
    });
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
            Welcome, {currentUser.name}
          </AppText>
          <View style={styles.buttonRow}>
            <AppButton
              title="Check-In"
              onPress={() => navigation.navigate('CheckIn')}
              style={[styles.reloadButton, { flex: 1 }]}
            />
            <AppButton
              title="Check-Out"
              onPress={() => navigation.navigate('CheckOut')}
              style={[styles.historyButton, { flex: 1 }]}
            />
          </View>
          <View style={[styles.buttonRow, { marginTop: SPACING.md }]}>
            <AppButton
              title="Reload Room"
              onPress={fetchRooms}
              style={styles.reloadButton}
            />
            <AppButton
              title="View History"
              onPress={() => navigation.navigate('History')}
              style={styles.historyButton}
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
            title="Tìm phòng"
            onPress={() => { }}
            style={{
              marginTop: SPACING.md,
              alignSelf: 'stretch',
              minWidth: 120,
              paddingVertical: SPACING.md,
              paddingHorizontal: SPACING.lg,
              backgroundColor: COLORS.primary,
              borderRadius: SIZES.radiusSmall,
              marginLeft: 0,
            }}
          />
        </View>

        <BookingList bookings={mockBookings} />

        <AppText variant="subtitle" color={COLORS.textDark} style={{ marginBottom: SPACING.md }}>
          Recommended Rooms
        </AppText>
        {filteredRooms.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredRooms.map((room) => (
              <View key={room.id ?? room.name} style={[styles.roomCard, { ...SHADOWS.light }]}>
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
