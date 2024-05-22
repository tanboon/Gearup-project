import config from "../config"

export default async function createRefund(_id : string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/stripe/create-refund`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            bookingId : _id
        }),
    })

    if (!response.ok) {
        throw new Error("Failed create refund")
    }

    return await response.json()
};

