export interface Booking {
  id: string;
  hotelName: string;
  date: string;
  image: string;
  status: 'upcoming' | 'past';
}

export const mockBookings: Booking[] = [
  {
    id: '1',
    hotelName: 'Sandy Hotel',
    date: 'Dec 15-17, 2025',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    status: 'past'
  },
  {
    id: '2',
    hotelName: 'Ocean View Resort',
    date: 'Dec 28-30, 2025',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500',
    status: 'past'
  },
  {
    id: '3',
    hotelName: 'Mountain Paradise',
    date: 'Jan 5-8, 2026',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
    status: 'upcoming'
  }
];
