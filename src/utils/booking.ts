import {
  Booking,
  BookingWithInfo
} from "../types";

export const processBookingData = (booking: Booking): BookingWithInfo => {
  const { time, duration } = booking;

  const startTime = new Date(time);
  const endTime = new Date(startTime.getTime() + duration * 1000 * 60);

  return {
    ...booking,
    timeInfo: {
      startTime,
      endTime,
    },
  };
};
