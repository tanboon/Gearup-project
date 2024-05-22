import config from "../config"

export default async function createCar(
  Brand: string,
  Model: string,
  Year: string,
  Color: string,
  FeePerDay: string,
  LicensePlate: string,
  PictureCover: string,
  Picture1: string,
  Picture2: string,
  Picture3: string,
  Picture4: string,
  token: string
  ) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            Brand: Brand,
            Model: Model,
            Year: Year,
            Color: Color,
            FeePerDay: FeePerDay,
            LicensePlate: LicensePlate,
            PictureCover: PictureCover,
            Picture1: Picture1,
            Picture2: Picture2,
            Picture3: Picture3,
            Picture4: Picture4
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to create Car")
    }

    return await response.json()
};

