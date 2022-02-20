import { BookingWithInfo } from "../types";

const intersects = (bookingA: BookingWithInfo, bookingB: BookingWithInfo) => {
  const { startTime: startA, endTime: endA } = bookingA.timeInfo;
  const { startTime: startB, endTime: endB } = bookingB.timeInfo;
  return startA < endB && startB < endA;
};

export const markConflicts = (
  oldBookings: BookingWithInfo[],
  newBookings: BookingWithInfo[]
): BookingWithInfo[] => {
  const bookings: BookingWithInfo[] = [];
  for (const newBooking of newBookings) {
    let conflicts = false;
    for (const oldBooking of oldBookings) {
      conflicts = conflicts || intersects(oldBooking, newBooking);
    }
    bookings.push({
      ...newBooking,
      conflicts,
    });
  }
  return bookings;
};
