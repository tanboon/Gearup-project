"use client";
import CustomButton from "./CustomButton";
import Image from "next/image";

export default function Hero(props: {
  loggedIn: boolean;
  username?: string;
}) {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      {props.loggedIn ? (
        <>
          <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title animate-fade-up">
              Hi, {props.username}
            </h1>
            <h1 className="pt-3 text-5xl font-bold animate-fade-up">Select Your Cars</h1>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title animate-fade-right">
              Find, book, or rent a car - quickly and easily!
            </h1>

            <p className="hero__subtitle animate-fade-right animate-delay-500">
              Streamline your car rental experience with our effortless booking
              process.
            </p>
            <CustomButton
              title="Explore Cars"
              containerStyles="transition duration-300 bg-primary-blue text-white rounded-full mt-10 animate-fade-up animate-delay-1000 hover:bg-[#515294]"
              handleClick={handleScroll}
            />
          </div>
          <div className="hero__image-container">
            <div className="hero__image animate-fade-left animate-delay-500">
              <Image
                src="/benz.png"
                alt="hero"
                fill
                className="object-contain"
              />
            </div>
            <div className="hero__image-overlay animate-fade-left" />
          </div>
        </>
      )}
    </div>
  );
}
