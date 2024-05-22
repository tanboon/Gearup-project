"use client";
import { Link } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import registerUser from "@/libs/registerUser";
import CustomButton from "@/components/CustomButton";
import Swal from "sweetalert2";

interface FormData {
  name: string;
  tel: string;
  email: string;
  password: string;
  role: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    tel: "",
    email: "",
    password: "",
    role: "user",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateClass, setAnimateClass] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const newRole =
      name === "isProvider" ? (newValue ? "provider" : "user") : formData.role;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
      role: newRole,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formSubmitted) {
      console.log(formData);
      setFormSubmitted(true);
      registerUser(formData);
    }
    Swal.fire({
      title: "Good job!",
      text: "Sign up successful",
      icon: "success",
    });
  };
  var isClick = false;
  const handleClick = () => {
    if (!formSubmitted) {
      setAnimateClass("animate-jump animate-once");
      setTimeout(() => setAnimateClass(""), 500);
      isClick = true;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "Delete"];
    const keyValue = e.key;

    if (!(allowedKeys.includes(keyValue) || /^\d$/.test(keyValue))) {
      e.preventDefault();
    }
  };

  return (
    <div className="mt-48 h-full animate-fade-up bg-primary-blue-100 p-8 hover:shadow-md rounded-3xl text-medium">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-name"
              type="text"
              placeholder="Jane Doe"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Phone
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-phone"
              type="tel"
              placeholder="Phone Number"
              name="tel"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              pattern="[0-9]{10}"
              title="Phone number must be exactly 10 digits long."
              maxLength={10}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="********"
              name="password"
              onChange={handleChange}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              title="Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long."
              required
            />
          </div>
        </div>

        {/* <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="isProvider"
              name="isProvider"
              checked={formData.role === "provider"}
              onChange={handleChange}
            />
            <span className="text-sm">Are you a provider?</span>
          </label>
        </div> */}

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            {/* <button
              disabled={formSubmitted}
              onClick={handleClick}
              className={`shadow bg-${formSubmitted ? "emerald" : "violet"}-500 hover:bg-${formSubmitted ? "emerald" : "violet"}-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${animateClass}`}
              type="submit"
            >
              {formSubmitted ? "Success" : "Sign Up"}
            </button> */}

            <CustomButton
              title="Sign Up"
              containerStyles="bg-primary-blue"
              btnType="submit"
              handleClick={handleClick}
            />
          </div>
        </div>
      </form>
      {formSubmitted ? (
        <div className="mt-6 md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <Link href="/api/auth/signin" color="#6667AB" underline="hover">
              Take me to sign in →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
