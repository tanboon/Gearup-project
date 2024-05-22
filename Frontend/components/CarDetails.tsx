
"use client";

import { CarProps } from "@/types";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { skip } from "node:test";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { BookingDetails } from "./BookingDetails";
import PictureParser from "./PictureParser";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2"

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car: CarProps;
  }
  export function CarDetails({ isOpen, closeModal, car }: CarDetailsProps) {
    const { Picture1, Picture2, Picture3, Picture4, _id } = car;
    const router = useRouter()
    const session = useSession();
    var isSession = true
    if(session.data == null){
      isSession = false
    }
      

    function NextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#444",
              transform: "translate(-2rem, -1rem)",
              zIndex: "10",
            }}
            onClick={onClick}
          />
        );
      }
    
      function PrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#444",
              transform: "translate(2rem, -1rem)",
              zIndex: "10",
            }}
            onClick={onClick}
          />
        );
      }
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
      };


    const handleClickBtn = (massageID: string) => {
        router.push(`/booking/${massageID}`)
    }
    
    const handleClickBtnNoSession = () => {
      Swal.fire({
        icon: "error",
        title: "Hold on!",
        text: "You must be signed in to book a car.",
      });
  }
  
  var count = 0;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Dialog.Panel
                  className="relative w-full max-w-lg max-h-[90vh] 
                    overflow-y-auto transfrom rounded-2xl bg-white p-6 text-left shadow-xl
                    trasition-all flex flex-col gap-5"
                    >
                      <button
                        type="button"
                        onClick={closeModal}
                        className="transition-transform duration-500 ease-in-out hover:scale-110 absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                      >
                        <Image
                          src="/close.svg"
                          alt="close"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      </button>
                      <div className="flex-1 flex flex-col gap-3">
                    

                      <Slider {...settings}>
                      <div className="booking-details__container">
                        <div className="relative w-full h-full">
                          <Image
                            src={PictureParser(car.Picture1)}
                            alt="Car Image 1"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="booking-details__container">
                        <div className="relative w-full h-full">
                          <Image
                            src={PictureParser(car.Picture2)}
                            alt="Car Image 2"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="booking-details__container">
                        <div className="relative w-full h-full">
                          <Image
                            src={PictureParser(car.Picture3)}
                            alt="Car Image 3"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="booking-details__container">
                        <div className="relative w-full h-full">
                          <Image
                            src={PictureParser(car.Picture4)}
                            alt="Car Image 4"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </Slider>



                    

                  </div>
                  <div className="flex-1 flex-col flex gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {" "}
                      {car.Brand} {car.Model}{" "}
                    </h2>
                    {/* <div className="mt-3 flex flex-wrap gap-4">
                                {Object.entries(car).map(([key, value]) =>(
                                    <div className="flex justify-between w-full gap-5 text-right" key={key}>
                                        <h4>{key}</h4>
                                        <p>{value}</p>
                                    </div>
                                ))}
                            </div> */}
                            <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => {
                        if (count < 10) {
                          count++;
                          return (
                            [
                              "Brand",
                              "Model",
                              "Year",
                              "Color",
                              "FeePerDay",
                            ].includes(key) && (
                              <div
                                className="flex justify-between w-full gap-5 text-right"
                                key={key}
                              >
                                <div className="flex justify-between w-full gap-5 text-right">
                                  <h4 className="text-gray capitalize">
                                    {key.split("_").join(" ")}
                                  </h4>
                                  <p className="text-black-100 font-semibold">
                                    {value}
                                  </p>
                                </div>
                              </div>
                            )
                          );
                        } else {
                          return null; // Return null or any other fallback JSX when the limit is reached
                        }
                      })}
                    </div>

                    { isSession ? (<CustomButton
                      title="Booking"
                      containerStyles="transition-transform duration-500 ease-in-out hover:scale-105 w-full py-[16px] rounded-full bg-primary-blue mt-5"
                       handleClick={()=>{handleClickBtn(_id)}}
                    />):
                    (<CustomButton
                      title="Booking"
                      containerStyles="transition-transform duration-500 ease-in-out hover:scale-105 w-full py-[16px] rounded-full bg-primary-blue mt-5"
                       handleClick={()=>{handleClickBtnNoSession()}}
                    />)}
                    
                    
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
