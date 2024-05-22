import config from "../config"

export default async function getCarProvider(id:string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/provider/${id}`);
    
    if(!response.ok){
        throw new Error("Failed to fetch provider's car")
    }

    return await response.json()
} 