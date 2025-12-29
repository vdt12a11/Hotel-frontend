export interface ICheckInOutService {
  checkIn(bookingId: string): Promise<boolean>;
  checkOut(bookingId: string): Promise<boolean>;
}
