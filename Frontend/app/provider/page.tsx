"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import CustomButton from "@/components/CustomButton";
import registerProvider from "@/libs/registerProvider";
import AddCar from "@/components/AddCar";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface FormData {
  name: string;
  address: string;
  contact: string;
  picture: string;
  citizenCard: string;
  citizenCertificate: string;
  token: string
}

export default function ProviderRegistration() {
    
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    contact: "",
    picture: "",
    citizenCard: "",
    citizenCertificate: "",
    token: ""
  });
  console.log(formData)
  // Inside the useEffect hook, you can access setFormData
  const { data: session } = useSession();
  
  if (!session) return; // Return early if session is not available
  
  const token = session.user.token;

  useEffect(() => {
  

  // Update the formData state with the token
  setFormData((prevFormData) => ({
    ...prevFormData,
    token: token,
  }));
}, []);
  

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateClass, setAnimateClass] = useState("");
  const [isPictureClick, setIsPictureClick]  = useState(false);
  const [isCertificateClick, setCertificateClick]  = useState(false);
  const [isCitizenClick, setCitizenClick]  = useState(false);

   

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value} = e.target;
    const newValue = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (
      formData.name.trim() === "" ||
      formData.address.trim() === "" ||
      formData.contact.trim() === ""
    ) {
      Swal.fire({
        title: "Some fields are missing",
        text: "Please fill out all fields",
        icon: "error",
      });
    } else if (!isCertificateClick || !isCitizenClick || !isPictureClick) {
      Swal.fire({
        title: "Some documents are missing",
        text: "Please upload all required documents",
        icon: "error",
      });
    } else if (!formSubmitted) {
      console.log(formData);
      setFormSubmitted(true);
      registerProvider(formData);
    }
    
    e.preventDefault();
  };  
  

  const handleClick = () => {
    if (!formSubmitted) {
      setAnimateClass("animate-jump animate-once");
      setTimeout(() => setAnimateClass(""), 500);
    }
  };
//   let PictureURL;
//   let CitizenCardURL;
//   let CitizenCertificateURL;
  const handlePicture = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from Picture:", result);
    //PictureURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        picture: result.url,
      }));
    setIsPictureClick(true)
  };
  const handleCitizenCard = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from CitizenCard:", result);
    //CitizenCardURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        citizenCard: result.url,
      }));
      setCitizenClick(true)
  };
  const handleCitizenCertificate = (result: any) => {
    // Handle the result here, such as displaying a message or updating state
    console.log("Result from CitizenCertificate:", result);
    //CitizenCertificateURL = result.url
    setFormData((prevFormData) => ({
        ...prevFormData,
        citizenCertificate: result.url,
      }));
      setCertificateClick(true)
  };

  return (
    
    <div className=" flex justify-center flex-col mt-48 h-[100%] animate-fade-up bg-primary-blue-100 p-8 hover:shadow-md rounded-3xl text-medium">
        <div className=" flex justify-center pb-9">
        <h1 className="text-4xl font-extrabold ">Provider Registration</h1>
        </div>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-2/3" id="name">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500
              hover:bg-white "
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={handleChange}
              
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Address
            </label>
          </div>
          <div className="md:w-2/3" id="address">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 hover:bg-white"
              placeholder="Your Address"
              name="address"
              onChange={handleChange}
              
            />
          </div>
        </div>
        

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Contact
            </label>
          </div>
          <div className="md:w-2/3" id="contact">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500
              hover:bg-white"
              type="tel"
              placeholder="Your Contact Number"
              name="contact"
              onChange={handleChange}
              
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ">
              Picture
            </label>
          </div>
          <div className="md:w-2/3" id="picture">
            {/* <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="file"
              name="picture"
              onChange={handleChange}
              accept="image/*"
              required
            /> */}
            <AddCar handleResult={handlePicture}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Citizen Card
            </label>
          </div>
          <div className="md:w-2/3" id="citizen">
            {/* <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="file"
              name="citizenCard"
              onChange={handleChange}
              required
            /> */}
            <AddCar handleResult={handleCitizenCard}/>
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Citizen Certificate
            </label>
          </div>
          <div className="md:w-2/3" id="certi">
            {/* <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="file"
              name="citizenCertificate"
              onChange={handleChange}
              required
            /> */}
            <AddCar handleResult={handleCitizenCertificate}/>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/4 lg:w-1/4"></div>
          <div className=" flex justify-center" id="submit">
            <CustomButton
              title="Sign Up as Provider"
              containerStyles="transition-transform duration-500 ease-in-out hover:scale-110 bg-primary-blue rounded-full"
              btnType="submit"
              handleClick={handleClick}
            />
          </div>
        </div>
      </form>
      
    </div>
  
  );
}
