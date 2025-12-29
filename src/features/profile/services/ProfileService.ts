import { IProfileService } from '../interfaces/IProfileService';

export class ProfileService implements IProfileService {
  async getProfile(userId: string): Promise<any> {
    // TODO: call API
    return {};
  }
}
