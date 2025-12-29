import { useState } from 'react';
import { ICheckInOutService } from '../interfaces/ICheckInOutService';

export const useCheckIn = (service: ICheckInOutService) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkIn = async (bookingId: string) => {
    setLoading(true);
    setError(null);
    try {
      await service.checkIn(bookingId);
    } catch {
      setError('Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  return { checkIn, loading, error };
};
