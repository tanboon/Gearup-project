'use client'

import { useState,useEffect } from "react"
import { getProviders, useSession } from "next-auth/react"
import { getPendingProviders } from "@/libs/getPendingProviders"
import Image from "next/image"
import Link from "next/link"
import { ProviderData } from "@/types"
import updateProvider from "@/libs/updateProvider"
import updateUser from "@/libs/updateUser"
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid"


export default function provider() {
    

    const [request, setRequest] = useState<any[]>([])
    const [isClick, setIsClick] = useState(false)

    const { data: session } = useSession();
    if (!session) return null
    const token = session.user.token

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await getPendingProviders(token);
                setRequest(response.data)
            }catch(err){
                console.log("Failed to fetch the data");
            }
        }
        fetchData()
    }, [isClick])

    async function handleApprove(provider : ProviderData) {

        try{
            const approved = await updateProvider(provider._id, "approved", token);
            const updated = await updateUser(provider.user, token)
            // const providers = await getProviders()
            // console.log(providers)
        }catch(err){
            console.log("ERROR can't approve");
        }

        setIsClick(prevData => !prevData)

    }

    async function handleReject(provider : ProviderData) {

        try{
            const rejected = await updateProvider(provider._id, "rejected", token);
        }catch(err){
            console.log("ERROR can't Reject");
        }

        setIsClick(prevData => !prevData)

    }

    return (
        <div className="w-11/12 mt-24 relative overflow-x-auto shadow-md rounded-lg">
            <table id="request" className="w-full text-sm text-left rtl:text-right text-gray-500"> 
                <caption className="p-6 text-lg text-white font-bold text-left rtl:text-right bg-[#4a4b80]">
                    Pending Request
                </caption>
                <thead className="text-xs text-white uppercase bg-primary-blue">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Contact
                        </th>
                        <th scope="col" className="px-3 py-3 flex justify-end"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        request.map((providerRequest : ProviderData) => (
                            <tr key={providerRequest._id} className="odd:bg-white even:bg-gray-50 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {providerRequest.name}
                                </th>
                                <td className="px-6 py-4 max-w-lg truncate">
                                    {providerRequest.address}
                                </td>
                                <td className="px-6 py-4">
                                    {providerRequest.contact}
                                </td>
                                <td className="flex justify-end items-center pr-6 py-4">
                                    <Link href={`/admin/information/${providerRequest._id}`} className="transition-transform duration-500 ease-in-out hover:scale-105">
                                        <button className="bg-primary-blue hover:bg-white text-white  hover:text-primary-blue font-bold py-2 px-4 border-primary-blue rounded-full ring-2 ring-transparent hover:ring-primary-blue mr-3">
                                            View More
                                        </button>
                                    </Link>
                                    <button className="ml-3 transition-transform duration-500 ease-in-out hover:scale-110" onClick={() => handleApprove(providerRequest)}>
                                        <CheckCircleIcon id="approved"className="h-6 w-6 text-emerald-500 hover:text-emerald-600" />
                                    </button>
                                    <button className="ml-3 transition-transform duration-500 ease-in-out hover:scale-110" onClick={() => handleReject(providerRequest)}>
                                        <XCircleIcon id="rejected"className="h-6 w-6 text-red-500 hover:text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}