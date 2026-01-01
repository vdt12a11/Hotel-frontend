export interface IProfileService {
  getProfile(userId: string): Promise<any>;
}
