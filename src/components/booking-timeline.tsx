import React from "react";
import ReactApexChart from "react-apexcharts";

import type { BookingWithInfo } from "../types";

export type BookingTimelineProps = {
  bookings: BookingWithInfo[];
  heading?: string;
};

const mapToSeries = (booking: BookingWithInfo) => ({
  x: booking.userId,
  y: [booking.timeInfo.startTime.getTime(), booking.timeInfo.endTime.getTime()],
  fillColor: booking.conflicts ? "#FF0000" : "",
});

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

  const series = [
    {
      data: bookings.filter((b) => !b.conflicts).map(mapToSeries),
      label: "Available",
    },
    {
      data: bookings.filter((b) => b.conflicts).map(mapToSeries),
      label: "Conflicts",
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
