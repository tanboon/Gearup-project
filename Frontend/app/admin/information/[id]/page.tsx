'use client'

import { useState,useEffect } from "react";
import { ProviderData } from "@/types"
import { useSession } from "next-auth/react";
import Image from "next/image";
import PictureParser from "@/components/PictureParser";
import config from "@/config";

export default function page({params} : {params: {id: string}}) {

    const [information, setInformation] = useState<ProviderData>()

    const { data: session } = useSession();
    if (!session) return null
    const token = session.user.token

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/v1/providers?_id=${params.id}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setInformation(data.data[0]);
            } catch(err) {
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [])

    if(!information) return null

    return (
        <div className="mt-24 w-full flex flex-col justify-center items-center">
            <div className="text-xl font-bold uppercase tracking-widest">
                Information
            </div>
            <div className="mt-12 flex justify-center">
                <Image src={PictureParser(information?.picture)} alt="provider picture" width={200} height={200} className="rounded-lg"/>
            </div>
            <div className="w-1/3 bg-gray-100 m-5 p-5 rounded-lg flex flex-col justify-center shadow-md font-semibold">
                <table className="w-full table-auto border-separate border-spacing-2">
                    <tbody>
                        <tr>
                            <td className="text-gray-500 uppercase">Name</td>
                            <td className="text-right">{information?.name}</td>
                        </tr>
                        <tr>
                            <td className="text-gray-500 uppercase">Address</td>
                            <td className="text-right">{information?.address}</td>
                        </tr>
                        <tr>
                            <td className="text-gray-500 uppercase">Contact</td>
                            <td className="text-right">{information?.contact}</td>
                        </tr>
                    </tbody>
                </table>
                <hr className="border-gray-300 m-4" />
                <div className="mx-2 mb-4 flex flex-col justify-center">
                    <div className="mb-2">Citizen card</div>
                    <Image src={PictureParser(information?.citizenCard)} alt="provider picture" width={300} height={300} className="rounded-lg"/>
                </div>
                <hr className="border-gray-300 m-4" />
                <div className="mx-2 mb-4 flex flex-col justify-center">
                    <div className="mb-2">Citizen certificate</div>
                    <Image src={PictureParser(information?.citizenCertificate)} alt="provider picture" width={500} height={500} className="rounded-lg"/>
                </div>
            </div>
        </div>
    );
}