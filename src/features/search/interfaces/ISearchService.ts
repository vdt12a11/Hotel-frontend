export interface ISearchService {
  searchRooms(query: string): Promise<any[]>;
}
