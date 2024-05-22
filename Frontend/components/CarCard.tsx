
"use client";
import { CarProps, imgProps } from "@/types";
import { useState } from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { CarDetails } from "./CarDetails";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import PictureParser from "./PictureParser";
import { BookingDetails } from "./BookingDetails";

export function CarCard({ car }: { car: CarProps }) {
  const { Brand, Model, Year, Color, FeePerDay, LicensePlate, PictureCover } = car;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {Brand} {Model}
        </h2>
      </div>
      <p className="flex m-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">฿</span>
        {FeePerDay}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={PictureParser(PictureCover)}
          alt="car model"
          fill
          priority
          className="object-contain "
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <CalendarTodayIcon />
            <p className="text-[14px] font-medium">{Year}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <InvertColorsIcon />
            <p className="text-[14px] font-medium">{Color}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <AspectRatioIcon />
            <p className="text-[14px] font-medium">{LicensePlate}</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="transition-transform duration-500 ease-in-out hover:scale-105 w-full py-[16px] rounded-full bg-primary-blue"
            rightIcon="/right-arrow.svg"
            handleClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
        car={car}
      />
        {/* <BookingDetails isOpen={isOpen} closeModal={()=>{isOpen}} car={car} booking={'booking'} token={'token'}/> */}
    </div>
  );
}
