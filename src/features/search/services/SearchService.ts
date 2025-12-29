import { ISearchService } from '../interfaces/ISearchService';

export class SearchService implements ISearchService {
  async searchRooms(query: string): Promise<any[]> {
    // TODO: call API
    return [];
  }
}
