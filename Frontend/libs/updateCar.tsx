import config from "../config"

export default async function updateCar(
    token: string, id: string, brand: string, model: string, year: string, color: string, feePerDay: string, 
    licensePlate: string, pictureCover: string, picture1: string, picture2: string, picture3: string, picture4: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${id}`, {
        method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Brand: brand,
            Model: model,
            Year: year,
            Color: color,
            FeePerDay: feePerDay,
            LicensePlate: licensePlate,
            PictureCover: pictureCover,
            Picture1: picture1,
            Picture2: picture2,
            Picture3: picture3,
            Picture4: picture4
          }),
    })

    if (!response.ok) {
        console.log(response)
        throw new Error("Failed to update car")
    }

    return await response.json()
};
