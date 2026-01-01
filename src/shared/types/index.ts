export interface User {
    userID: string;
    name: string;
    email: string;
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
