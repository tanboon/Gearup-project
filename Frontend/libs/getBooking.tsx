import config from "../config"

export default async function getBooking(bookingID: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingID}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Failed to fetch booking")
    }

    return await response.json()
};
