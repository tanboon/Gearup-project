"use client";

import getCar from "@/libs/getCar";
import * as React from "react";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import LocationDateReserve from "@/components/LocationDateReserve";
import PictureParser from "@/components/PictureParser";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import Swal from "sweetalert2";
import Link from "next/link";
import config from "@/config";
import axios from "axios";

function CardDetailPage({ params }: { params: { cid: string } }) {
  const [carDetail, setCarDetail] = useState<any>(null);
  const [selectedDateFrom, setSelectedDateFrom] = useState<Dayjs | null>(null);
  const [selectedDateTo, setSelectedDateTo] = useState<Dayjs | null>(null);
  const [token, setToken] = useState<string>("");

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      user: session?.user._id,
      car: carDetail,
      bookingDateFrom: selectedDateFrom
        ? selectedDateFrom.format("YYYY/MM/DD")
        : "",
      bookingDateTo: selectedDateTo ? selectedDateTo.format("YYYY/MM/DD") : "",
    };

    const today = dayjs()
    if (!selectedDateFrom || !selectedDateTo) {
      Swal.fire({
        title: "Date Selection Error",
        text: "Please select both start and end dates.",
        icon: "error",
      });
      return;
    } else if (selectedDateFrom.isSame(selectedDateTo, 'day') || selectedDateTo.isBefore(selectedDateFrom, 'day')) {
      Swal.fire({
        title: "Invalid Date Range",
        text: "The start date cannot be after or same as the end date.",
        icon: "error",
      });
      return;
    } else if (selectedDateFrom.isBefore(today, 'day') || selectedDateTo.isBefore(today, 'day')) {
      Swal.fire({
        title: "Invalid Booking Date",
        text: "The booking date cannot be in the past.",
        icon: "error",
      });
      return;
    }
    console.log(bookingData);

    const checkout = () => {
      axios
        .post(`${process.env.BACKEND_URL}/api/v1/stripe/create-checkout-session`, {
          bookingData,
          userId: bookingData.user,
          Token: session?.user.token,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    checkout();

    // try {
    //   const response = await fetch(
    //     `${process.env.BACKEND_URL}/api/v1/cars/${params.cid}/bookings`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization: `Bearer ${session?.user.token}`,
    //       },
    //       body: JSON.stringify({
    //         user: session?.user._id,
    //         car: carDetail,
    //         bookingDateFrom: selectedDateFrom
    //           ? selectedDateFrom.format("YYYY/MM/DD")
    //           : "",
    //         bookingDateTo: selectedDateTo
    //           ? selectedDateTo.format("YYYY/MM/DD")
    //           : "",
    //       }),
    //     }
    //   );
    //   if (!response.ok) {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Booking failed"
    //       });
    //     throw new Error("Failed to create booking");
    //   }
    //   Swal.fire({
    //     title: "Good job!",
    //     text: "Booking successful",
    //     icon: "success"
    //   });

    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      const carData = await getCar(params.cid);
      setCarDetail(carData);
    };

    fetchData();
  }, [params.cid]);

  var isLoading = false;

  if (!carDetail) {
    isLoading = true; // or loading indicator
  }

  return (
    <>
      {!isLoading ? (
        <main className="flex flex-col justify-center items-center h-screen">
          <h1 className="hero__title animate-fade-up mb-10">Your Booking</h1>
          <div className=" p-8 rounded-2xl shadow-lg bg-primary-blue-100 flex justify-center animate-fade-down">
            <div className="flex flex-col text-[20px]">
              <p className="font-bold">
                {carDetail.data.Brand} {carDetail.data.Model}
              </p>
              <div className="mt-3">
                <Image
                  src={PictureParser(carDetail.data.PictureCover)}
                  alt="car"
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-row my-5">
              <div className="text-md mx-5 text-left"></div>
              <div className="flex flex-col">
                <div className="pb-5 ">
                  <LocationDateReserve
                    onDateChange={(value: Dayjs) => {
                      setSelectedDateFrom(value);
                    }}
                  />
                  <LocationDateReserve
                    onDateChange={(value: Dayjs) => {
                      setSelectedDateTo(value);
                    }}
                  />
                </div>
                <CustomButton
                  title="Check Out"
                  textStyles=""
                  containerStyles="transition-transform duration-500 ease-in-out hover:scale-105 w-full py-[16px] rounded-full bg-primary-blue text-white "
                  handleClick={handleSubmit}
                  rightIcon="/right-arrow.svg"
                />
              </div>
            </div>
          </div>
        </main>
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

export default CardDetailPage;
