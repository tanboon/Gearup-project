import config from "../config"

export default async function getPayment(payment_intent: string, token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/payments/?payment_intent=${payment_intent}`, {
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
