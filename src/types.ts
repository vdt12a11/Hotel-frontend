export interface User {
    userID: string;
    name: string;
    email?: string;
}

export interface Room {
    _id?: string; // MongoDB ObjectId
    id?: string | number;
    name: string;
    image?: string;
    size?: string;
    bed: string;
    view: string;
    price: number;
    capacity: number;
}

export interface BookingFormData {
    name: string;
    phone: string;
    email: string;
    checkIn: string;
    checkOut: string;
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

export type ScreenName = "login" | "signup" | "search" | "booking" | "history" | "success" | "MyBookings";
