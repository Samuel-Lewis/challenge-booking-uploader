import React from "react";

import type { BookingWithInfo } from "../types";

export type BookingListProps = {
  bookings: BookingWithInfo[];
  heading?: string;
};

export const BookingList: React.FC<BookingListProps> = ({
  bookings,
  heading,
}) => {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>{heading ?? "Bookings"}</h2>
      <table className="booking-list">
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>UserId</th>
            <th>Conflicts?</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, i) => {
            return (
              <tr key={i}>
                <td>{booking.timeInfo.startTime.toLocaleString()}</td>
                <td>{booking.timeInfo.endTime.toLocaleString()}</td>
                <td>{booking.duration}</td>
                <td>{booking.userId}</td>
                <td>{booking.conflicts ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
