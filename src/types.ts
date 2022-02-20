export type TimeStamp = string;
export type Seconds = number;
export type Booking = {
  time: TimeStamp;
  duration: Seconds;
  userId: string;
};

export type BookingWithInfo = Booking & {
  conflicts?: boolean;
  timeInfo: {
    startTime: Date;
    endTime: Date;
  };
};

export const isBooking = (booking: any): booking is Booking => {
  if (!booking) {
    return false;
  }

  const { time, duration, userId } = booking;
  return (
    typeof time === "string" &&
    typeof duration === "number" &&
    typeof userId === "string"
  );
};
