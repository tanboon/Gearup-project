import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined ;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
  destination?: string;
  func?:Function
}

export interface SearchManufacturersProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

export interface CarProps {
    _id: string;
  Brand: string;
  Model: string;
  Year: string;
  Color: string;
  FeePerDay: number;
  LicensePlate: string;
  PictureCover: string;
  Picture1: string;
  Picture2: string;
  Picture3: string;
  Picture4: string;
  provider: string;
}

export interface filterProps {
  manufacturer?: string;
  year?: string;
  color?: string;
  limit?: number;
  model?: string;
}

export interface BookingItem {
  _id: string;
  bookingDateFrom: string;
  bookingDateTo: string;
  user: string;
  car: CarItems;
  createdAt: string;
}

export interface CarItems {
  _id: string;
  Brand: string;
  Model: string;
  Year: string;
  Color: string;
  FeePerDay: string;
  LicensePlate: string;
  bookings: BookingItem[];
  id: string;
}

export interface GetCars {
  success: boolean;
  count: number;
  pagination: {};
  data: CarItems[];
  id: string;
}

export interface imgProps{
    image1removebg: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

export interface ProviderData {
  _id: string;
  user: string;
  citizenCard: string;
  citizenCertificate: string;
  picture: string;
  name: string;
  address: string;
  contact: string;
  status: string;
  __v: number;
}