import { ICheckInOutService } from '../interfaces/ICheckInOutService';

export class CheckInOutService implements ICheckInOutService {
  async checkIn(bookingId: string): Promise<boolean> {
    // TODO: call API
    return true;
  }
  async checkOut(bookingId: string): Promise<boolean> {
    // TODO: call API
    return true;
  }
}
