import { useState, useEffect } from 'react';
import { IHistoryService } from '../interfaces/IHistoryService';

export const useHistory = (service: IHistoryService, userId: string) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    service.getHistory(userId)
      .then(setHistory)
      .catch(() => setError('Failed to fetch history'))
      .finally(() => setLoading(false));
  }, [userId, service]);

  return { history, loading, error };
};
