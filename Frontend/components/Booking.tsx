"use client";
import { BookingItem, CarItems } from "@/types";
import { useEffect, useState } from "react";
import { BookingCard } from "@/components/BookingCard";
import getBookings from "@/libs/getBookings";

export default function BookingLists(props: { token: string }) {
  const [bookings, setBookings] = useState<BookingItem[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allBookings = await getBookings(props.token);
      setBookings(allBookings.data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  const isDataEmpty = !bookings || bookings.length < 1;

  return (
    <>
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {bookings?.map((booking: any) => (
              <BookingCard booking={booking} token={props.token} />
            ))}
          </div>
        </section>
      ) : (
        <div className="mt-16 flex justify-center items-center flex-row">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-primary-blue"
            role="loading"
          >
            <span className="hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
