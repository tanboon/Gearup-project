"use client";
import { use, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";

export default function LocationDateReserve({
  onDateChange,
}: {
  onDateChange: Function;
}) {
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState("BKK");
  return (
    <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label=""
            value={bookingDate}
            onChange={(value) => {
              setBookingDate(value);
              onDateChange(value);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
