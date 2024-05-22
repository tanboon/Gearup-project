import Swal from 'sweetalert2';
import config from "../config";

interface FormData {
    name: string;
    address: string;
    contact: string;
    picture: string;
    citizenCard: string;
    citizenCertificate: string;
    token: string;
}

export default async function registerProvider({ name, address, contact, picture, citizenCard, citizenCertificate, token}: FormData) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/providers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization" : `Bearer ${token}`

        },
        body: JSON.stringify({
            name: name,
            address: address,
            contact: contact,
            picture: picture,
            citizenCard: citizenCard,
            citizenCertificate: citizenCertificate
        })
    });

    if (!response.ok) {
        console.log(response)
        throw new Error("Failed to register as provider");
        
    }
    else{
    Swal.fire({
        title: "Good job!",
        text: "Sign up successful",
        icon: "success",
      });
    }

    return await response.json();
}
