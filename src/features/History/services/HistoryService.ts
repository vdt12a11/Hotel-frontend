import { IHistoryService } from '../interfaces/IHistoryService';

export class HistoryService implements IHistoryService {
  async getHistory(userId: string): Promise<any[]> {
    // TODO: call API
    return [];
  }
}
