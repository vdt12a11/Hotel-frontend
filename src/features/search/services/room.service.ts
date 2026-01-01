// src/features/search/services/room.service.ts
import Config from "react-native-config";
export async function getAvailableRooms(checkInDate: string, checkOutDate: string) {
  try {
    const res = await fetch(
      `${Config.API_URL}/room/available?checkIn=${encodeURIComponent(checkInDate)}&checkOut=${encodeURIComponent(checkOutDate)}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Lấy phòng trống thất bại");
    return data; // expected: array of rooms
  } catch (err: any) {
    throw new Error(err.message || "Lỗi kết nối server");
  }
}
