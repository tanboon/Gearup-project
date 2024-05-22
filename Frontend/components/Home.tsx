"use client";

import { CarCard } from "@/components/CarCard";
import { BookingCard } from "@/components/BookingCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import { getCars } from "@/libs/getCars";
import { CarItems, imgProps } from "@/types";
import { useEffect, useState } from "react";

export default function CarLists() {
  const [cars, setCars] = useState<CarItems[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allCars = await getCars();
      setCars(allCars.data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  const isDataEmpty = !cars || cars.length < 1;

  return (
    <>
      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {cars?.map((car: any) => (
              <CarCard car={car} />
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
