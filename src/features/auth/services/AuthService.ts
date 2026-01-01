import { IAuthService } from '../interfaces/IAuthService';

export class AuthService implements IAuthService {
  async login(username: string, password: string): Promise<string> {
    // TODO: call API
    return 'token';
  }
  async signup(username: string, password: string, email: string): Promise<string> {
    // TODO: call API
    return 'token';
  }
}
