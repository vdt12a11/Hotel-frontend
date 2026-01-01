import { useState, useEffect } from 'react';
import { IBookingService } from '../interfaces/IBookingService';

export const useBooking = (bookingService: IBookingService, userId: string) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    bookingService.getBookings(userId)
      .then(setBookings)
      .catch(() => setError('Failed to fetch bookings'))
      .finally(() => setLoading(false));
  }, [userId, bookingService]);

  return { bookings, loading, error };
};
