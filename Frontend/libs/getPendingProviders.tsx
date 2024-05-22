
import { getServerSession } from "next-auth"
import config from "../config"
import { authOptions } from "./authOptions"

export async function getPendingProviders(token : string){
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/providers/pending`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
     
    if(!response.ok){
        throw new Error("Failed to request")
    }
    return await response.json()
    
};