import Swal from "sweetalert2";
import config from "../config";

export default async function deleteCar(carID: string, token: string) {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${carID}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response text:', errorText);
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Delete failed: ${errorText}`,
            });
            throw new Error(`Failed to delete car: ${errorText}`);
        }

        const result = await response.json();
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
        });
        return result;
        
    } catch (error) {
        console.error("Error deleting car:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Delete failed due to a network error. Please try again later.",
        });
        throw error;
    }
}
