import { useState } from 'react';
import { IAuthService } from '../interfaces/IAuthService';

export const useLogin = (authService: IAuthService) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await authService.login(username, password);
      // TODO: handle token
    } catch (e) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
