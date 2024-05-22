"use client";
import { BookingItem, CarProps } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CustomButton from "./CustomButton";
import PictureParser from "./PictureParser";
import deleteBooking from "@/libs/deleteBooking";
import createRefund from "@/libs/createRefund";
import Swal from 'sweetalert2'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
  booking: BookingItem;
  token: string;
}

export function BookingDetails({

  isOpen,
  closeModal,
  car,
  booking,
  token,
}: CarDetailsProps) {
  var count = 0;
  const router = useRouter()

  const [showConfirmation, setShowConfirmation] = useState(false);
  const { _id, bookingDateFrom, bookingDateTo} = booking

  const handleDeleteConfirmation = async () => {
    try {
      await createRefund(_id);
      await deleteBooking(_id, token);
      closeModal();
      setShowConfirmation(false);
      Swal.fire({
        title: "Good job!",
        text: "Delete the booking successfully",
        icon: "success",
      });
      router.push("/booking")
      
    } catch (error) {
      console.error("Error deleting booking:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Delete booking failed"
      });
    }
  };

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
                  <div className="mt-6 flex-1 flex-col flex gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {" "}
                      {car.Brand} {car.Model}{" "}
                    </h2>
                    <div className="flex mt-6 text-[24px] font-bold justify-around">
                      <div className="flex flex-col">
                        <div className="text-base text-zinc-500">From</div>
                        {new Date(bookingDateFrom).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-base text-zinc-500">To</div>
                        {new Date(bookingDateTo).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4">
                      <div className="mt-3 flex flex-wrap gap-4">
                        {Object.entries(car).map(([key, value]) => {
                          if (count < 5) {
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
                    </div>
                    <div className="car-card__btn-container">
                      <CustomButton
                        title="Booking"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] 
                    leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                      />
                    </div>

                    <div className="mt-6 flex flex-col w-full gap-3">
                      <Link href={`/booking/extend/${_id}`} className="transition-transform duration-500 ease-in-out hover:scale-105 flex items-center justify-center bg-transparent hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded">
                        <button className="">
                          Edit Booking
                        </button>
                      </Link>

                      <button
                        className="transition-transform duration-500 ease-in-out hover:scale-105 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                        onClick={() => setShowConfirmation(true)}
                      >
                        Cancle Booking
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>

              <Transition show={showConfirmation} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-10 overflow-y-auto"
                  onClose={() => setShowConfirmation(false)}
                >
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg p-6 shadow-xl">
                      <Dialog.Title className="text-lg font-bold">
                        Confirm cancel
                      </Dialog.Title>
                      <Dialog.Description className="mt-2">
                      Are you sure you want to cancel this booking? <br />
                      you will receive a refund from this booking
                      </Dialog.Description>
                      <div className="mt-4 flex justify-end">
                        <button
                          className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
                          onClick={() => setShowConfirmation(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-emerald-500 text-white rounded"
                          onClick={handleDeleteConfirmation}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
