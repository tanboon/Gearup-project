import { GetCars, filterProps } from "@/types"
import config from "../config"

export async function getCars() :Promise<GetCars>{
    // const { manufacturer, year, model, color, limit} = filters
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`)
     //console.log( "hi",await response.json())
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