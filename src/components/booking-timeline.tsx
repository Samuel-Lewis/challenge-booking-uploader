import React from "react";
import ReactApexChart from "react-apexcharts";

import type { BookingWithInfo } from "../types";

export type BookingTimelineProps = {
  bookings: BookingWithInfo[];
  heading?: string;
};

export const BookingTimeline: React.FC<BookingTimelineProps> = ({
  bookings,
  heading,
}) => {
  if (bookings.length === 0) {
    return null;
  }

  const options = {
    chart: {
      height: 350,
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      type: "datetime",
    },
    grid: {
      row: {
        colors: ["#f3f4f5", "#fff"],
        opacity: 1,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#fff"],
    },
  };

  const conflictingSeries = bookings
    .filter((b) => b.conflicts)
    .map((booking) => {
      return {
        x: booking.userId,
        y: [
          booking.timeInfo.startTime.getTime(),
          booking.timeInfo.endTime.getTime(),
        ],
        fillColor: booking.conflicts ? "#FF0000" : "",
      };
    });

  const bookingSeries = bookings
    .filter((b) => !b.conflicts)
    .map((booking) => {
      return {
        x: booking.userId,
        y: [
          booking.timeInfo.startTime.getTime(),
          booking.timeInfo.endTime.getTime(),
        ],
        val: booking.conflicts ? 1 : 0,
      };
    });

  const series = [
    {
      data: bookingSeries,
    },
    {
      data: conflictingSeries,
    },
  ];

  return (
    <div>
      <h2>{heading ?? "Booking Timeline"}</h2>
      <div>
        <ReactApexChart
          // @ts-ignore
          options={options}
          series={series}
          type="rangeBar"
          height={320}
        />
      </div>
    </div>
  );
};
