export interface IBookingService {
  getBookings(userId: string): Promise<any[]>;
  createBooking(data: any): Promise<any>;
}
