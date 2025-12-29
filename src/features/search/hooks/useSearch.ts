import { useState } from 'react';
import { ISearchService } from '../interfaces/ISearchService';

export const useSearch = (service: ISearchService) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.searchRooms(query);
      setResults(res);
    } catch {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading, error };
};
