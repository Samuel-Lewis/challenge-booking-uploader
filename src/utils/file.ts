import {
  BookingWithInfo,
  isBooking
} from "../types";
import { processBookingData } from "./booking";

export const parseCSV = (csv: string): Array<{ [key: string]: any }> => {
  const rows = csv.split("\n").filter(String);
  const headers = rows[0].split(", ");
  const result = rows.slice(1).map((row) => {
    const values = row.split(", ");
    const obj: { [key: string]: any } = {};
    // iterate over values by the header order
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
  return result;
};

export const parseBookingCSV = (csv: string | null): BookingWithInfo[] => {
  if (csv === null) {
    return [];
  }

  const data = parseCSV(csv);
  return data.map((row) => {
    const { time, duration, userId } = row;
    // specific convert certain types
    const maybeBooking = {
      time: String(time),
      duration: Number(duration),
      userId: String(userId),
    };

    // assert that all values in the CSV are actually bookings
    if (!isBooking(maybeBooking)) {
      console.error("Invalid booking:", { row, maybeBooking });
    }

    return processBookingData(maybeBooking);
  });
};
