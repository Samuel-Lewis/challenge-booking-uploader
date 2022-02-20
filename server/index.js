const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors()); // so that app can access
app.use(express.json());

let bookings = JSON.parse(fs.readFileSync("./server/bookings.json")).map(
  (bookingRecord) => ({
    time: Date.parse(bookingRecord.time),
    duration: bookingRecord.duration,
    userId: bookingRecord.user_id,
  })
);

app.get("/bookings", (_, res) => {
  console.log("GET /bookings");
  res.json(bookings);
});

app.post("/bookings", (req, res) => {
  // Assuming all posted bookings are valid and don't conflict with existing bookings
  console.log("POST /bookings");
  if (!!req.body) {
    bookings = bookings.concat(req.body);
  }
  res.json(bookings);
});

app.listen(3001);
