import "./App.css";
import React, {
  useCallback,
  useEffect,
  useState
} from "react";
import Dropzone from "react-dropzone";
import {
  BookingList,
  BookingTimeline
} from "./components";
import { processBookingData } from "./utils/booking";
import { markConflicts } from "./utils/conflict";
import { parseBookingCSV } from "./utils/file";

import type { Booking, BookingWithInfo } from "./types";
const apiUrl = "http://localhost:3001";

export const App = () => {
  const [bookings, setBookings] = useState<BookingWithInfo[]>([]);
  const [newBookingData, setNewBookingData] = useState<BookingWithInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/bookings`)
      .then((response) => response.json())
      .then((d) => d.map(processBookingData))
      .then(setBookings)
      .catch((err) => setError(err.message));
  }, []);

  const onDrop = useCallback(
    (files: File[]) => {
      const reader = new FileReader();
      reader.onabort = () => {
        console.warn("file reading was aborted");
      };
      reader.onerror = () => {
        console.error("file reading has failed");
        setError("File reading has failed");
      };
      reader.onload = () => {
        const bookingData = parseBookingCSV(reader.result as string | null);
        const markedBookings = markConflicts(bookings, bookingData);
        setNewBookingData([...newBookingData, ...markedBookings]);
      };

      files.forEach((file) => reader.readAsText(file));
    },
    [newBookingData, bookings]
  );

  const handlePost = useCallback(() => {
    const postData: Booking[] = newBookingData
      .filter((booking) => !booking.conflicts)
      .map((booking) => {
        const { timeInfo, conflicts, ...rest } = booking;
        return rest;
      });

    fetch(`${apiUrl}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((d) => d.map(processBookingData))
      .then(setBookings)
      .then(() => setNewBookingData([]))
      .catch((err) => setError(err.message));
  }, [newBookingData]);

  return (
    <div className="App">
      <div className="App-header">
        <Dropzone accept=".csv" onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <div className="App-main">
        <button disabled={newBookingData.length === 0} onClick={handlePost}>
          POST new bookings
        </button>
        {error && <pre>{error}</pre>}
        <BookingTimeline
          bookings={[...bookings, ...newBookingData]}
          heading="Booking Timeline"
        />
        <BookingList bookings={bookings} heading="Existing bookings" />
        <BookingList bookings={newBookingData} heading="New bookings" />
      </div>
    </div>
  );
};
