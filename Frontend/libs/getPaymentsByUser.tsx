import config from "../config"

export default async function getPaymentByUser(userId: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/?userId=${userId}`, {
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
