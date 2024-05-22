import config from "../config"

export default async function userLogIn(userEmail: string, userPassword: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to login")
    }

    return await response.json()
};
