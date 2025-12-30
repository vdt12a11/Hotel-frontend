// roomSearchService.ts
import axios from 'axios';

export interface RoomSearchParams {
  checkinDate: string;
  checkoutDate: string;
  capacity?: number;
  amenities?: string[];
}

export async function fetchAvailableRooms(params: RoomSearchParams) {
  const query = new URLSearchParams();
  query.append('checkinDate', params.checkinDate);
  query.append('checkoutDate', params.checkoutDate);
  if (params.capacity) query.append('capacity', params.capacity.toString());
  if (params.amenities && params.amenities.length > 0) {
    params.amenities.forEach(a => query.append('amenities', a));
  }
  const res = await axios.get(`/rooms/available?${query.toString()}`);
  return res.data;
}
