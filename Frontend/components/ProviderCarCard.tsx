'use client'
import Image from "next/image"
import { CarProps } from "@/types"
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import PictureParser from "./PictureParser"
import deleteCar from "@/libs/deleteCar"
import { useSession } from "next-auth/react";
import { useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import getBookingByCar from "@/libs/getBookingByCar"

export default function ProviderCarCard({ car }: { car: CarProps }) {
    const { Brand, Model, Year, Color, FeePerDay, LicensePlate, PictureCover, _id } = car;
    const [isClick, setIsClick] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    
    
    const handleDelete = async () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                var token = session?.user?.token;
                try {
                    if(token)
                        var booking = await getBookingByCar(token,car._id);
                    if(booking.data.length === 0){
                        setIsLoading(true);
                        if (!token) {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Failed to delete: User not authenticated",
                            });
                            return;
                        }
                        await deleteCar(_id, token);
                            // deleteCar(car._id, session.data.user.token)
                        setIsClick(prevData => !prevData)
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "This car still has a booking",
                            text: "Failed to delete: car still has a booking",
                        });
                    }
                        
                }
                catch (err) {
                    console.log(err)
                } finally {
                    setIsLoading(false);
                }
            }
        });
    }

    const handleEdit = () => {
        router.push(`/car/${_id}`)
    }

    return (
        isClick?null:
        <div id="carbox" className=" animate-fade-up w-full mt-5 flex flex-col p-6 justify-center items-start text-black-100 bg-white hover:shadow-lg rounded-3xl group">
            <div className="w-full flex flex-row justify-between">
                <div className="w-full flex justify-between items-start gap-2">
                    <h2 className="text-[22px] leading-[26px] font-bold capitalize" id="car">
                    {Brand} {Model}
                    </h2>
                </div>
                <div className="flex flex-row gap-5">
                    <div className="top-2 left-2" onClick={handleEdit}>
                        <PencilSquareIcon id="edit" className="transition-transform duration-500 ease-in-out hover:scale-110 w-6 h-6 hover:text-primary-blue hover:cursor-pointer"/>
                    </div>
                    <div className="top-2 left-2" onClick={handleDelete}>
                        <TrashIcon id="remove" className="transition-transform duration-500 ease-in-out hover:scale-110 w-6 h-6 hover:text-red-500 hover:cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-60 my-3 object-contain">
                <Image
                src={PictureParser(car.PictureCover)}
                alt={car.Model}
                fill
                priority
                className="object-contain"
                />
            </div>
            <div className="w-full">
                <table className="text-lg w-full border-separate border-spacing-2 mt-5">
                    <tbody>
                    <tr>
                        <td>Brand</td>
                        <td className="text-right">{Brand}</td>
                    </tr>
                    <tr>
                        <td>Model</td>
                        <td className="text-right">{Model}</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td className="text-right">{Year}</td>
                    </tr>
                    <tr>
                        <td>Color</td>
                        <td className="text-right">{Color}</td>
                    </tr>
                    <tr>
                        <td>FeePerDay</td>
                        <td className="text-right">{FeePerDay}</td>
                    </tr>
                    <tr>
                        <td>LicensePlate</td>
                        <td className="text-right">{LicensePlate}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};
