export interface IHistoryService {
  getHistory(userId: string): Promise<any[]>;
}
