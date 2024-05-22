"use client";

import { CarDetails } from "@/components/CarDetails";
import PictureParser from "@/components/PictureParser";
import getCar from "@/libs/getCar";
import { CarProps } from "@/types";
import Image from "next/image";

import { FormEvent, useEffect, useState } from "react";
import Slider from "react-slick";
import Swal from 'sweetalert2'

import config from "@/config";
import { useSession } from "next-auth/react";
import updateCar from "@/libs/updateCar";
import { useRouter } from "next/navigation";

export default function EditCarPage({ params }: { params: { cid: string } }) {
    const { data: session } = useSession();
    const router = useRouter();
    var token = "";
    if(session){
        token = session?.user.token
    }
  const [carDetail, setCarDetail] = useState<CarProps>({
    _id: "",
    Brand: "",
    Model: "",
    Year: "",
    Color: "",
    FeePerDay: 0,
    LicensePlate: "",
    PictureCover: "",
    Picture1: "",
    Picture2: "",
    Picture3: "",
    Picture4: "",
    provider: "",
  });
  const [tempCarDetail, setTempCarDetail] = useState<CarProps>({
    _id: "",
    Brand: "",
    Model: "",
    Year: "",
    Color: "",
    FeePerDay: 0,
    LicensePlate: "",
    PictureCover: "",
    Picture1: "",
    Picture2: "",
    Picture3: "",
    Picture4: "",
    provider: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [animateClass, setAnimateClass] = useState("");

  

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    let error = false;
    if (
      tempCarDetail.Brand.trim() === "" ||
      tempCarDetail.Model.trim() === "" ||
      tempCarDetail.Year.trim() === "" ||
      tempCarDetail.Color.trim() === "" ||
      isNaN(tempCarDetail.FeePerDay)
    ) {
      Swal.fire({
        title: "Some fields are missing",
        text: "Please fill out all fields",
        icon: "error",
      });
      error = true;
    } 
    if (typeof tempCarDetail.FeePerDay !== 'number') {
      Swal.fire({
        title: "FeePerDay must be a number",
        text: "Please fill out with a number",
        icon: "error",
      });
      error = true;
    } 
    if (tempCarDetail.PictureCover.trim() === "") {
      Swal.fire({
        title: "Cover Picture is missing",
        text: "Please upload Car Cover Picture",
        icon: "error",
      }); 
      error = true;
    }
    if (!error) {
      Swal.fire({
        title: "Good job!",
        text: "Edit the car successfully",
        icon: "success",
      }).then( () => {
        if (!formSubmitted) {
          setFormSubmitted(true);
          updateCar(token, tempCarDetail._id, tempCarDetail.Brand, tempCarDetail.Model, tempCarDetail.Year, 
            tempCarDetail.Color, tempCarDetail.FeePerDay.toString(), tempCarDetail.LicensePlate, 
            tempCarDetail.PictureCover, tempCarDetail.Picture1, tempCarDetail.Picture2, tempCarDetail.Picture3, tempCarDetail.Picture4,);
        }
        router.push("/info")
      });
    }
  };

  const handleClick = () => {
    if (!formSubmitted) {
      setAnimateClass("animate-jump animate-once");
      setTimeout(() => setAnimateClass(""), 500);
    }
  };
  const [changed, setChanged] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const carData = await getCar(params.cid);
      console.log(carData.data);
      setCarDetail(carData.data);
      setTempCarDetail(carData.data);
    };

    fetchData();
  }, [params.cid]);
  

  return (
    <>
    
    <div className="flex justify-center flex-col mt-48 h-[100%] animate-fade-up bg-primary-blue-100 p-8 hover:shadow-md rounded-3xl text-medium">
   
      {carDetail && (
        
        <form className="w-full max-w-sm" id="car" onSubmit={handleSubmit}>
            <Image className="mb-8" src={PictureParser(tempCarDetail.PictureCover)} height={3000} width={2000} alt="car" />
          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
                
              <label htmlFor="brand">Brand</label>
              
            </div>
            <div className="md:w-3/4">
              <input
                id="brand"
                type="text"
                name="brand"
                value={tempCarDetail.Brand}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Brand: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>

          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Model</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="model"
                type="text"
                value={tempCarDetail.Model}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Model: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>

          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Year</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="year"
                type="text"
                value={tempCarDetail.Year}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Year: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>

          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Color</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="color"
                type="text"
                value={tempCarDetail.Color}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Color: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>

          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">FeePerDay</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="feeperday"
                type="number"
                value={tempCarDetail.FeePerDay}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    FeePerDay: parseFloat(e.target.value), // Convert string to number if needed
                });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>

          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Cover</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="cover"
                type="text"
                value={tempCarDetail.PictureCover}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    PictureCover: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>

          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Picture1</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="pic1"
                type="text"
                value={tempCarDetail.Picture1}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Picture1: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>
          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Picture2</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="pic2"
                type="text"
                value={tempCarDetail.Picture2}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Picture2: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>
          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Picture3</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="pic3"
                type="text"
                value={tempCarDetail.Picture3}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Picture3: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>
          <div className="md:flex gap-x-6 md:items-center mb-6">
            <div className="md:w-1/4">
              <label htmlFor="model">Picture4</label>
            </div>
            <div className="md:w-3/4">
              <input
                id="pic4"
                type="text"
                value={tempCarDetail.Picture4}
                onChange={(e) => {
                  setChanged(true);
                  setTempCarDetail({
                    ...tempCarDetail,
                    Picture4: e.target.value,
                  });
                }}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
          </div>
          {/* Add more input fields for other car details */}

          {changed && (
            <div className="mb-2 flex justify-center">
              <button
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={() => {
                  setTempCarDetail({ ...carDetail });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                id="submit"
                form="car"
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleClick}
              >
                Save
              </button>
            </div>
          )}
        </form>
      )}
    </div>
    </>
  );
}
