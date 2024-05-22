'use client'

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import config from "@/config";

interface ResultMessage {
    type: string;
    message: any;
}

export default function AddCar({ handleResult }: { handleResult: (result: any) => void }) {

    const { data: session } = useSession();

    const [selectedFile, setSelectedFile] = useState(null);
    const [resultMessage, setResultMessage] = useState<ResultMessage | null>(null); // Define the state type

    const handleFileChange = (e : any) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (selectedFile !== null) {
                formData.append("image", selectedFile);
            }
            

            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/upload`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                },
                body: formData

            
            });

            const result = await response.json();
            setResultMessage({ type: "success", message: result });
            setTimeout(() => setResultMessage(Object), 5000);

            //send result out of the component
            handleResult(result);
            setSelectedFile(null); // Reset selectedFile after successful upload


        } catch (error) {
            console.error("Error uploading image:", error);
            setResultMessage({ type: "error", message: error });
        }
    };

    return (
        <div className="  bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 flex flex-col justify-center">
            {
                resultMessage && (
                    <div className="flex flex-row justify-center">
                        <div className="text-emerald-600 text-semibold text-xl p-2 rounded-lg w-fit">
                            {
                                resultMessage.message.success === true
                                    ? <div className="text-emerald-600 text-semibold text-xl rounded-lg w-fit">
                                        Success
                                    </div>
                                    : <div className="text-red-600 text-semibold text-xlrounded-lg w-fit text-[16px]">
                                        Please upload JPG or PNG
                                    </div>
                            }
                        </div>
                    </div>

                )
            }
            {/* {
                <form action={handleUpload} className="flex flex-col items-center bg-white w-fit py-5 px-10 rounded-2xl">
                    <h1>Add Car</h1>
                    <div className="mt-3">
                        <div className="flex flex-row items-center my-2">
                            <label className="w-auto block text-gray-700 pr-4 font-serif" htmlFor="brand">Brand</label>
                            <input type="text" required id="brand" name="brand" placeholder="Brand" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="model">Model</label>
                            <input type="text" required id="model" name="model" placeholder="Model" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="year">Year</label>
                            <input type="text" required id="year" name="year" placeholder="Year" className="bg-white border-2 bordergrayy-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="color">Color</label>
                            <input type="text" required id="color" name="color" placeholder="Color" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="feePerDay">FeePerDay</label>
                            <input type="text" required id="feePerDay" name="feePerDay" placeholder="FeePerDay" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <label className="w-auto block text-gray-700 pr-4" htmlFor="licensePlate">LicensePlate</label>
                            <input type="text" required id="licensePlate" name="licensePlate" placeholder="LicensePlate" className="bg-white border-2 bordergrayy-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="flex flex-row items-center my-2 font-serif">
                            <input type="file" accept="image/*" onChange={handleFileChange}/>
                            <button disabled={!selectedFile}>Upload Image</button>
                        </div>
                    </div>
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-800 text-white p-2 rounded-xl mt-3 font-serif">Add New Company</button>
                </form>
            } */}
            <input id="choosefile" type="file" accept="image/*" onChange={handleFileChange} className="text-blackblock w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-black
                hover:file:bg-violet-100" />
            <button id="upload" onClick={handleUpload} disabled={!selectedFile} className="text-white disabled:bg-gray-500 bg-emerald-500 hover:bg-emerald-600 p-2 m-2 rounded-2xl">Upload Image</button>

        </div>
    )
}
