import { useState, useEffect } from 'react';
import { IProfileService } from '../interfaces/IProfileService';

export const useUserProfile = (service: IProfileService, userId: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    service.getProfile(userId)
      .then(setProfile)
      .catch(() => setError('Failed to fetch profile'))
      .finally(() => setLoading(false));
  }, [userId, service]);

  return { profile, loading, error };
};
