import { GetCars, filterProps } from "@/types"
import config from "../config"

export async function getCarByLicense(LicensePlate : string) :Promise<GetCars>{
    // const { manufacturer, year, model, color, limit} = filters
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/?LicensePlate=${LicensePlate}`)
    if(!response.ok){
        throw new Error("Failed to fetch cars")
    }
    return await response.json()
    
};


//?Brand=${manufacturer}&Year=${year}&Model=${model}&Color=${color}&limit=${limit}
// {
//     manufacturer: searchParams.manufacturer || '',
//     year: searchParams.year || '',
//     limit: searchParams.limit || 10,
//     model: searchParams.model || ''
//   }
// filters: filterProps