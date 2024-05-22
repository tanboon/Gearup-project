import config from "../config"

export default async function getBookingByCar(token: string,carId:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${carId}/bookings`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch bookings")
    }

    return await response.json()
};
