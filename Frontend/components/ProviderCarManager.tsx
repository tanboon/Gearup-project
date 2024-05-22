'use client'
import { CarProps } from "@/types";
import ProviderCarCard from "./ProviderCarCard";
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { CarItems } from "@/types";
import getCarProvider from "@/libs/getCarProvider";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CarManager() {
    const session = useSession();
    const handleAdd = () => {
        alert("Add the car")
    }

    const [cars, setCars] = useState<CarItems[] | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    
    const fetchData = async () => {
        try {
            if(session && session.data){
                const allCars = await getCarProvider(session.data.user._id);
                setCars(allCars.data);
            }
            else
                setCars([])
        } catch (error) {
            console.error("Failed to fetch cars:", error);
        }
    };
    // Mock car data
    // const benz: CarProps = {
    //     _id: "1",
    //     Brand: "Mercedes-Benz",
    //     Model: "S-Class",
    //     Year: "2022",
    //     Color: "Black",
    //     FeePerDay: "10000",
    //     LicensePlate: "จก 69",
    //     PictureCover: "benz-cover.jpg",
    //     Picture1: "benz-image1.jpg",
    //     Picture2: "benz-image2.jpg",
    //     Picture3: "benz-image3.jpg",
    //     Picture4: "benz-image4.jpg",
    // };
    // const BMW: CarProps = {
    //     _id: "2",
    //     Brand: "BMW",
    //     Model: "5 Series",
    //     Year: "2023",
    //     Color: "Silver",
    //     FeePerDay: "5000",
    //     LicensePlate: "สวย 555",
    //     PictureCover: "bmw-cover.jpg",
    //     Picture1: "bmw-image1.jpg",
    //     Picture2: "bmw-image2.jpg",
    //     Picture3: "bmw-image3.jpg",
    //     Picture4: "bmw-image4.jpg",
    // };

    return (
        <div className="m-5">
            <div className="text-2xl font-bold">Your Car</div>
            {cars?.map((car: any) => (
              <ProviderCarCard car={car}/>
            ))}
            <Link className="transition-transform duration-500 ease-in-out hover:scale-105 w-full mt-5 flex p-6 justify-center border-dashed border-2 border-emerald-500 hover:border-emerald-600 rounded-3xl group"
            href={"/addcar"}>
                <PlusCircleIcon className="w-6 h-6 text-emerald-500 group-hover:text-emerald-600"/> 
            </Link>
        </div>
    )
};
