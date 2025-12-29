import { IBookingService } from '../interfaces/IBookingService';

export class BookingService implements IBookingService {
  async getBookings(userId: string): Promise<any[]> {
    // TODO: call API
    return [];
  }
  async createBooking(data: any): Promise<any> {
    // TODO: call API
    return {};
  }
}
