// roomSearchService.ts
// Service for searching available rooms with filters

export interface RoomSearchParams {
    checkinDate: string;
    checkoutDate: string;
    capacity?: number;
    amenities?: string[];
}

export interface Room {
    id?: string | number;
    name: string;
    image: string;
    size: string;
    bed: string;
    view: string;
    price: number;
    capacity?: number;
    amenities?: string[];
}

/**
 * Fetch available rooms based on search criteria
 * @param params Search parameters including check-in/out dates, capacity, amenities
 * @returns Promise with array of available rooms
 */
export async function fetchAvailableRooms(params: RoomSearchParams): Promise<Room[]> {
    try {
        const query = new URLSearchParams();
        query.append('checkinDate', params.checkinDate);
        query.append('checkoutDate', params.checkoutDate);

        if (params.capacity) {
            query.append('capacity', params.capacity.toString());
        }

        if (params.amenities && params.amenities.length > 0) {
            params.amenities.forEach(a => query.append('amenities', a));
        }

        // For now, using mock API endpoint
        // In production, this would connect to real backend
        const res = await fetch(`http://10.0.2.2:3000/rooms/available?${query.toString()}`);

        if (!res.ok) {
            throw new Error('Failed to fetch available rooms');
        }

        const data = await res.json();
        return data as Room[];
    } catch (error) {
        console.error('Error fetching available rooms:', error);
        throw error;
    }
}

/**
 * Filter rooms by price range
 * @param rooms Array of rooms to filter
 * @param minPrice Minimum price
 * @param maxPrice Maximum price (optional)
 * @returns Filtered array of rooms
 */
export function filterRoomsByPrice(rooms: Room[], minPrice: number, maxPrice?: number): Room[] {
    return rooms.filter(room => {
        if (maxPrice) {
            return room.price >= minPrice && room.price <= maxPrice;
        }
        return room.price >= minPrice;
    });
}

/**
 * Filter rooms by capacity
 * @param rooms Array of rooms to filter
 * @param capacity Minimum required capacity
 * @returns Filtered array of rooms
 */
export function filterRoomsByCapacity(rooms: Room[], capacity: number): Room[] {
    return rooms.filter(room => (room.capacity ?? 0) >= capacity);
}
