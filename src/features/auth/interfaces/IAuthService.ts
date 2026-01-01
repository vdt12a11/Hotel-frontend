export interface IAuthService {
  login(username: string, password: string): Promise<string>;
  signup(username: string, password: string, email: string): Promise<string>;
}
